"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { YearLoaderOverlay } from "@/components/YearLoader";

const COLS = 9;
const ROWS = 6;
const TILE_COUNT = COLS * ROWS;
const TILE_DELAY = 0.014;
const TILE_DURATION = 0.28;
const TOTAL_MS = (TILE_DELAY * (COLS + ROWS - 2) + TILE_DURATION) * 1000 + 20;
const REVEAL_WAIT_MS = 30;
// If the page took long enough for the year countdown to appear, hold briefly so the final year rolls in.
const LOADER_DELAY_MS = 200;
const FINAL_YEAR_HOLD_MS = 550;

export function triggerPageCurtain(href: string) {
  window.dispatchEvent(new CustomEvent<string>("page-curtain", { detail: href }));
}

type Phase = "idle" | "covering" | "covered" | "arrived" | "revealing";

export function PageCurtain() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const pendingHref = useRef<string | null>(null);
  const lastPathname = useRef(pathname);
  const reducedRef = useRef(false);
  const coveredAt = useRef(0);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function onTrigger(event: Event) {
      const href = (event as CustomEvent<string>).detail;
      if (!href || phase !== "idle") return;
      pendingHref.current = href;

      if (reducedRef.current) {
        router.push(href);
        return;
      }
      setPhase("covering");
    }

    window.addEventListener("page-curtain", onTrigger);
    return () => window.removeEventListener("page-curtain", onTrigger);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => {
    if (phase !== "covering") return;
    const t = setTimeout(() => {
      if (pendingHref.current) router.push(pendingHref.current);
      coveredAt.current = Date.now();
      setPhase("covered");
    }, TOTAL_MS);
    return () => clearTimeout(t);
  }, [phase, router]);

  useEffect(() => {
    if (phase !== "covered") return;
    if (pathname === lastPathname.current) return;
    lastPathname.current = pathname;
    const loaderShown = Date.now() - coveredAt.current > LOADER_DELAY_MS;
    if (loaderShown) {
      setPhase("arrived");
      return;
    }
    const t = setTimeout(() => setPhase("revealing"), REVEAL_WAIT_MS);
    return () => clearTimeout(t);
  }, [phase, pathname]);

  useEffect(() => {
    if (phase !== "arrived") return;
    const t = setTimeout(() => setPhase("revealing"), FINAL_YEAR_HOLD_MS);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "revealing") return;
    const t = setTimeout(() => {
      setPhase("idle");
      pendingHref.current = null;
    }, TOTAL_MS);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "idle") return null;

  const tiles = Array.from({ length: TILE_COUNT });

  return (
    <div className="page-curtain" aria-hidden="true">
      {tiles.map((_, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const order = col + row;
        return (
          <motion.span
            key={i}
            className="page-curtain-tile"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: phase === "covering" || phase === "covered" || phase === "arrived" ? 1 : 0 }}
            transition={{ duration: TILE_DURATION, delay: order * TILE_DELAY, ease: [0.65, 0, 0.35, 1] }}
          />
        );
      })}
      {/* While the next page loads, show the same year countdown as the intro screen. */}
      <YearLoaderOverlay show={phase === "covered" || phase === "arrived"} complete={phase === "arrived"} delayMs={LOADER_DELAY_MS} />
    </div>
  );
}
