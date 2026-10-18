"use client";

import { useEffect, useRef } from "react";
import { profile } from "@/data/portfolio";
import { ChapterOne } from "@/components/ChapterOne";
import { ChapterTwo } from "@/components/ChapterTwo";
import { ChapterThree } from "@/components/ChapterThree";
import { ChapterAchievements } from "@/components/ChapterAchievements";
import { ChapterFour } from "@/components/ChapterFour";
import { ChapterFive } from "@/components/ChapterFive";
import { Typewriter } from "@/components/Typewriter";
import { usePanelScrollMemory } from "@/components/usePanelScrollMemory";

export function HorizontalIntro() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Lands on the right panel on arrival — either an explicit "#panel-id"
  // nav link, or (e.g. after the browser's back button) the panel the user
  // was last on before they navigated away.
  usePanelScrollMemory();

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const mobileQuery = window.matchMedia("(max-width: 900px)");
    const panels = Array.from(el.querySelectorAll<HTMLElement>(".hz-panel"));

    const COMMIT_THRESHOLD = 50;
    const GESTURE_IDLE_MS = 250;
    const TRANSITION_MS = 550;

    let accumulated = 0;
    let lastWheelTime = 0;
    let locked = false;
    let unlockTimer: ReturnType<typeof setTimeout> | null = null;

    function nearestPanelIndex() {
      const current = el!.scrollLeft;
      let index = 0;
      let nearestDist = Infinity;
      panels.forEach((panel, i) => {
        const dist = Math.abs(panel.offsetLeft - current);
        if (dist < nearestDist) {
          nearestDist = dist;
          index = i;
        }
      });
      return index;
    }

    function commit(direction: 1 | -1) {
      const targetIndex = Math.min(Math.max(nearestPanelIndex() + direction, 0), panels.length - 1);
      const target = panels[targetIndex];
      if (!target) return;
      locked = true;
      accumulated = 0;
      el!.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
      if (unlockTimer) clearTimeout(unlockTimer);
      unlockTimer = setTimeout(() => {
        locked = false;
      }, TRANSITION_MS);
    }

    function findScrollableAncestor(node: EventTarget | null, deltaY: number): HTMLElement | null {
      let current = node instanceof HTMLElement ? node : null;
      while (current && current !== el) {
        const style = window.getComputedStyle(current);
        const canScrollY = /(auto|scroll)/.test(style.overflowY) && current.scrollHeight > current.clientHeight;
        if (canScrollY) {
          const atTop = current.scrollTop <= 0;
          const atBottom = current.scrollTop + current.clientHeight >= current.scrollHeight - 1;
          if ((deltaY < 0 && !atTop) || (deltaY > 0 && !atBottom)) return current;
        }
        current = current.parentElement;
      }
      return null;
    }

    function onWheel(event: WheelEvent) {
      if (mobileQuery.matches) return;
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      // Let an inner scrollable element (e.g. the AskSakina chat thread)
      // handle its own scroll instead of hijacking it for panel navigation.
      if (findScrollableAncestor(event.target, event.deltaY)) return;
      event.preventDefault();
      if (locked) return;

      const now = performance.now();
      if (now - lastWheelTime > GESTURE_IDLE_MS) accumulated = 0;
      lastWheelTime = now;
      accumulated += event.deltaY;

      if (Math.abs(accumulated) >= COMMIT_THRESHOLD) {
        commit(accumulated > 0 ? 1 : -1);
      }
    }

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (unlockTimer) clearTimeout(unlockTimer);
    };
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
      // Panels aren't all one viewport wide (Chapter III is wider), so pick the nearest panel by position.
      const current = el!.scrollLeft;
      let nearest = panels[0];
      panels.forEach((panel) => {
        if (Math.abs(panel.offsetLeft - current) < Math.abs((nearest?.offsetLeft ?? 0) - current)) nearest = panel;
      });
      announceActive(nearest);
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
        <section className="hz-panel hz-panel-intro" data-panel-id="intro">
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
        <ChapterAchievements />
        <ChapterFour />
        <ChapterFive />
      </div>
    </div>
  );
}
