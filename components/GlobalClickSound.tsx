"use client";

import { useEffect, useRef } from "react";
import { attachAudioUnlock, playClickTick } from "@/components/sound";

export function GlobalClickSound() {
  const lastFireRef = useRef(0);

  useEffect(() => {
    attachAudioUnlock();

    function fire() {
      // touchstart, touchend, and the click they synthesize can all land
      // here on mobile — collapse them into a single sound + buzz per tap.
      const now = performance.now();
      if (now - lastFireRef.current < 150) return;
      lastFireRef.current = now;

      // Vibration must be triggered synchronously inside the gesture on
      // some browsers, so fire it before anything async-ish.
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate(12);
      }

      playClickTick();
    }

    window.addEventListener("click", fire);
    window.addEventListener("touchstart", fire, { passive: true });
    window.addEventListener("touchend", fire, { passive: true });
    return () => {
      window.removeEventListener("click", fire);
      window.removeEventListener("touchstart", fire);
      window.removeEventListener("touchend", fire);
    };
  }, []);

  return null;
}
