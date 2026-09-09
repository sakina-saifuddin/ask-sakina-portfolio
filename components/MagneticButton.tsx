"use client";

import { useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import { motion } from "framer-motion";

const STRENGTH = 0.35;
const SPRING = { type: "spring", stiffness: 150, damping: 15, mass: 0.1 } as const;

export function MagneticButton({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function handleMouseMove(event: MouseEvent<HTMLSpanElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    setOffset({
      x: (event.clientX - (left + width / 2)) * STRENGTH,
      y: (event.clientY - (top + height / 2)) * STRENGTH,
    });
  }

  function reset() {
    setOffset({ x: 0, y: 0 });
  }

  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ x: offset.x, y: offset.y }}
      transition={SPRING}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.span>
  );
}
