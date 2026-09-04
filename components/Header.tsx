import Link from "next/link";
import { profile } from "@/data/portfolio";

export function Header() {
  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Sakina Saifuddin home">
          <span className="brand-text">
            <span className="brand-name"><b>SAKINA</b><strong>SAIFUDDIN.</strong></span>
            <span className="brand-subtitle">AI · DATA · SOFTWARE · AUTOMATION</span>
          </span>
        </Link>
        <nav>
          <Link href="/#about">About</Link>
          <Link href="/#ask-resume">Ask My Resume</Link>
          <Link href="/#experience">Experience</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/#tools">Tools</Link>
          <Link href="/appreciation">Appreciation</Link>
          <Link href="/certificates">Certificates</Link>
          <Link href="/resume">Resume</Link>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </nav>
      </header>
      <a className="hire-tab" href={`mailto:${profile.email}?subject=Opportunity for Sakina Saifuddin`}>Hire Sakina ↗</a>
    </>
  );
}
