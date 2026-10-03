import Link from "next/link";
import type { CSSProperties } from "react";
import type { Project } from "@/data/portfolio";
import type { BookStyle } from "@/data/projectBooks";

/** Font size (in cqw of the cover) that fits a title set one big word per line. */
function fitTitle(text: string, maxWidthCqw: number, maxHeightCqw: number, cap: number) {
  const words = text.toUpperCase().split(/\s+/);
  const longest = Math.max(...words.map((w) => w.length));
  const byWidth = maxWidthCqw / (0.67 * longest);
  const byHeight = maxHeightCqw / (0.92 * words.length);
  return `${Math.min(byWidth, byHeight, cap).toFixed(2)}cqw`;
}

const coverVars = (style: BookStyle) => ({ "--cover": style.cover, "--tint": style.tint }) as CSSProperties;

/** Paperback front cover: solid colour with the title set huge in a lighter tint (title only). */
export function FrontCover({ style }: { style: BookStyle }) {
  return (
    <div className="bkc bkc-front" style={coverVars(style)}>
      <h1 style={{ fontSize: fitTitle(style.short, 82, 92, 21) }}>{style.short}</h1>
    </div>
  );
}

function hash(text: string) {
  let h = 2166136261;
  for (const ch of text) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return h >>> 0;
}

function Barcode({ seed }: { seed: string }) {
  let h = hash(seed);
  const bars: { x: number; w: number }[] = [];
  let x = 4;
  while (x < 92) {
    const w = 1 + (h % 3);
    bars.push({ x, w });
    x += w + 1 + ((h >> 3) % 2);
    h = Math.imul(h ^ (h >>> 13), 0x5bd1e995) >>> 0;
  }
  const digits = String(hash(seed + "#")).padStart(10, "0").slice(0, 10);
  return (
    <svg className="bkc-barcode" viewBox="0 0 96 46" aria-hidden="true">
      <rect x="0" y="0" width="96" height="46" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
      {bars.map((b) => (
        <rect key={b.x} x={b.x} y="5" width={b.w} height="28" fill="currentColor" />
      ))}
      <text x="48" y="42" textAnchor="middle" fontSize="8" fill="currentColor" letterSpacing="1">
        {digits}
      </text>
    </svg>
  );
}

/** Paperback back cover: big heading, blurb, one bold line, "visit" note bottom-left, barcode bottom-right. */
export function BackCover({ project, style, onLinkClick }: { project: Project; style: BookStyle; onLinkClick?: (e: React.MouseEvent) => void }) {
  return (
    <div className="bkc bkc-back" style={coverVars(style)}>
      <h2 style={{ fontSize: fitTitle(style.short, 84, 26, 10) }}>{style.short}</h2>
      <p className="bkc-blurb">{project.summary}</p>
      <strong className="bkc-line">
        {project.headlineMetric} · {project.headlineLabel}
      </strong>
      <div className="bkc-foot">
        <div className="bkc-visit">
          <span>Read the full case study at</span>
          <Link href={`/works/${project.slug}`} onClick={onLinkClick}>
            sakina-saifuddin / works / {project.slug}
          </Link>
        </div>
        <Barcode seed={project.slug} />
      </div>
    </div>
  );
}
