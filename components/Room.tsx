"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import hotspots from "@/public/room/hotspots.json";
import { CHANNELS, type ChannelId } from "@/lib/channels";
import { ChannelView } from "./Channels";
import { Rain } from "./Rain";
import * as audio from "@/lib/audio";

type Pt = number[];
const pct = (n: number) => `${(n * 100).toFixed(3)}%`;

const [tl, tr, bl] = hotspots.screen as Pt[];
const SCREEN = { x: tl[0], y: tl[1], w: tr[0] - tl[0], h: bl[1] - tl[1] };
const [wtl, wtr, wbl] = hotspots.window as Pt[];
const WINDOW = { x: wtl[0], y: wtl[1], w: wtr[0] - wtl[0], h: wbl[1] - wtl[1] };
const EJECT: Pt = [hotspots.slot[0] + 0.04, hotspots.slot[1] + 0.015];

const fmt = (s: number) => `0:${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

export function Room() {
  const router = useRouter();
  const [phase, setPhase] = useState<"loading" | "sound" | "room">("loading");
  const [progress, setProgress] = useState(0);
  const [channel, setChannel] = useState<ChannelId | null>(null);
  const [zoom, setZoom] = useState(true);
  const [soundOn, setSoundOn] = useState(false);
  const [burst, setBurst] = useState(false);
  const [credits, setCredits] = useState(false);
  const [counter, setCounter] = useState(0);
  const [zoomScale, setZoomScale] = useState(3);
  const [hover, setHover] = useState<number | null>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  // Small screens and reduced-motion visitors get the lo-fi page, like a static fallback.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const small = matchMedia("(max-width: 820px)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (small && !q.has("room")) router.replace("/lofi");
  }, [router]);

  // Camera: how far to scale so the TV screen fills most of the viewport.
  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const W = Math.min(vw, (vh * 16) / 9);
      const s = Math.min((0.86 * vw) / (SCREEN.w * W), (0.86 * vh) / (SCREEN.h * ((W * 9) / 16)));
      setZoomScale(Math.max(1.5, s));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // Fake boot: the meter climbs, then the TV asks about sound.
  useEffect(() => {
    if (phase !== "loading") return;
    const t = setInterval(() => {
      setProgress((p) => {
        const n = Math.min(100, p + 3 + Math.random() * 7);
        if (n >= 100) {
          clearInterval(t);
          setTimeout(() => setPhase("sound"), 250);
        }
        return n;
      });
    }, 90);
    return () => clearInterval(t);
  }, [phase]);

  // Tape counter while something is playing.
  useEffect(() => {
    if (!channel) return;
    const t = setInterval(() => setCounter((c) => c + 1), 1000);
    return () => clearInterval(t);
  }, [channel]);

  // Now and then the sky flashes.
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const next = () => {
      t = setTimeout(() => {
        const el = flashRef.current;
        if (el) {
          el.classList.add("on");
          setTimeout(() => el.classList.remove("on"), 700);
        }
        next();
      }, 28000 + Math.random() * 40000);
    };
    next();
    return () => clearTimeout(t);
  }, []);

  const chooseSound = (on: boolean) => {
    setSoundOn(on);
    if (on) audio.start();
    setPhase("room");
    setTimeout(() => setZoom(false), 350);
  };

  const toggleSound = useCallback(() => {
    setSoundOn((on) => {
      if (on) audio.stop();
      else audio.start();
      return !on;
    });
  }, []);

  const play = useCallback(
    (id: ChannelId) => {
      if (phase !== "room") return;
      if (id === channel) {
        setZoom((z) => !z);
        return;
      }
      audio.clunk();
      setBurst(true);
      setChannel(id);
      setCounter(0);
      setZoom(true);
      setTimeout(() => setBurst(false), 650);
    },
    [phase, channel],
  );

  const eject = useCallback(() => {
    if (!channel) return;
    audio.clunk();
    setBurst(true);
    setChannel(null);
    setZoom(false);
    setTimeout(() => setBurst(false), 450);
  }, [channel]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      if (phase === "sound") {
        if (k === "y" || k === "enter") chooseSound(true);
        if (k === "n") chooseSound(false);
        return;
      }
      if (phase !== "room") return;
      if (k === "escape") {
        if (credits) setCredits(false);
        else if (zoom) setZoom(false);
        else eject();
      } else if (k === "z") setZoom((z) => !z);
      else if (k === "s") toggleSound();
      else if (k === "e") eject();
      else if (/^[1-5]$/.test(k)) play(CHANNELS[Number(k) - 1].id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const cx = SCREEN.x + SCREEN.w / 2;
  const cy = SCREEN.y + SCREEN.h / 2;
  const camera = zoom
    ? { transform: `scale(${zoomScale}) translate(${((0.5 - cx) * 100).toFixed(3)}%, ${((0.5 - cy) * 100).toFixed(3)}%)` }
    : { transform: "scale(1) translate(0%, 0%)" };
  const loaded = CHANNELS.find((c) => c.id === channel);

  return (
    <div className="viewport">
      <div className="stage" style={camera}>
        <img className="plate" src="/room/still.jpg" alt="A desk at night by a rainy window: a small TV, a VCR, a stack of labelled video tapes, a desk lamp and a plant." draggable={false} />

        <div className="rainbox" style={{ left: pct(WINDOW.x), top: pct(WINDOW.y), width: pct(WINDOW.w), height: pct(WINDOW.h) }}>
          <Rain />
        </div>
        <div className="flash" ref={flashRef} />

        {/* loaded tape sitting in the VCR slot */}
        {loaded && (
          <div className="vcr-tape" style={{ left: pct(hotspots.slot[0] - 0.055), top: pct(hotspots.slot[1] - 0.012), borderColor: loaded.color }}>
            <i style={{ background: loaded.color }} />
          </div>
        )}
        <button className="hot eject" aria-label="Eject tape (E)" title="Eject (E)" style={{ left: pct(EJECT[0]), top: pct(EJECT[1]) }} onClick={eject} />

        {/* tapes in the stack */}
        {CHANNELS.map((c, i) => {
          const [x, y] = hotspots.tapes[i] as Pt;
          return (
            <button
              key={c.id}
              className={`hot tape${channel === c.id ? " loaded" : ""}${hover === i ? " hov" : ""}`}
              style={{ left: pct(x), top: pct(y) }}
              aria-label={`Play tape ${c.n}: ${c.spine}`}
              onClick={() => play(c.id)}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <span>{c.n} · {c.spine}</span>
            </button>
          );
        })}

        {/* numbered buttons on the TV */}
        {CHANNELS.map((c, i) => {
          const [x, y] = hotspots.buttons[i] as Pt;
          return (
            <button
              key={c.id}
              className={`hot tvbtn${channel === c.id ? " on" : ""}`}
              style={{ left: pct(x), top: pct(y) }}
              aria-label={`Channel ${c.n}: ${c.spine}`}
              onClick={() => play(c.id)}
            >
              {c.n}
            </button>
          );
        })}

        {/* the TV screen */}
        <div
          className={`screen${phase === "room" ? " live" : ""}`}
          style={{ left: pct(SCREEN.x), top: pct(SCREEN.y), width: pct(SCREEN.w), height: pct(SCREEN.h) }}
          onClickCapture={(e) => {
            if (!zoom && phase === "room") {
              e.preventDefault();
              e.stopPropagation();
              setZoom(true);
            }
          }}
        >
          {phase !== "room" && (
            <div className="boot">
              <div className="lb">▶▶ LOADING</div>
              <div className="chn">CH 00</div>
              {phase === "loading" ? (
                <>
                  <div className="meter"><i style={{ width: `${progress}%` }} /></div>
                  <div className="pc">{Math.floor(progress)}%</div>
                </>
              ) : (
                <div className="snd">
                  <span>SOUND?</span>
                  <button onClick={() => chooseSound(true)}>ON (Y)</button>
                  <button onClick={() => chooseSound(false)}>OFF (N)</button>
                </div>
              )}
            </div>
          )}

          {phase === "room" && !loaded && (
            <div className="idle">
              <h2>Sakina Saifuddin</h2>
              <p>{`I build AI, data, and software systems with clear results.`}</p>
              <p className="blink">▶ INSERT A TAPE</p>
            </div>
          )}

          {phase === "room" && loaded && (
            <>
              <div className="osd">
                <span>▶ PLAY</span>
                <span>CH 0{loaded.n}</span>
              </div>
              <div className="scroll"><ChannelView id={loaded.id} /></div>
              <div className="osd bottom">
                <span>{loaded.spine}</span>
                <span>SP {fmt(counter)}</span>
              </div>
            </>
          )}

          {burst && <div className="noise" />}
          <div className="crt" />
        </div>

        <div className="vignette" />
      </div>

      <div className="hud">
        <div className="hint">
          {phase === "room" ? "click a tape · 1–5 monitor buttons · Z zoom TV · E eject · S sound" : ""}
        </div>
        <div className="btns">
          {zoom && phase === "room" && <button onClick={() => setZoom(false)}>BACK TO THE DESK · ESC</button>}
          <button onClick={() => setCredits(true)}>CREDITS</button>
          <a href="/lofi" aria-label="Lo-fi version">LO-FI</a>
          <button onClick={toggleSound} aria-pressed={soundOn}>SOUND {soundOn ? "ON" : "OFF"}</button>
        </div>
      </div>

      {credits && (
        <div className="credits" onClick={() => setCredits(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <h2>Credits</h2>
            <p>Idea inspired by the interactive desk on felixrieseberg.com. Scene, code and content here are original.</p>
            <p>Room modelled and rendered in Blender. Built with Next.js and WebAudio; rain, sound and screen are drawn live, with no audio files.</p>
            <button onClick={() => setCredits(false)}>CLOSE</button>
          </div>
        </div>
      )}
    </div>
  );
}
