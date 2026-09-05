"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { User, Briefcase, FolderKanban, Cpu, Heart, MessageCircle, Mail, Menu, X } from "lucide-react";
import { profile } from "@/data/portfolio";
import { FloatingDock, type DockItem } from "@/components/FloatingDock";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#tools" },
  { label: "Appreciation", href: "/appreciation" },
  { label: "Ask My Resume", href: "/#ask-resume" },
  { label: "Contact", href: "/#contact" },
];

const dockIcons = [User, Briefcase, FolderKanban, Cpu, Heart, MessageCircle, Mail];

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
    ...navLinks.map((link, index) => {
      const Icon = dockIcons[index];
      return { title: link.label, href: link.href, icon: <Icon size={20} strokeWidth={1.8} /> };
    }),
    { title: open ? "Close" : "Menu", isMenuTrigger: true, icon: open ? <X size={20} strokeWidth={1.8} /> : <Menu size={20} strokeWidth={1.8} /> },
  ];

  return (
    <>
      <div className="dock-topbar" data-menu-open={open}>
        <Link className="dock-brand" href="/" aria-label="Sakina Saifuddin home" onClick={() => setOpen(false)}>
          SAKINA <span>SAIFUDDIN.</span>
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
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              tabIndex={open ? 0 : -1}
              style={{ transitionDelay: open ? `${0.08 + index * 0.06}s` : "0s" }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <a className="hire-tab" href={`mailto:${profile.email}?subject=Opportunity for Sakina Saifuddin`}>Hire Sakina ↗</a>
    </>
  );
}
