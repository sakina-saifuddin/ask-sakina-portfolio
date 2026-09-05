"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

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
          <div className="hz-label">
            <span className="hz-eyebrow">Chapter I</span>
            <span className="hz-eyebrow-title">Introduction</span>
          </div>
          <h1 className="hz-name">Sakina<br />Saifuddin</h1>
          <p className="hz-statement">AI, data, software, and automation — built with curiosity and intention.</p>
          <span className="hz-hint">Scroll to continue →</span>
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
