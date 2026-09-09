"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";

type Particle = {
  id: number;
  x: number;
  y: number;
  rotate: number;
  scale: number;
  duration: number;
  shape: "rect" | "circle";
};

let particleSeq = 0;

function makeBurst(count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = 70 + Math.random() * 150;
    particles.push({
      id: particleSeq++,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance - 40,
      rotate: Math.random() * 520 - 260,
      scale: 0.6 + Math.random() * 0.7,
      duration: 0.7 + Math.random() * 0.5,
      shape: Math.random() > 0.5 ? "rect" : "circle",
    });
  }
  return particles;
}

export function ConfettiButton() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const reducedRef = useRef(false);

  function handleClick() {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isLight = document.documentElement.dataset.navTheme === "light";
    const color = isLight ? "#171310" : "#F2ECE0";
    document.documentElement.style.setProperty("--confetti-color", color);

    if (!reducedRef.current) {
      const burst = makeBurst(34);
      setParticles(burst);
      window.setTimeout(() => setParticles([]), 1200);
    }
  }

  return (
    <span className="confetti-button-wrap">
      <MagneticButton>
        <a
          href="/resume.pdf"
          download="Sakina-Saifuddin-Resume.pdf"
          className="confetti-button"
          onClick={handleClick}
          aria-label="Download Sakina Saifuddin's resume"
        >
          Click Me
        </a>
      </MagneticButton>

      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className={`confetti-piece confetti-piece-${p.shape}`}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.4 }}
            animate={{ x: p.x, y: p.y, opacity: 0, rotate: p.rotate, scale: p.scale }}
            exit={{ opacity: 0 }}
            transition={{ duration: p.duration, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </AnimatePresence>
    </span>
  );
}
