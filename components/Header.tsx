"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const MotionLink = motion.create(Link);

const chapters = [
  { num: "01", title: "Intro", href: "/#intro" },
  { num: "02", title: "Work", href: "/#work" },
  { num: "03", title: "What I Build", href: "/#build" },
  { num: "04", title: "Experience", href: "/#experience" },
  { num: "05", title: "Expertise", href: "/#expertise" },
  { num: "06", title: "Recognition", href: "/#recognition" },
  { num: "07", title: "Contact", href: "/#contact" },
];

export function Header({ theme }: { theme?: "light" | "dark" } = {}) {
  const [open, setOpen] = useState(false);
  const [dockHidden, setDockHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (!theme) return;
    document.documentElement.dataset.navTheme = theme;
    return () => {
      delete document.documentElement.dataset.navTheme;
    };
  }, [theme]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    function onScroll() {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      if (Math.abs(delta) < 6) return;
      setDockHidden(delta > 0 && y > 80);
      lastScrollY.current = y;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
      </div>

      <div id="navbar-overlay" className={`nav-overlay${open ? " is-open" : ""}`} aria-hidden={!open}>
        <nav className="nav-overlay-links">
          {chapters.map((chapter, index) => (
            <Link
              key={chapter.href}
              href={chapter.href}
              tabIndex={open ? 0 : -1}
              style={{ transitionDelay: open ? `${0.08 + index * 0.06}s` : "0s" }}
              onClick={() => setOpen(false)}
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
