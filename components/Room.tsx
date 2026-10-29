"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import hotspots from "@/public/room/hotspots.json";
import { CHANNELS, type ChannelId } from "@/lib/channels";
import { ChannelView } from "./Channels";
import { Rain } from "./Rain";
import { RoomCanvas, type LightState } from "./RoomCanvas";
import { Static } from "./Static";
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
  const [lofi, setLofi] = useState(false);
  const [burst, setBurst] = useState(false);
  const [credits, setCredits] = useState(false);
  const [counter, setCounter] = useState(0);
  const [zoomScale, setZoomScale] = useState(3);
  const [hover, setHover] = useState<number | null>(null);

  const light = useRef<LightState>({ flash: 0 });
  const stageRef = useRef<HTMLDivElement>(null);
  const swayRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;
  const pointer = useRef({ x: 0, y: 0 });

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

  // One animation loop drives: idle camera breathing, mouse parallax for the city layers,
  // and the city brightening when lightning hits.
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let px = 0;
    let py = 0;
    const loop = (t: number) => {
      const s = t / 1000;
      // pointer parallax eases toward the cursor; a slow sine keeps the layers drifting when idle
      px += (pointer.current.x + Math.sin(s * 0.23) * 0.35 - px) * 0.04;
      py += (pointer.current.y + Math.cos(s * 0.19) * 0.25 - py) * 0.04;
      const st = stageRef.current;
      if (st) {
        st.style.setProperty("--px", px.toFixed(4));
        st.style.setProperty("--py", py.toFixed(4));
        st.style.setProperty("--fl", light.current.flash.toFixed(3));
      }
      const sw = swayRef.current;
      if (sw) {
        // breathing: very slow, very small; off while zoomed in on the TV
        const k = zoomRef.current ? 0 : 1;
        const x = (Math.sin(s * 0.31) * 0.22 + Math.sin(s * 0.13) * 0.12) * k;
        const y = (Math.sin(s * 0.27 + 1) * 0.16 + Math.sin(s * 0.09) * 0.1) * k;
        sw.style.transform = `translate(${x.toFixed(3)}%, ${y.toFixed(3)}%) rotate(${(Math.sin(s * 0.17) * 0.06 * k).toFixed(3)}deg) scale(${1 + 0.006 * k})`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const move = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", move);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
    };
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

  // Now and then lightning lights the room through the moon pass.
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const strike = () => {
      light.current.flash = 1;
      setTimeout(() => (light.current.flash = 0.8), 140);
      setTimeout(() => audio.thunder(), 700);
    };
    const next = () => {
      t = setTimeout(() => {
        strike();
        next();
      }, 22000 + Math.random() * 38000);
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
      if (on) {
        audio.stopLofi();
        audio.stop();
        setLofi(false);
      } else audio.start();
      return !on;
    });
  }, []);

  const toggleLofi = useCallback(() => {
    if (audio.isLofi()) {
      audio.stopLofi();
      setLofi(false);
    } else {
      audio.startLofi();
      setSoundOn(true);
      setLofi(true);
    }
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
      setTimeout(() => setBurst(false), 500);
    },
    [phase, channel],
  );

  const eject = useCallback(() => {
    if (!channel) return;
    audio.clunk();
    setBurst(true);
    setChannel(null);
    setZoom(false);
    setTimeout(() => setBurst(false), 400);
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
      else if (k === "l") toggleLofi();
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
      <div className="sway" ref={swayRef}>
        <div className="stage" ref={stageRef} style={camera}>
          {/* city seen through the window: two depth layers that drift against each other */}
          <img className="city far" src="/room/far.webp" alt="" draggable={false} />
          <img className="city near" src="/room/near.webp" alt="" draggable={false} />
          {/* the room, blended from three Blender passes in a shader (alpha hole = window) */}
          <RoomCanvas light={light} />

          <div className="rainbox" style={{ left: pct(WINDOW.x), top: pct(WINDOW.y), width: pct(WINDOW.w), height: pct(WINDOW.h) }}>
            <Rain />
          </div>

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
            <div className="glow">
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

              {phase === "room" && !loaded && !burst && (
                <div className="idle">
                  <h2>Sakina Saifuddin</h2>
                  <p>I build AI, data, and software systems with clear results.</p>
                  <p className="blink">▶ INSERT A TAPE</p>
                </div>
              )}

              {phase === "room" && loaded && !burst && (
                <div className="fadein" key={loaded.id}>
                  <div className="osd">
                    <span>▶ PLAY</span>
                    <span>CH 0{loaded.n}</span>
                  </div>
                  <div className="scroll"><ChannelView id={loaded.id} /></div>
                  <div className="osd bottom">
                    <span>{loaded.spine}</span>
                    <span>SP {fmt(counter)}</span>
                  </div>
                </div>
              )}
            </div>

            {burst && <Static />}
            <div className="crt" />
            <div className="roll" />
          </div>

          <div className="vignette" />
        </div>
      </div>

      <div className={`hud${phase === "room" ? " show" : ""}`}>
        <div className="hint">click a tape · 1–5 monitor buttons · Z zoom TV · E eject · S sound · L lo-fi beat</div>
        <div className="btns">
          {zoom && phase === "room" && <button onClick={() => setZoom(false)}>BACK TO THE DESK · ESC</button>}
          <button onClick={() => setCredits(true)}>CREDITS</button>
          <a href="/lofi" aria-label="Plain version of this site">PLAIN</a>
          <button onClick={toggleLofi} aria-pressed={lofi}>LO-FI BEAT {lofi ? "ON" : "OFF"}</button>
          <button onClick={toggleSound} aria-pressed={soundOn}>SOUND {soundOn ? "ON" : "OFF"}</button>
        </div>
      </div>

      {credits && (
        <div className="credits" onClick={() => setCredits(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <h2>Credits</h2>
            <p>Idea inspired by the interactive desk on felixrieseberg.com. Scene, code and content here are original.</p>
            <p>Room modelled and rendered in Blender (Cycles), blended live in a WebGL shader. Built with Next.js and WebAudio; rain, sound and the lo-fi beat are generated in your browser, with no audio files.</p>
            <button onClick={() => setCredits(false)}>CLOSE</button>
          </div>
        </div>
      )}
    </div>
  );
}
