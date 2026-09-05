import Image from "next/image";
import { profile } from "@/data/portfolio";
import { WorkingPhoto } from "./WorkingPhoto";

export function ChapterIntro() {
  return (
    <section id="intro" className="chapter chapter-intro">
      <div className="chapter-label reveal">
        <span className="chapter-eyebrow">Chapter I</span>
        <span className="chapter-eyebrow-title">Introduction</span>
      </div>

      <div className="intro-grid">
        <div className="intro-copy reveal">
          <h1 className="intro-name">Sakina Saifuddin</h1>
          <p className="intro-statement">AI, data, software, and automation — built with curiosity and intention.</p>
        </div>

        <div className="intro-portrait reveal">
          <Image src="/profile.jpg" alt="Sakina Saifuddin" fill priority sizes="(max-width: 900px) 92vw, 46vw" />
        </div>

        <div className="intro-body reveal">
          <p>
            I work across AI, data, software, and automation — the connective tissue behind decisions,
            forecasts, and systems that need to hold up in production. {profile.intro}
          </p>
          <p className="intro-quote">Systems for impact. Code for curiosity.</p>
        </div>

        <div className="intro-working reveal">
          <div className="working-photo-frame">
            <WorkingPhoto />
          </div>
          <div className="intro-meta">
            <div><small>Based in</small><span>{profile.location}</span></div>
            <div><small>Currently</small><span>{profile.education}</span></div>
            <div><small>Status</small><span>{profile.availability}</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
