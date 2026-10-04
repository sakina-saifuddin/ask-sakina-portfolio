"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { triggerPageCurtain } from "@/components/PageCurtain";
import { profile } from "@/data/portfolio";

function navigate(href: string) {
  return (event: MouseEvent) => {
    event.preventDefault();
    triggerPageCurtain(href);
  };
}

export function Footer() {
  return (
    <footer className="site-footer reveal">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-name"><span>SAKINA</span> <b>SAIFUDDIN.</b></div>
          <small>AI · DATA · SOFTWARE · AUTOMATION</small>
          <p>Software, data, analytics, machine learning, and automation work.</p>
        </div>
        <div className="footer-column">
          <b>Explore</b>
          <Link href="/#chapter-one" onClick={navigate("/#chapter-one")}>About</Link>
          <Link href="/#chapter-four" onClick={navigate("/#chapter-four")}>Experience</Link>
          <Link href="/books" onClick={navigate("/books")}>Projects</Link>
          <Link href="/#chapter-one-terminal" onClick={navigate("/#chapter-one-terminal")}>Ask My Resume</Link>
          <Link href="/resume" onClick={navigate("/resume")}>Resume</Link>
          <Link href="/certificates" onClick={navigate("/certificates")}>Certificates</Link>
          <Link href="/appreciation" onClick={navigate("/appreciation")}>Appreciation</Link>
        </div>
        <div className="footer-column">
          <b>Connect</b>
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href={`mailto:${profile.email}?subject=Opportunity for Sakina Saifuddin`}>Hire Sakina ↗</a>
        </div>
      </div>
      <div className="footer-bottom"><span>© 2026 Sakina Saifuddin</span><span>Houston, Texas</span></div>
    </footer>
  );
}
