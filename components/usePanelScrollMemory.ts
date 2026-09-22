"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToPanel } from "@/components/panelScroll";

const STORAGE_PREFIX = "hz-last-panel:";

// Remembers which `.hz-panel` the user was on for this route, so that
// navigating away (e.g. clicking a nav link into another page) and then
// hitting the browser's back button lands back on the same panel instead of
// resetting to the first one. Next.js unmounts this page's whole component
// tree on route change, so the memory has to live outside React state —
// sessionStorage, keyed per pathname (panel ids are unique per page, but
// namespacing avoids one page's last panel leaking into another's).
//
// An explicit "#panel-id" in the URL (a real nav link) always wins over the
// remembered position, since that's a deliberate destination.
export function usePanelScrollMemory() {
  const pathname = usePathname();
  const storageKey = STORAGE_PREFIX + pathname;

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    let target = hash;
    if (!target) {
      try {
        target = sessionStorage.getItem(storageKey) ?? "";
      } catch {
        target = "";
      }
    }
    if (!target) return;
    const timer = setTimeout(() => scrollToPanel(target), 60);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function onPanelEnter(event: Event) {
      const panelId = (event as CustomEvent<string>).detail;
      if (!panelId) return;
      try {
        sessionStorage.setItem(storageKey, panelId);
      } catch {
        // ignore (private browsing / storage disabled)
      }
    }
    window.addEventListener("hz-panel-enter", onPanelEnter);
    return () => window.removeEventListener("hz-panel-enter", onPanelEnter);
  }, [storageKey]);
}
