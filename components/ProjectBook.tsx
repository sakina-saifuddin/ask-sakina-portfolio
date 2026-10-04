"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import type { CSSProperties } from "react";
import type { Project } from "@/data/portfolio";
import { BOOK_STAGES, getBookContent, listSentence, type BookSpread, type BookStyle, type ProjectBookContent } from "@/data/projectBooks";
import { Header } from "@/components/Header";
import { BackCover, Book3D, FrontCover } from "@/components/BookCovers";
import "./project-book.css";

const TURN_MS = 1000;
// How long the closed 3D book takes to straighten up before the cover opens.
const STRAIGHTEN_MS = 450;

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
  const style = content.style;
  const pages = useMemo(() => buildPages(content), [content]);
  const leafCount = pages.length / 2;

  const [flipped, setFlipped] = useState(0);
  const [side, setSide] = useState<"left" | "right">("right");
  // Every leaf currently mid-turn (several can be when pages are turned quickly), in the order they started.
  const [turning, setTurning] = useState<number[]>([]);
  const [narrow, setNarrow] = useState(false);
  // While the book is shut (desktop only), a real 3D paperback stands in for the flat cover leaf.
  const [closed, setClosed] = useState<"front" | "back" | null>("front");
  const [tilted, setTilted] = useState(true);
  const straightening = useRef(false);
  const turnTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const turn = useCallback((leaf: number, nextFlipped: number) => {
    setTurning((t) => [...t.filter((l) => l !== leaf), leaf]);
    setFlipped(nextFlipped);
    turnTimers.current.push(setTimeout(() => setTurning((t) => t.filter((l) => l !== leaf)), TURN_MS));
  }, []);

  useEffect(() => {
    if (narrow) setClosed(null);
  }, [narrow]);

  // Once a turn lands on the front or back cover, swap in the 3D book: flat first, then turned.
  useEffect(() => {
    if (narrow || turning.length > 0 || closed) return;
    if (flipped !== 0 && flipped !== leafCount) return;
    setClosed(flipped === 0 ? "front" : "back");
    setTilted(false);
  }, [narrow, turning.length, closed, flipped, leafCount]);

  // A freshly shown 3D book starts flat (matching the leaf it replaced), then turns to show its depth.
  useEffect(() => {
    if (!closed || tilted || straightening.current) return;
    const t = setTimeout(() => setTilted(true), 40);
    return () => clearTimeout(t);
  }, [closed, tilted]);

  // Straighten the 3D book, then hand over to the page leaves and run the turn.
  const openFromClosed = useCallback(
    (leaf: number, nextFlipped: number) => {
      if (straightening.current) return;
      straightening.current = true;
      setTilted(false);
      turnTimers.current.push(
        setTimeout(() => {
          straightening.current = false;
          setClosed(null);
          turn(leaf, nextFlipped);
        }, STRAIGHTEN_MS)
      );
    },
    [turn]
  );

  const next = useCallback(() => {
    if (closed === "front") return openFromClosed(0, 1);
    if (closed) return;
    if (narrow) {
      if (side === "left" && flipped < leafCount) return setSide("right");
      if (side === "right" && flipped < leafCount) {
        turn(flipped, flipped + 1);
        setSide("left");
      }
      return;
    }
    if (flipped < leafCount) turn(flipped, flipped + 1);
  }, [closed, openFromClosed, narrow, side, flipped, leafCount, turn]);

  const prev = useCallback(() => {
    if (closed === "back") return openFromClosed(leafCount - 1, leafCount - 1);
    if (closed) return;
    if (narrow) {
      if (side === "right" && flipped > 0) return setSide("left");
      if (side === "left" && flipped > 0) {
        turn(flipped - 1, flipped - 1);
        setSide("right");
      }
      return;
    }
    if (flipped > 0) turn(flipped - 1, flipped - 1);
  }, [closed, openFromClosed, leafCount, narrow, side, flipped, turn]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  useEffect(() => () => turnTimers.current.forEach(clearTimeout), []);

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
    <main className="bk-root" style={{ "--bk-accent": style.cover } as CSSProperties}>
      <Header theme="light" />
      <header className="bk-topbar">
        <Link href={`/works/${project.slug}`} className="bk-back">
          <ArrowLeft size={14} /> Case study
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
        {closed && (
          <div className="bk-closed">
            <Book3D
              style={style}
              project={project}
              back={content.back}
              rotate={closed === "front" ? (tilted ? -24 : 0) : tilted ? 156 : 180}
              tilt={tilted ? -5 : 0}
              onBackLinkClick={stop}
            />
          </div>
        )}
        <div
          className="bk-book"
          style={{ transform: `translateX(${shift})`, visibility: closed ? "hidden" : undefined }}
        >
          {/* Page edges: the stack of unread pages on the right, read pages on the left. */}
          <span className="bk-edges bk-edges-right" style={{ width: `${((leafCount - flipped) / leafCount) * 12}px` }} />
          <span className="bk-edges bk-edges-left" style={{ width: `${(flipped / leafCount) * 12}px` }} />
          {Array.from({ length: leafCount }, (_, i) => {
            const isFlipped = i < flipped;
            const turnOrder = turning.indexOf(i);
            const z = turnOrder >= 0 ? leafCount * 3 + turnOrder : isFlipped ? i + 1 : leafCount * 2 - i;
            const classes = [
              "bk-leaf",
              turnOrder >= 0 && "is-turning",
              (turnOrder >= 0 || i === flipped || i === flipped - 1) && "is-top",
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
                  <PageContent page={pages[i * 2]} index={i * 2} project={project} content={content} style={style} />
                </div>
                <div className="bk-face bk-reverse">
                  <PageContent page={pages[i * 2 + 1]} index={i * 2 + 1} project={project} content={content} style={style} />
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

type PageProps = { page: BookPage; index: number; project: Project; content: ProjectBookContent; style: BookStyle };

function stop(e: React.MouseEvent) {
  e.stopPropagation();
}

function PageContent({ page, index, project, content, style }: PageProps) {
  switch (page.kind) {
    case "cover":
      return <FrontCover style={style} />;

    case "picture":
      return (
        <div className="bk-paper bk-picture">
          {/* Only the picture itself opens full size; clicking the paper around it turns the page. */}
          <div className="bk-picture-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={page.spread.image}
              alt={page.spread.title}
              title="Open full size"
              onClick={(e) => {
                e.stopPropagation();
                window.open(page.spread.image, "_blank", "noopener");
              }}
            />
          </div>
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
          {spread.tools && <p className="bk-used-line">I used {listSentence(spread.tools)}.</p>}
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
              <span className="bk-label">What I did</span>
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
      return <BackCover project={project} style={style} back={content.back} onLinkClick={stop} />;
  }
}
