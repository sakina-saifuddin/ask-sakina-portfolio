"use client";

import { useEffect, useRef } from "react";

// Rain streaks plus a few beads that creep down the glass. Sits over the window
// area of the Blender render. Draws one still frame when reduced motion is on.
export function Rain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const slant = 0.16;
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    type Drop = { x: number; y: number; l: number; v: number; a: number };
    type Bead = { x: number; y: number; r: number; v: number };
    let drops: Drop[] = [];
    let beads: Bead[] = [];

    const drop = (anywhere: boolean): Drop => ({
      x: Math.random() * (w + h * slant),
      y: anywhere ? Math.random() * h : -h * 0.1,
      l: h * (0.04 + Math.random() * 0.07),
      v: h * (1.1 + Math.random() * 1.1),
      a: 0.1 + Math.random() * 0.28,
    });
    const bead = (): Bead => ({ x: Math.random() * w, y: Math.random() * h, r: 1 + Math.random() * 2.6, v: 0 });

    const init = () => {
      drops = Array.from({ length: Math.round(w / 5) }, () => drop(true));
      beads = Array.from({ length: Math.round(w / 16) }, bead);
    };
    const resize = () => {
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = Math.max(1, Math.floor(w * dpr));
      c.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
      if (reduce) frame(0.016);
    };

    const frame = (dt: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      for (const d of drops) {
        ctx.strokeStyle = `rgba(190,210,240,${d.a})`;
        ctx.beginPath();
        ctx.moveTo(d.x + d.l * slant, d.y - d.l);
        ctx.lineTo(d.x, d.y);
        ctx.stroke();
        if (!reduce) {
          d.y += d.v * dt;
          d.x -= d.v * slant * dt;
          if (d.y - d.l > h || d.x < -20) Object.assign(d, drop(false));
        }
      }
      for (const b of beads) {
        ctx.fillStyle = "rgba(170,200,235,0.09)";
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.22)";
        ctx.beginPath();
        ctx.arc(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.3, 0, Math.PI * 2);
        ctx.fill();
        if (!reduce) {
          if (b.v === 0 && Math.random() < 0.0008) b.v = h * (0.04 + Math.random() * 0.08);
          if (b.v > 0) {
            ctx.strokeStyle = "rgba(170,200,235,0.07)";
            ctx.beginPath();
            ctx.moveTo(b.x, b.y - b.v * 0.6);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            b.y += b.v * dt;
            if (b.y > h) Object.assign(b, bead(), { y: 0 });
          }
        }
      }
    };

    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000 || 0.016);
      last = t;
      frame(dt);
      raf = requestAnimationFrame(loop);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(c);
    if (!reduce) raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="rain" aria-hidden="true" />;
}
