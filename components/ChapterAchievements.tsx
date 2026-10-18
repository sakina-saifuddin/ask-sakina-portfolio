"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePanelEntered } from "@/components/usePanelEntered";
import { HeaderWordsReveal } from "@/components/HeaderWordsReveal";

const EASE = [0.16, 1, 0.3, 1] as const;
const PG = "/project-evidence/powerguard360";

const photos = [
  { title: "On stage with the $500 prize", src: `${PG}/award-500-best-pitch.jpg`, position: "center 85%", wide: true },
  { title: "Leading the team", src: `${PG}/leading-the-team.jpg`, position: "40% center" },
  { title: "Pitching to the judges", src: `${PG}/pitching-to-judges.jpg`, position: "85% center" },
  { title: "Presenting the demo", src: `${PG}/presenting-demo.jpg` },
];

export function ChapterAchievements() {
  const entered = usePanelEntered("chapter-achievements");

  return (
    <section className="hz-panel hz-panel-achievements" data-nav-theme="light" data-panel-id="chapter-achievements">
      <div className="ach-chapter-block">
        <span className="ach-chapter-eyebrow">Achievements</span>
        <span className="ach-chapter-label">
          <HeaderWordsReveal text="Chapter IV" active={entered} />
        </span>
      </div>

      <motion.div
        className="ach-head"
        initial={{ opacity: 0, y: 24 }}
        animate={entered ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <div>
          <h2 className="ach-title">Winner Hackathon: CodeRED Orion</h2>
          <p className="ach-award">
            <strong>Best Pitch/Demo Award</strong> · $500 prize · 2nd of 70+ teams
          </p>
        </div>
        <div className="ach-links">
          <Link href="/achievements">View the full story</Link>
          <Link href="/book/power-guard-360">Project book</Link>
          <a href="https://devpost.com/software/power-guard-360" target="_blank" rel="noreferrer">Featured on Devpost</a>
        </div>
      </motion.div>

      <div className="ach-grid">
        {photos.map((p, index) => (
          <motion.figure
            className={`ach-photo${p.wide ? " ach-photo-wide" : ""}`}
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            animate={entered ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 + index * 0.08 }}
          >
            <div className="ach-photo-frame">
              <Image src={p.src} alt={p.title} fill sizes="(max-width: 900px) 92vw, 30vw" style={p.position ? { objectPosition: p.position } : undefined} />
            </div>
            <figcaption>{p.title}</figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
