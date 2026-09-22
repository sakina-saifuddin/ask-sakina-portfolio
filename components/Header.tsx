"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { scrollToPanel } from "@/components/panelScroll";

const EASE = [0.16, 1, 0.3, 1] as const;
const MotionLink = motion.create(Link);

// `href` is either "/#panelId" (a section on the home page) or
// "/other-page#panelId" (a section on another page). Either way, `panelId`
// must match a `data-panel-id` on the corresponding `.hz-panel`. There is
// currently no dedicated Recognition section, so it's left out rather than
// pointed at the wrong content.
const chapters = [
  { num: "01", title: "Intro", href: "/#intro" },
  { num: "02", title: "Work", href: "/#chapter-two" },
  { num: "03", title: "What I Build", href: "/#chapter-three" },
  { num: "04", title: "Experience", href: "/about#career-journey" },
  { num: "05", title: "Expertise", href: "/#chapter-one-stack" },
  { num: "06", title: "Contact", href: "/#chapter-five" },
];

export function Header({ theme }: { theme?: "light" | "dark" } = {}) {
  const [open, setOpen] = useState(false);
  const [dockHidden, setDockHidden] = useState(false);
  const lastScrollY = useRef(0);
  const progressRef = useRef<HTMLDivElement>(null);

  function handleChapterClick(event: React.MouseEvent, href: string) {
    setOpen(false);
    const panelId = href.split("#")[1];
    // If the target panel already exists in the current DOM (i.e. we're
    // already on the page that holds it), scroll straight to it. Otherwise
    // let the Link navigate to the other page; its mount effect picks up
    // the hash and scrolls once it lands.
    if (panelId && scrollToPanel(panelId)) event.preventDefault();
  }

  useEffect(() => {
    if (!theme) return;
    document.documentElement.dataset.navTheme = theme;
    return () => {
      delete document.documentElement.dataset.navTheme;
    };
  }, [theme]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    function updateProgress() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
      if (progressRef.current) progressRef.current.style.width = `${pct}%`;
    }

    function onScroll() {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      updateProgress();
      if (Math.abs(delta) < 6) return;
      setDockHidden(delta > 0 && y > 80);
      lastScrollY.current = y;
    }

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <div className="hz-nav" data-menu-open={open}>
        <span className="hz-rail-line" aria-hidden="true" />

        <button
          type="button"
          className="hz-nav-hamburger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="navbar-overlay"
          onClick={() => setOpen((value) => !value)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "x" : "menu"}
              initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
              transition={{ duration: 0.25, ease: EASE }}
              style={{ display: "inline-flex" }}
            >
              {open ? <X size={20} strokeWidth={1.6} /> : <Menu size={20} strokeWidth={1.6} />}
            </motion.span>
          </AnimatePresence>
        </button>

        <motion.span
          className="hz-nav-vertical hz-nav-label"
          initial={{ opacity: 0, rotate: 180, y: 14 }}
          animate={{ opacity: open ? 0 : 1, rotate: 180, y: 0 }}
          transition={open ? { duration: 0.3, ease: EASE } : { duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          Folio — Edition
        </motion.span>

        <MotionLink
          className="hz-nav-vertical hz-nav-name"
          href="/"
          aria-label="Sakina Saifuddin home"
          onClick={() => setOpen(false)}
          initial={{ opacity: 0, rotate: 180, y: "calc(-50% + 14px)" }}
          animate={{ opacity: open ? 0 : 1, rotate: 180, y: "-50%" }}
          transition={open ? { duration: 0.3, ease: EASE } : { duration: 0.7, ease: EASE, delay: 0.2 }}
        >
          Sakina Saifuddin
        </MotionLink>

        <motion.span
          className="hz-nav-vertical hz-nav-year"
          initial={{ opacity: 0, rotate: 180, y: 14 }}
          animate={{ opacity: open ? 0 : 1, rotate: 180, y: 0 }}
          transition={open ? { duration: 0.3, ease: EASE } : { duration: 0.7, ease: EASE, delay: 0.3 }}
        >
          © 2026
        </motion.span>
      </div>

      <div className={`mobile-topbar${dockHidden && !open ? " is-hidden" : ""}`}>
        <Link
          href="/"
          className="mobile-topbar-brand"
          aria-label="Sakina Saifuddin home"
          onClick={() => setOpen(false)}
        >
          SS
        </Link>

        <button
          type="button"
          className="mobile-dock"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="navbar-overlay"
          onClick={() => setOpen((value) => !value)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "x" : "menu"}
              initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
              transition={{ duration: 0.25, ease: EASE }}
              style={{ display: "inline-flex" }}
            >
              {open ? <X size={22} strokeWidth={1.7} /> : <Menu size={22} strokeWidth={1.7} />}
            </motion.span>
          </AnimatePresence>
        </button>

        <div className="scroll-progress-track" aria-hidden="true">
          <div className="scroll-progress-line" ref={progressRef} />
        </div>
      </div>

      <div id="navbar-overlay" className={`nav-overlay${open ? " is-open" : ""}`} aria-hidden={!open}>
        <nav className="nav-overlay-links">
          {chapters.map((chapter, index) => (
            <Link
              key={chapter.href}
              href={chapter.href}
              tabIndex={open ? 0 : -1}
              style={{ transitionDelay: open ? `${0.08 + index * 0.06}s` : "0s" }}
              onClick={(event) => handleChapterClick(event, chapter.href)}
            >
              <span className="nav-overlay-index">{chapter.num}</span>
              {chapter.title}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
