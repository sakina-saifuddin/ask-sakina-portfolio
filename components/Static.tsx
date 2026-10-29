"use client";

import { useEffect, useRef } from "react";

// Real TV static: fresh random grey pixels every frame, scaled up and pixelated.
export function Static() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const w = (c.width = 128);
    const h = (c.height = 96);
    const img = ctx.createImageData(w, h);
    let raf = 0;
    let n = 0;
    const draw = () => {
      if (n++ % 2 === 0) {
        const d = img.data;
        for (let i = 0; i < d.length; i += 4) {
          const v = 40 + Math.random() * 215;
          d[i] = v * 0.92;
          d[i + 1] = v;
          d[i + 2] = v * 0.94;
          d[i + 3] = 255;
        }
        ctx.putImageData(img, 0, 0);
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={ref} className="static" aria-hidden="true" />;
}
