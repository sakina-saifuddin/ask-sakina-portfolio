"use client";

import { useEffect, useRef } from "react";

// Rain on the window. Each drop belongs to one of three depth layers (far = slow, short and
// faint, near = fast, long and bright) and has its own speed, angle and opacity. A slow gust
// pushes the whole sheet sideways, beads of water sit on the glass and some of them run down.
export function Rain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let clock = 0;
    type Drop = { x: number; y: number; l: number; v: number; a: number; slant: number; wd: number };
    type Bead = { x: number; y: number; r: number; v: number; trail: number };
    let drops: Drop[] = [];
    let beads: Bead[] = [];

    const drop = (anywhere: boolean): Drop => {
      const depth = Math.random(); // 0 far .. 1 near
      return {
        x: Math.random() * (w * 1.3) - w * 0.1,
        y: anywhere ? Math.random() * h : -h * 0.15,
        l: h * (0.025 + depth * 0.09 + Math.random() * 0.02),
        v: h * (0.7 + depth * 1.6 + Math.random() * 0.3),
        a: 0.06 + depth * 0.34 * (0.6 + Math.random() * 0.4),
        slant: 0.08 + Math.random() * 0.14,
        wd: 0.5 + depth * 0.9,
      };
    };
    const bead = (): Bead => ({ x: Math.random() * w, y: Math.random() * h, r: 0.8 + Math.random() * 2.8, v: 0, trail: 0 });

    const init = () => {
      drops = Array.from({ length: Math.round(w / 3.6) }, () => drop(true));
      beads = Array.from({ length: Math.round(w / 12) }, bead);
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
      clock += dt;
      // gusts: a slow swell plus a faster flutter, so the angle never stays constant
      const gust = 1 + 0.55 * Math.sin(clock * 0.37) + 0.25 * Math.sin(clock * 1.9 + 1.3);
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";
      for (const d of drops) {
        const s = d.slant * gust;
        ctx.lineWidth = d.wd;
        ctx.strokeStyle = `rgba(196,214,242,${d.a})`;
        ctx.beginPath();
        ctx.moveTo(d.x + d.l * s, d.y - d.l);
        ctx.lineTo(d.x, d.y);
        ctx.stroke();
        if (!reduce) {
          d.y += d.v * dt;
          d.x -= d.v * s * dt;
          if (d.y - d.l > h || d.x < -30) Object.assign(d, drop(false));
        }
      }
      for (const b of beads) {
        const g = ctx.createRadialGradient(b.x - b.r * 0.3, b.y - b.r * 0.3, 0, b.x, b.y, b.r);
        g.addColorStop(0, "rgba(255,255,255,0.4)");
        g.addColorStop(0.5, "rgba(170,200,235,0.12)");
        g.addColorStop(1, "rgba(140,175,225,0.04)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.ellipse(b.x, b.y, b.r, b.r * (1 + Math.min(0.6, b.v / h)), 0, 0, Math.PI * 2);
        ctx.fill();
        if (!reduce) {
          if (b.v === 0 && b.r > 1.6 && Math.random() < 0.0012) b.v = h * (0.03 + Math.random() * 0.07);
          if (b.v > 0) {
            ctx.strokeStyle = "rgba(170,200,235,0.08)";
            ctx.lineWidth = Math.max(0.6, b.r * 0.5);
            ctx.beginPath();
            ctx.moveTo(b.x, b.y - b.trail);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            b.trail = Math.min(b.trail + b.v * dt, h * 0.12);
            // beads wobble as they run and stop now and then
            b.y += b.v * dt * (0.6 + 0.4 * Math.sin(clock * 3 + b.x));
            b.r *= 0.9997;
            if (Math.random() < 0.004) b.v = 0;
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
