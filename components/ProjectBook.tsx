"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { BOOK_STAGES, getBookContent, type BookSpread, type ProjectBookContent } from "@/data/projectBooks";
import "./project-book.css";

const TURN_MS = 1000;

type BookPage =
  | { kind: "cover" }
  | { kind: "picture"; spread: BookSpread; n: number }
  | { kind: "story"; spread: BookSpread; n: number }
  | { kind: "gallery" }
  | { kind: "contribution" }
  | { kind: "back" };

// cover · (picture | story) per spread · gallery | technologies · back — always an even count,
// so pictures land on left pages, their story on the right, and the back cover on the last leaf.
function buildPages(content: ProjectBookContent): BookPage[] {
  const pages: BookPage[] = [{ kind: "cover" }];
  content.spreads.forEach((spread, i) => {
    pages.push({ kind: "picture", spread, n: i + 1 });
    pages.push({ kind: "story", spread, n: i + 1 });
  });
  pages.push({ kind: "gallery" }, { kind: "contribution" }, { kind: "back" });
  return pages;
}

export function ProjectBook({ project }: { project: Project }) {
  const content = useMemo(() => getBookContent(project), [project]);
  const pages = useMemo(() => buildPages(content), [content]);
  const leafCount = pages.length / 2;

  const [flipped, setFlipped] = useState(0);
  const [side, setSide] = useState<"left" | "right">("right");
  const [turning, setTurning] = useState<number | null>(null);
  const [narrow, setNarrow] = useState(false);
  const turnTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const turn = useCallback((leaf: number, nextFlipped: number) => {
    setTurning(leaf);
    setFlipped(nextFlipped);
    clearTimeout(turnTimer.current);
    turnTimer.current = setTimeout(() => setTurning(null), TURN_MS);
  }, []);

  const next = useCallback(() => {
    if (narrow) {
      if (side === "left" && flipped < leafCount) return setSide("right");
      if (side === "right" && flipped < leafCount) {
        turn(flipped, flipped + 1);
        setSide("left");
      }
      return;
    }
    if (flipped < leafCount) turn(flipped, flipped + 1);
  }, [narrow, side, flipped, leafCount, turn]);

  const prev = useCallback(() => {
    if (narrow) {
      if (side === "right" && flipped > 0) return setSide("left");
      if (side === "left" && flipped > 0) {
        turn(flipped - 1, flipped - 1);
        setSide("right");
      }
      return;
    }
    if (flipped > 0) turn(flipped - 1, flipped - 1);
  }, [narrow, side, flipped, turn]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  useEffect(() => () => clearTimeout(turnTimer.current), []);

  const atStart = flipped === 0 && (!narrow || side === "right");
  const atEnd = flipped === leafCount;

  let shift = "0%";
  if (narrow) shift = side === "right" ? "-50%" : "0%";
  else if (flipped === 0) shift = "-25%";
  else if (flipped === leafCount) shift = "25%";

  const spreadCount = content.spreads.length;
  let status: string;
  if (flipped === 0) status = "Cover";
  else if (flipped === leafCount) status = "Back cover";
  else if (flipped > spreadCount) status = "Technologies";
  else status = content.spreads[flipped - 1].stage;

  return (
    <main className="bk-root">
      <header className="bk-topbar">
        <Link href={`/works/${project.slug}`} className="bk-back">
          <ArrowLeft size={16} /> Case study
        </Link>
        <span className="bk-hint">Click a page, swipe, or use ← → to turn</span>
      </header>

      <div
        className="bk-stage"
        onClick={(e) => {
          // A closed book (front or back cover) only turns one way.
          if (!narrow && flipped === 0) return next();
          if (!narrow && flipped === leafCount) return prev();
          const rect = e.currentTarget.getBoundingClientRect();
          const ratio = (e.clientX - rect.left) / rect.width;
          (ratio < (narrow ? 0.4 : 0.5) ? prev : next)();
        }}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
          touchX.current = null;
        }}
      >
        <div className="bk-book" style={{ transform: `translateX(${shift})` }}>
          {Array.from({ length: leafCount }, (_, i) => {
            const isFlipped = i < flipped;
            const z = turning === i ? leafCount * 3 : isFlipped ? i + 1 : leafCount * 2 - i;
            const classes = [
              "bk-leaf",
              turning === i && "is-turning",
              (turning === i || i === flipped || i === flipped - 1) && "is-top",
              (i === 0 || i === leafCount - 1) && "is-hard",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <div
                key={i}
                className={classes}
                style={{ zIndex: z, transform: `perspective(3200px) rotateY(${isFlipped ? -180 : 0}deg)` }}
              >
                <div className="bk-face bk-front">
                  <PageContent page={pages[i * 2]} index={i * 2} project={project} content={content} />
                </div>
                <div className="bk-face bk-reverse">
                  <PageContent page={pages[i * 2 + 1]} index={i * 2 + 1} project={project} content={content} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <nav className="bk-controls" aria-label="Book navigation">
        <button type="button" onClick={prev} disabled={atStart} aria-label="Previous page">
          <ChevronLeft size={20} />
        </button>
        <span aria-live="polite">{status}</span>
        <button type="button" onClick={next} disabled={atEnd} aria-label="Next page">
          <ChevronRight size={20} />
        </button>
      </nav>
    </main>
  );
}

type PageProps = { page: BookPage; index: number; project: Project; content: ProjectBookContent };

function stop(e: React.MouseEvent) {
  e.stopPropagation();
}

function PageContent({ page, index, project, content }: PageProps) {
  switch (page.kind) {
    case "cover":
      return (
        <div className="bk-cover">
          <div className="bk-cover-frame">
            <h1>{project.title}</h1>
          </div>
        </div>
      );

    case "picture":
      return (
        <div className="bk-paper bk-picture">
          <a href={page.spread.image} target="_blank" rel="noreferrer" title="Open full size" onClick={stop}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={page.spread.image} alt={page.spread.title} />
          </a>
          <span className="bk-fig">
            Fig. {page.n} — {page.spread.imageCaption ?? page.spread.title}
          </span>
          <span className="bk-folio">{index}</span>
        </div>
      );

    case "story": {
      const { spread } = page;
      return (
        <div className="bk-paper bk-story">
          <ol className="bk-steps-track" aria-label={`Section: ${spread.stage}`}>
            {BOOK_STAGES.map((stage) => (
              <li key={stage} className={stage === spread.stage ? "is-on" : undefined}>
                {stage}
              </li>
            ))}
          </ol>
          <h2>{spread.title}</h2>
          {spread.text && <p>{spread.text}</p>}
          {spread.points && (
            <ul className="bk-points">
              {spread.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          )}
          {spread.stat && (
            <div className="bk-result">
              <strong>{spread.stat.value}</strong>
              <span>{spread.stat.label}</span>
            </div>
          )}
          {spread.stats && (
            <div className="bk-stats">
              {spread.stats.map((st) => (
                <div key={st.label}>
                  <strong>{st.value}</strong>
                  <span>{st.label}</span>
                </div>
              ))}
            </div>
          )}
          {spread.tools && (
            <div className="bk-used">
              <span className="bk-label">Used</span>
              <div className="bk-chips">
                {spread.tools.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          )}
          <span className="bk-folio">{index}</span>
        </div>
      );
    }

    case "gallery":
      return (
        <div className="bk-paper bk-gallery">
          {[...new Set(content.spreads.map((s) => s.image))].slice(0, 6).map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt="" />
          ))}
          <span className="bk-folio">{index}</span>
        </div>
      );

    case "contribution":
      return (
        <div className="bk-paper bk-story bk-contrib">
          <h2>Technologies</h2>
          <dl className="bk-stack">
            {content.stack.map((t) => (
              <div key={t.name}>
                <dt>{t.name}</dt>
                {t.use && <dd>{t.use}</dd>}
              </div>
            ))}
          </dl>
          {content.contribution.length > 0 && (
            <>
              <span className="bk-label">My part</span>
              <ul className="bk-points">
                {content.contribution.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </>
          )}
          {content.note && <p className="bk-note">{content.note}</p>}
          <span className="bk-folio">{index}</span>
        </div>
      );

    case "back":
      return (
        <div className="bk-cover bk-cover-back">
          <div className="bk-cover-frame">
            <span className="bk-ornament">❦</span>
            <span className="bk-fin">Fin.</span>
            <Link href={`/works/${project.slug}`} className="bk-back-link" onClick={stop}>
              Read the full case study →
            </Link>
            <span className="bk-cover-author">Sakina Saifuddin</span>
          </div>
        </div>
      );
  }
}
