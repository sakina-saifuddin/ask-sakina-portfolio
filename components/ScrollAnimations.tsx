"use client";

import { useEffect } from "react";

export function ScrollAnimations() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    // Elements already on screen at mount (e.g. above-the-fold cards, or a page
    // restored via browser back/forward) may never fire an IntersectionObserver
    // callback, since no visibility change occurs after observation starts.
    // Reveal those immediately instead of waiting on the observer.
    const pending: HTMLElement[] = [];
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const alreadyVisible = rect.top < viewportHeight - 60 && rect.bottom > 0;
      if (alreadyVisible) {
        el.classList.add("is-visible");
      } else {
        pending.push(el);
      }
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    pending.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return null;
}
