"use client";

import { useEffect, useRef } from "react";
import { profile } from "@/data/portfolio";
import { ChapterOne } from "@/components/ChapterOne";
import { ChapterTwo } from "@/components/ChapterTwo";
import { ChapterThree } from "@/components/ChapterThree";
import { ChapterFour } from "@/components/ChapterFour";
import { ChapterFive } from "@/components/ChapterFive";
import { Typewriter } from "@/components/Typewriter";

export function HorizontalIntro() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const mobileQuery = window.matchMedia("(max-width: 900px)");

    function onWheel(event: WheelEvent) {
      if (mobileQuery.matches) return;
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();
        el!.scrollLeft += event.deltaY;
      }
    }

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const mobileQuery = window.matchMedia("(max-width: 900px)");

    const panels = Array.from(el.querySelectorAll<HTMLElement>(".hz-panel"));

    function announceActive(panel: HTMLElement | undefined) {
      document.documentElement.dataset.navTheme = panel?.dataset.navTheme || "dark";
      const panelId = panel?.dataset.panelId;
      if (panelId) {
        window.dispatchEvent(new CustomEvent("hz-panel-enter", { detail: panelId }));
      }
    }

    function updateNavThemeDesktop() {
      if (mobileQuery.matches) return;
      const width = el!.clientWidth || 1;
      const index = Math.round(el!.scrollLeft / width);
      announceActive(panels[Math.min(Math.max(index, 0), panels.length - 1)]);
    }

    function updateNavThemeMobile() {
      if (!mobileQuery.matches) return;
      const viewportMid = window.innerHeight / 2;
      let closest = panels[0];
      let closestDist = Infinity;
      panels.forEach((panel) => {
        const rect = panel.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height / 2 - viewportMid);
        if (dist < closestDist) {
          closestDist = dist;
          closest = panel;
        }
      });
      announceActive(closest);
    }

    function update() {
      updateNavThemeDesktop();
      updateNavThemeMobile();
    }

    update();
    el.addEventListener("scroll", updateNavThemeDesktop, { passive: true });
    window.addEventListener("scroll", updateNavThemeMobile, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", updateNavThemeDesktop);
      window.removeEventListener("scroll", updateNavThemeMobile);
      window.removeEventListener("resize", update);
      delete document.documentElement.dataset.navTheme;
    };
  }, []);

  return (
    <div className="hz-stage">
      <div className="hz-track" ref={trackRef}>
        <section className="hz-panel hz-panel-intro">
          <p className="hz-statement">
            <Typewriter text="Working at the intersection of data and technology to build things that are useful, clear, and impactful." />
          </p>

          <h1 className="hz-name">
            <Typewriter text={"Sakina\nSaifuddin"} speed={75} startDelay={3000} sound />
          </h1>

          <div className="hz-bottom-row">
            <span className="hz-bottom-left">{profile.location}</span>
            <span className="hz-bottom-center">Open for early-career roles</span>
            <span className="hz-bottom-right">Scroll</span>
          </div>
        </section>

        <ChapterOne />
        <ChapterTwo />
        <ChapterThree />
        <ChapterFour />
        <ChapterFive />
      </div>
    </div>
  );
}
