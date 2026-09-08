"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const HERO_ATTR = "data-hero-slug";

type Rect = { top: number; left: number; width: number; height: number };

type TriggerPayload = { slug: string; src: string; href: string; rect: Rect };

type TransitionState = {
  slug: string;
  src: string;
  href: string;
} | null;

export function startProjectImageTransition(payload: TriggerPayload) {
  window.dispatchEvent(new CustomEvent<TriggerPayload>("project-image-transition", { detail: payload }));
}

function heroRect(): Rect {
  const width = Math.min(window.innerWidth * 0.6, 820);
  const height = width * 0.62;
  return {
    top: (window.innerHeight - height) / 2,
    left: (window.innerWidth - width) / 2,
    width,
    height,
  };
}

export function ProjectImageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useState<TransitionState>(null);
  const [rect, setRect] = useState<Rect | null>(null);
  const triggeredAt = useRef(0);

  useEffect(() => {
    function onTrigger(event: Event) {
      const detail = (event as CustomEvent<TriggerPayload>).detail;
      if (!detail) return;
      sessionStorage.setItem("pd-hero-slug", detail.slug);
      triggeredAt.current = Date.now();
      setState({ slug: detail.slug, src: detail.src, href: detail.href });
      setRect(detail.rect);
      router.push(detail.href);
      const t = setTimeout(() => setRect(heroRect()), 20);
      return () => clearTimeout(t);
    }
    window.addEventListener("project-image-transition", onTrigger);
    return () => window.removeEventListener("project-image-transition", onTrigger);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    if (!state || pathname !== state.href) return;
    let cancelled = false;
    let attempts = 0;

    function land() {
      if (cancelled) return;
      const target = document.querySelector<HTMLElement>(`[${HERO_ATTR}="${state!.slug}"]`);
      attempts += 1;
      if (target) {
        const r = target.getBoundingClientRect();
        setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
        setTimeout(() => {
          if (cancelled) return;
          window.dispatchEvent(new CustomEvent("project-image-landed", { detail: { slug: state!.slug } }));
          setState(null);
          setRect(null);
        }, 560);
        return;
      }
      if (attempts < 60) {
        requestAnimationFrame(land);
      } else {
        window.dispatchEvent(new CustomEvent("project-image-landed", { detail: { slug: state!.slug } }));
        setState(null);
        setRect(null);
      }
    }

    const minPop = Math.max(0, 480 - (Date.now() - triggeredAt.current));
    const t = setTimeout(land, minPop);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [pathname, state]);

  if (!state || !rect) return null;

  return (
    <motion.div
      className="pit-overlay"
      initial={false}
      animate={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={state.src} alt="" />
    </motion.div>
  );
}
