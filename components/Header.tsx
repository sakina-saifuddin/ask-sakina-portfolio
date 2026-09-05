"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const chapters = [
  { num: "01", title: "Intro", href: "/#intro" },
  { num: "02", title: "Work", href: "/#work" },
  { num: "03", title: "What I Build", href: "/#build" },
  { num: "04", title: "Experience", href: "/#experience" },
  { num: "05", title: "Expertise", href: "/#expertise" },
  { num: "06", title: "Recognition", href: "/#recognition" },
  { num: "07", title: "Contact", href: "/#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

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
          {open ? <X size={20} strokeWidth={1.6} /> : <Menu size={20} strokeWidth={1.6} />}
        </button>

        <span className="hz-nav-vertical hz-nav-label">Folio — Edition</span>

        <Link className="hz-nav-vertical hz-nav-name" href="/" aria-label="Sakina Saifuddin home" onClick={() => setOpen(false)}>
          Sakina Saifuddin
        </Link>

        <span className="hz-nav-vertical hz-nav-year">© 2026</span>
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
