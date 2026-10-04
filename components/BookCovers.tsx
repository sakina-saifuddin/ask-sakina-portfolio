import Link from "next/link";
import type { CSSProperties } from "react";
import type { Project } from "@/data/portfolio";
import type { BookStyle } from "@/data/projectBooks";

/** Font size (in cqw of the cover) that fits the given lines inside a box of maxWidth × maxHeight cqw. */
function fitLines(lines: string[], maxWidthCqw: number, maxHeightCqw: number, cap: number, charWidth = 0.66) {
  const longest = Math.max(...lines.map((l) => l.length));
  const byWidth = maxWidthCqw / (charWidth * longest);
  const byHeight = maxHeightCqw / (0.95 * lines.length);
  return `${Math.min(byWidth, byHeight, cap).toFixed(2)}cqw`;
}

const coverVars = (style: BookStyle) => ({ "--cover": style.cover, "--tint": style.tint }) as CSSProperties;

const firstSentences = (text: string, n = 2) => (text.match(/[^.!?]+[.!?]+/g) ?? [text]).slice(0, n).join(" ").trim();

/**
 * Paperback front cover, laid out like the reference: the title set huge in a lighter tint of the
 * cover colour, a bold white line under it saying what the project is, and a small credit.
 */
export function FrontCover({ style }: { style: BookStyle }) {
  const lines = style.title.toUpperCase().split("|");
  return (
    <div className="bkc bkc-front" style={coverVars(style)}>
      <div className="bkc-front-block">
        <h1 style={{ fontSize: fitLines(lines, 80, 62, 19) }}>
          {lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>
        <p className="bkc-sub">{style.subtitle}</p>
        <p className="bkc-credit">© Sakina Saifuddin</p>
      </div>
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
  let x = 8;
  while (x < 88) {
    const w = 1 + (h % 3);
    bars.push({ x, w });
    x += w + 1 + ((h >> 3) % 2);
    h = Math.imul(h ^ (h >>> 13), 0x5bd1e995) >>> 0;
  }
  const digits = String(hash(seed + "#")).padStart(5, "0").slice(0, 5);
  return (
    <svg className="bkc-barcode" viewBox="0 0 96 56" aria-hidden="true">
      <rect x="1" y="1" width="94" height="54" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
      {bars.map((b) => (
        <rect key={b.x} x={b.x} y="8" width={b.w} height="26" fill="currentColor" />
      ))}
      <rect x="22" y="36" width="52" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="48" y="47" textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor" letterSpacing="1.5">
        {digits}
      </text>
    </svg>
  );
}

function splitInTwo(text: string) {
  const words = text.split(" ");
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

/**
 * Paperback back cover, laid out like the reference: big tinted heading, blurb paragraphs,
 * one bold centred line, more blurb, "visit the website" bottom-left and a barcode bottom-right.
 */
export function BackCover({
  project,
  style,
  onLinkClick,
}: {
  project: Project;
  style: BookStyle;
  onLinkClick?: (e: React.MouseEvent) => void;
}) {
  const heading = style.short.toUpperCase();
  const headingLines = heading.split(" ").length > 2 ? splitInTwo(heading) : [heading];
  const result = project.caseStudySections?.find((s) => /result|outcome/i.test(s.title))?.text;
  return (
    <div className="bkc bkc-back" style={coverVars(style)}>
      <h2 style={{ fontSize: fitLines(headingLines, 80, 24, 11) }}>
        {headingLines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </h2>
      <p>{project.summary}</p>
      <p>{project.problem}</p>
      {result && <p>{firstSentences(result)}</p>}
      <strong className="bkc-line">
        {project.headlineMetric} · {project.headlineLabel}
      </strong>
      <p>{project.outcomes.map((o) => `${o.value} ${o.label}`).join(" · ")}.</p>
      <div className="bkc-foot">
        <div className="bkc-visit">
          <span>
            Visit the portfolio
            <br />
            website at:
          </span>
          <Link href={`/works/${project.slug}`} onClick={onLinkClick}>
            sakina-saifuddin / works
          </Link>
        </div>
        <Barcode seed={project.slug} />
      </div>
    </div>
  );
}

/** The printed spine: project name and author running down it. */
export function Spine({ style }: { style: BookStyle }) {
  return (
    <div className="bkc-spine" style={coverVars(style)}>
      <span>{style.short}</span>
      <em>Sakina Saifuddin</em>
    </div>
  );
}

/**
 * A closed paperback as a real 3D object: front and back covers, printed spine, the block of
 * page edges and the top edge. `rotate` is the turn around the vertical axis in degrees
 * (about -25 shows the front with the page block, about 155 shows the back with the spine).
 */
export function Book3D({
  style,
  project,
  rotate,
  tilt = -6,
  className = "",
  onBackLinkClick,
}: {
  style: BookStyle;
  project?: Project;
  rotate: number;
  tilt?: number;
  className?: string;
  onBackLinkClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <div className={`b3d ${className}`} style={coverVars(style)}>
      <span className="b3d-shadow" style={{ transform: `translateX(${rotate > 90 ? -6 : 6}%)`, opacity: rotate % 180 === 0 ? 0.55 : 1 }} />
      <div className="b3d-body" style={{ transform: `rotateX(${tilt}deg) rotateY(${rotate}deg)` }}>
        <div className="b3d-face b3d-front">
          <FrontCover style={style} />
        </div>
        <div className="b3d-face b3d-back">
          {project ? <BackCover project={project} style={style} onLinkClick={onBackLinkClick} /> : <div className="bkc" />}
        </div>
        <div className="b3d-spine">
          <Spine style={style} />
        </div>
        <div className="b3d-pages" />
        <div className="b3d-top" />
      </div>
    </div>
  );
}
