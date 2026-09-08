"use client";

import { useEffect, useState } from "react";

export function usePanelEntered(panelId: string) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (entered) return;
    function onEnter(event: Event) {
      const detail = (event as CustomEvent<string>).detail;
      if (detail === panelId) setEntered(true);
    }
    window.addEventListener("hz-panel-enter", onEnter);
    return () => window.removeEventListener("hz-panel-enter", onEnter);
  }, [entered, panelId]);

  return entered;
}
