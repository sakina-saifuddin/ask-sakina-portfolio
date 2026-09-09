"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, { stiffness: 900, damping: 40, mass: 0.3 });
  const y = useSpring(rawY, { stiffness: 900, damping: 40, mass: 0.3 });

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setEnabled(canHover);
    if (!canHover) return;

    function onMouseMove(event: MouseEvent) {
      rawX.set(event.clientX);
      rawY.set(event.clientY);
      setVisible((prev) => (prev ? prev : true));
    }

    function onMouseLeaveWindow() {
      setVisible(false);
    }

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeaveWindow);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) return null;

  return (
    <motion.span
      className={`custom-cursor-ball${visible ? " is-visible" : ""}`}
      style={{ x, y }}
      aria-hidden="true"
    />
  );
}
