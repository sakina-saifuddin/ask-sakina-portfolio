"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { profile } from "@/data/portfolio";

export function HorizontalIntro() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    function onWheel(event: WheelEvent) {
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();
        el!.scrollLeft += event.deltaY;
      }
    }

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className="hz-stage">
      <div className="hz-track" ref={trackRef}>
        <section className="hz-panel hz-panel-intro">
          <h1 className="hz-name">Sakina<br />Saifuddin</h1>

          <div className="hz-bottom-row">
            <span className="hz-bottom-item hz-bottom-left">{profile.location}</span>
            <span className="hz-bottom-item hz-bottom-center">Open for early-career roles</span>
            <span className="hz-bottom-item hz-bottom-right">Scroll</span>
          </div>
        </section>

        <section className="hz-panel hz-panel-image">
          <div className="hz-portrait">
            <Image src="/profile.jpg" alt="Sakina Saifuddin" fill priority sizes="70vw" />
          </div>
        </section>

        <section className="hz-panel hz-panel-quote">
          <p className="hz-quote">Systems for impact.<br />Code for curiosity.</p>
        </section>
      </div>
    </div>
  );
}
