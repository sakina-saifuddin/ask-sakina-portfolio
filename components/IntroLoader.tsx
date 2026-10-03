"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { attachAudioUnlock, playWheelTick } from "@/components/sound";
import { YEARS, YEAR_STEP_MS as STEP_MS, YearLoaderContent } from "@/components/YearLoader";

const HOLD_MS = 700;
const SHUTTER_MS = 950;
const REDUCED_HOLD_MS = 300;
const REDUCED_SHUTTER_MS = 400;

const SMOOTH_EASE = [0.65, 0, 0.35, 1] as const;

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
      <YearLoaderContent index={index} exiting={exiting} />
    </motion.div>
  );
}
