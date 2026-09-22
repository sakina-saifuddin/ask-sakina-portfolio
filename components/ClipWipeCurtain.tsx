"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const PANEL_DURATION = 0.4;
const TOTAL_MS = PANEL_DURATION * 1000 + 20;
const REVEAL_WAIT_MS = 30;
const EASE = [0.76, 0, 0.24, 1] as const;

export function triggerClipWipeCurtain(href: string) {
  window.dispatchEvent(new CustomEvent<string>("clip-wipe-curtain", { detail: href }));
}

type Phase = "idle" | "covering" | "covered" | "revealing";

export function ClipWipeCurtain() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const pendingHref = useRef<string | null>(null);
  const lastPathname = useRef(pathname);
  const reducedRef = useRef(false);

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

    window.addEventListener("clip-wipe-curtain", onTrigger);
    return () => window.removeEventListener("clip-wipe-curtain", onTrigger);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => {
    if (phase !== "covering") return;
    const t = setTimeout(() => {
      if (pendingHref.current) router.push(pendingHref.current);
      setPhase("covered");
    }, TOTAL_MS);
    return () => clearTimeout(t);
  }, [phase, router]);

  useEffect(() => {
    if (phase !== "covered") return;
    if (pathname === lastPathname.current) return;
    lastPathname.current = pathname;
    const t = setTimeout(() => setPhase("revealing"), REVEAL_WAIT_MS);
    return () => clearTimeout(t);
  }, [phase, pathname]);

  useEffect(() => {
    if (phase !== "revealing") return;
    const t = setTimeout(() => {
      setPhase("idle");
      pendingHref.current = null;
    }, TOTAL_MS);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "idle") return null;

  const covered = phase === "covering" || phase === "covered";
  // The page behind the curtain can take a few seconds to load (first
  // visit to a route, image-heavy project pages, etc.) — "covered" has no
  // fixed duration, it just waits for the route to actually finish
  // navigating. Without something moving on screen that wait reads as a
  // frozen page, so show a progress bar: it creeps toward ~85% while
  // waiting (we don't know the real load progress) and only completes to
  // 100% once the destination has actually mounted.
  const finishing = phase === "revealing";

  return (
    <div className="clip-wipe-curtain" aria-hidden="true">
      <motion.span
        className="clip-wipe-panel clip-wipe-panel-left"
        initial={false}
        animate={{ clipPath: covered ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
        transition={{ duration: PANEL_DURATION, ease: EASE }}
      />
      <motion.span
        className="clip-wipe-panel clip-wipe-panel-right"
        initial={false}
        animate={{ clipPath: covered ? "inset(0 0 0 0%)" : "inset(0 0 0 100%)" }}
        transition={{ duration: PANEL_DURATION, ease: EASE }}
      />

      <motion.div
        className="clip-wipe-loader"
        initial={{ opacity: 0 }}
        animate={{ opacity: covered ? 1 : 0 }}
        transition={{ duration: 0.2, delay: finishing ? 0.15 : 0 }}
      >
        <span className="clip-wipe-loader-label">Loading</span>
        <span className="clip-wipe-loader-track">
          <motion.span
            className="clip-wipe-loader-fill"
            initial={{ width: "0%" }}
            animate={{ width: finishing ? "100%" : "85%" }}
            transition={finishing ? { duration: 0.25, ease: "easeOut" } : { duration: 4, ease: "easeOut" }}
          />
        </span>
      </motion.div>
    </div>
  );
}
