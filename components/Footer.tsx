import Link from "next/link";
import { profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-name"><span>SAKINA</span> <b>SAIFUDDIN.</b></div>
          <small>AI · DATA · SOFTWARE · AUTOMATION</small>
          <p>Software, data, analytics, machine learning, and automation work.</p>
        </div>
        <div className="footer-column">
          <b>Explore</b>
          <Link href="/#about">About</Link>
          <Link href="/#experience">Experience</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/#ask-resume">Ask My Resume</Link>
          <Link href="/resume">Resume</Link>
          <Link href="/certificates">Certificates</Link>
          <Link href="/appreciation">Appreciation</Link>
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
