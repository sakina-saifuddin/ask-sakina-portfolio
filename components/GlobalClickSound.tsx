"use client";

import { useEffect } from "react";
import { attachAudioUnlock, playClickTick } from "@/components/sound";

export function GlobalClickSound() {
  useEffect(() => {
    attachAudioUnlock();

    function onClick() {
      playClickTick();
    }

    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return null;
}
