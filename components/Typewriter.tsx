"use client";

import { useEffect, useRef, useState } from "react";

let sharedAudioCtx: AudioContext | null = null;
let unlockAttached = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!sharedAudioCtx) sharedAudioCtx = new Ctor();
  return sharedAudioCtx;
}

function attachAudioUnlock() {
  if (typeof window === "undefined" || unlockAttached) return;
  unlockAttached = true;

  function unlock() {
    const ctx = getAudioContext();
    if (ctx && ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
    window.removeEventListener("pointerdown", unlock);
    window.removeEventListener("keydown", unlock);
    window.removeEventListener("touchstart", unlock);
  }

  window.addEventListener("pointerdown", unlock);
  window.addEventListener("keydown", unlock);
  window.addEventListener("touchstart", unlock, { passive: true });
}

function playTypewriterTick() {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "square";
  osc.frequency.setValueAtTime(1500 + Math.random() * 300, now);
  osc.frequency.exponentialRampToValueAtTime(500, now + 0.02);

  gain.gain.setValueAtTime(0.05, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.03);
}

export function Typewriter({
  text,
  speed = 28,
  startDelay = 300,
  className,
  sound = false,
  showCursor = true,
}: {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  sound?: boolean;
  showCursor?: boolean;
}) {
  const [count, setCount] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    if (sound) attachAudioUnlock();
  }, [sound]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setCount(text.length);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i <= text.length; i++) {
      timers.push(
        setTimeout(() => {
          setCount(i);
          const char = text[i - 1];
          if (sound && char !== " " && char !== "\n") playTypewriterTick();
        }, startDelay + i * speed)
      );
    }
    timers.push(
      setTimeout(() => {
        doneRef.current = true;
      }, startDelay + text.length * speed)
    );

    return () => timers.forEach(clearTimeout);
  }, [text, speed, startDelay, sound]);

  return (
    <span className={className}>
      <span aria-hidden="true">
        {text.slice(0, count)}
        {showCursor && (
          <span className="typewriter-cursor" data-done={count >= text.length}>
            |
          </span>
        )}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
