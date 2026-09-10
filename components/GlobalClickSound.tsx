"use client";

import { useEffect, useRef } from "react";
import { attachAudioUnlock, playClickTick } from "@/components/sound";

export function GlobalClickSound() {
  const lastFireRef = useRef(0);

  useEffect(() => {
    attachAudioUnlock();

    function fire() {
      // touchend and the click it synthesizes both land here on mobile —
      // collapse them into a single sound + buzz per tap.
      const now = performance.now();
      if (now - lastFireRef.current < 100) return;
      lastFireRef.current = now;

      playClickTick();

      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate(12);
      }
    }

    window.addEventListener("click", fire);
    window.addEventListener("touchend", fire, { passive: true });
    return () => {
      window.removeEventListener("click", fire);
      window.removeEventListener("touchend", fire);
    };
  }, []);

  return null;
}
