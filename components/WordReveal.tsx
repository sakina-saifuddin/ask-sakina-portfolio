"use client";

import { useEffect } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

const START_OPACITY = 0.15;
const SPREAD = 0.8;
const WORD_DURATION = 0.2;

type WordProgressRange = { start: number; end: number };

function getWordProgressRange(index: number, count: number): WordProgressRange {
  const start = count <= 1 ? 0 : (index / (count - 1)) * SPREAD;
  return { start, end: Math.min(1, start + WORD_DURATION) };
}

function getWordOpacity(progress: number, { start, end }: WordProgressRange): number {
  if (progress <= start) return START_OPACITY;
  if (progress >= end) return 1;
  const wordProgress = (progress - start) / (end - start);
  return START_OPACITY + (1 - START_OPACITY) * wordProgress;
}

function Word({
  children,
  progress,
  index,
  count,
  reducedMotion,
}: {
  children: string;
  progress: MotionValue<number>;
  index: number;
  count: number;
  reducedMotion: boolean;
}) {
  const range = getWordProgressRange(index, count);
  const opacity = useTransform(progress, (latest) => getWordOpacity(latest, range));

  return (
    <motion.span style={reducedMotion ? undefined : { opacity }}>
      {children}
    </motion.span>
  );
}

export function WordReveal({
  text,
  active,
  duration = 1.1,
}: {
  text: string;
  active: boolean;
  duration?: number;
}) {
  const reducedMotion = useReducedMotion();
  const progress = useMotionValue(0);
  const words = text.split(" ");

  useEffect(() => {
    if (!active || reducedMotion) return;
    const controls = animate(progress, 1, { duration, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [active, duration, progress, reducedMotion]);

  return (
    <>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <Word progress={progress} index={index} count={words.length} reducedMotion={Boolean(reducedMotion)}>
            {word}
          </Word>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}
