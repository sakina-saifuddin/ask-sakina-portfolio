"use client";

import { useEffect, useRef, useState } from "react";
import { attachAudioUnlock, playTypewriterTick } from "@/components/sound";

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
