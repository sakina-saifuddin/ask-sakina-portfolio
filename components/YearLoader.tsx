"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";

export const YEARS = [2021, 2022, 2023, 2024, 2025, 2026];
export const YEAR_STEP_MS = 400;

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

/** The year countdown (rail + rolling year + tagline). Positioning comes from the parent `.intro-loader`. */
export function YearLoaderContent({ index, exiting = false }: { index: number; exiting?: boolean }) {
  const year = String(YEARS[Math.min(index, YEARS.length - 1)]);
  const fixedPart = year.slice(0, 2);
  const movingPart = year.slice(2);

  return (
    <>
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
    </>
  );
}

/**
 * Year countdown shown while a page is loading. The years advance while we wait and stop one short of
 * the last year; when `complete` turns true the last year rolls in. It only appears if the wait lasts
 * longer than `delayMs`, so fast navigations don't flash it.
 */
export function YearLoaderOverlay({
  show,
  complete = false,
  delayMs = 200,
}: {
  show: boolean;
  complete?: boolean;
  delayMs?: number;
}) {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!show) {
      setVisible(false);
      return;
    }
    setIndex(0);
    const t = setTimeout(() => setVisible(true), delayMs);
    return () => clearTimeout(t);
  }, [show, delayMs]);

  useEffect(() => {
    if (!visible || complete) return;
    const t = setInterval(() => setIndex((i) => Math.min(i + 1, YEARS.length - 2)), YEAR_STEP_MS);
    return () => clearInterval(t);
  }, [visible, complete]);

  useEffect(() => {
    if (complete) setIndex(YEARS.length - 1);
  }, [complete]);

  return (
    <AnimatePresence>
      {show && visible && (
        <motion.div
          key="year-loader"
          className="intro-loader year-loader-overlay"
          role="status"
          aria-label="Loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <YearLoaderContent index={index} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
