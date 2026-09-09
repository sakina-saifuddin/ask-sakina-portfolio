"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import { attachAudioUnlock, playWheelTick } from "@/components/sound";

const YEARS = [2021, 2022, 2023, 2024, 2025, 2026];
const STEP_MS = 400;
const HOLD_MS = 700;
const SHUTTER_MS = 950;
const REDUCED_HOLD_MS = 300;
const REDUCED_SHUTTER_MS = 400;

const SMOOTH_EASE = [0.65, 0, 0.35, 1] as const;
const SMOOTH_EASE_OUT = [0.16, 1, 0.3, 1] as const;

const yearVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: SMOOTH_EASE_OUT } },
  exit: { opacity: 0, y: -40, transition: { duration: 0.42, ease: SMOOTH_EASE } },
};

const copyVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.32, ease: SMOOTH_EASE_OUT } },
  exit: { opacity: 0, y: -14, transition: { duration: 0.38, ease: SMOOTH_EASE } },
};

export function IntroLoader() {
  const [index, setIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(true);
  const reducedRef = useRef(false);

  useEffect(() => {
    attachAudioUnlock();
  }, []);

  useEffect(() => {
    if (index > 0) playWheelTick();
  }, [index]);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timers: ReturnType<typeof setTimeout>[] = [];

    const reveal = () => {
      setExiting(true);
      document.body.classList.add("intro-revealing");
    };

    if (reducedRef.current) {
      setIndex(YEARS.length - 1);
      timers.push(setTimeout(reveal, REDUCED_HOLD_MS));
    } else {
      YEARS.forEach((_, i) => {
        if (i === 0) return;
        timers.push(setTimeout(() => setIndex(i), i * STEP_MS));
      });
      timers.push(setTimeout(reveal, (YEARS.length - 1) * STEP_MS + HOLD_MS));
    }

    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(() => {
      document.body.style.overflow = "";
      setMounted(false);
    }, reducedRef.current ? REDUCED_SHUTTER_MS : SHUTTER_MS);
    return () => clearTimeout(t);
  }, [exiting]);

  if (!mounted) return null;

  const year = String(YEARS[index]);
  const fixedPart = year.slice(0, 2);
  const movingPart = year.slice(2);

  return (
    <motion.div
      className="intro-loader"
      initial={{ y: 0 }}
      animate={{ y: exiting ? "-100%" : 0 }}
      transition={{
        duration: (reducedRef.current ? REDUCED_SHUTTER_MS : SHUTTER_MS) / 1000,
        ease: SMOOTH_EASE,
      }}
      aria-hidden="true"
    >
      <div className="hz-nav">
        <span className="hz-rail-line" />
        <span className="hz-nav-hamburger">
          <Menu size={20} strokeWidth={1.6} />
        </span>
        <span className="hz-nav-vertical hz-nav-label">Folio — Edition</span>
        <span className="hz-nav-vertical hz-nav-name">Sakina Saifuddin</span>
        <span className="hz-nav-vertical hz-nav-year">© 2026</span>
      </div>

      <motion.div
        className="intro-loader-year"
        initial="hidden"
        animate={exiting ? "exit" : "visible"}
        variants={yearVariants}
      >
        <span className="intro-loader-year-fixed">{fixedPart}</span>
        <span className="intro-loader-year-anim">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={movingPart}
              className="intro-loader-year-digit"
              initial={{ y: "115%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-115%", opacity: 0 }}
              transition={{ duration: 0.46, ease: SMOOTH_EASE }}
            >
              {movingPart}
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.div>

      <motion.p
        className="intro-loader-copy"
        initial="hidden"
        animate={exiting ? "exit" : "visible"}
        variants={copyVariants}
      >
        A journey through code, data, and intelligent systems.
      </motion.p>
    </motion.div>
  );
}
