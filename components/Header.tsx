"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpen, FolderKanban, Layers, Briefcase, GraduationCap, Award, Mail, Menu, X } from "lucide-react";
import { profile } from "@/data/portfolio";
import { FloatingDock, type DockItem } from "@/components/FloatingDock";

const chapters = [
  { num: "01", title: "Intro", href: "/#intro", icon: BookOpen },
  { num: "02", title: "Work", href: "/#work", icon: FolderKanban },
  { num: "03", title: "What I Build", href: "/#build", icon: Layers },
  { num: "04", title: "Experience", href: "/#experience", icon: Briefcase },
  { num: "05", title: "Expertise", href: "/#expertise", icon: GraduationCap },
  { num: "06", title: "Recognition", href: "/#recognition", icon: Award },
  { num: "07", title: "Contact", href: "/#contact", icon: Mail },
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

  const dockItems: DockItem[] = [
    ...chapters.map((chapter) => {
      const Icon = chapter.icon;
      return { title: `${chapter.num} · ${chapter.title}`, href: chapter.href, icon: <Icon size={19} strokeWidth={1.6} /> };
    }),
    { title: open ? "Close" : "Menu", isMenuTrigger: true, icon: open ? <X size={19} strokeWidth={1.6} /> : <Menu size={19} strokeWidth={1.6} /> },
  ];

  return (
    <>
      <div className="dock-topbar" data-menu-open={open}>
        <Link className="dock-brand" href="/" aria-label="Sakina Saifuddin home" onClick={() => setOpen(false)}>
          SAKINA <span>SAIFUDDIN</span>
        </Link>

        <FloatingDock
          items={dockItems}
          menuOpen={open}
          onMenuClick={() => setOpen((value) => !value)}
          onNavigate={() => setOpen(false)}
        />
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

      <a className="hire-tab" href={`mailto:${profile.email}?subject=Opportunity for Sakina Saifuddin`}>Hire Sakina ↗</a>
    </>
  );
}
