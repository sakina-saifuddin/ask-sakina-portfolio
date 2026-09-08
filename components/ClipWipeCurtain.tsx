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
    </div>
  );
}
