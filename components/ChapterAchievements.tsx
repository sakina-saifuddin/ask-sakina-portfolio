"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePanelEntered } from "@/components/usePanelEntered";
import { HeaderWordsReveal } from "@/components/HeaderWordsReveal";

const EASE = [0.16, 1, 0.3, 1] as const;
const PG = "/project-evidence/powerguard360";

const stats = [
  { value: "2nd", label: "place" },
  { value: "70+", label: "teams" },
  { value: "$500", label: "cash prize" },
];

export function ChapterAchievements() {
  const entered = usePanelEntered("chapter-achievements");

  return (
    <section className="hz-panel hz-panel-achievements" data-nav-theme="dark" data-panel-id="chapter-achievements">
      <div className="ach-chapter-block">
        <span className="ach-chapter-eyebrow">Achievements</span>
        <span className="ach-chapter-label">
          <HeaderWordsReveal text="Chapter IV" active={entered} />
        </span>
      </div>

      <motion.div
        className="ach-copy"
        initial={{ opacity: 0, y: 24 }}
        animate={entered ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <span className="ach-eyebrow">CodeRED Orion · University of Houston · Oct 2026</span>
        <h2 className="ach-title">2nd place out of 70+ teams</h2>
        <p className="ach-text">
          At UH&apos;s biggest hackathon, I led a team of undergraduates to build Power Guard 360 in 24 hours: machine learning
          that predicts power plant failures before they cut power to an AI data center. We won $500 for Best Pitch/Demo.
        </p>

        <div className="ach-stats">
          {stats.map((s) => (
            <div key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        <div className="ach-links">
          <Link href="/achievements">The full story →</Link>
          <Link href="/book/power-guard-360">Project book →</Link>
          <a href="https://devpost.com/software/power-guard-360" target="_blank" rel="noreferrer">Devpost ↗</a>
        </div>
      </motion.div>

      <div className="ach-photos">
        <motion.figure
          className="ach-photo ach-photo-main"
          initial={{ opacity: 0, y: 30 }}
          animate={entered ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
        >
          <div className="ach-photo-frame">
            <Image src={`${PG}/award-500-best-pitch.jpg`} alt="Sakina and the Power Guard 360 team on stage with the $500 Best Pitch prize check" fill sizes="(max-width: 900px) 92vw, 50vw" />
          </div>
          <figcaption>On stage with the $500 Best Pitch/Demo prize.</figcaption>
        </motion.figure>
        <motion.figure
          className="ach-photo ach-photo-side"
          initial={{ opacity: 0, y: 30 }}
          animate={entered ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
        >
          <div className="ach-photo-frame">
            <Image src={`${PG}/leading-the-team.jpg`} alt="Sakina, in red, leading the team while they wire the sensor board" fill sizes="(max-width: 900px) 92vw, 22vw" />
          </div>
          <figcaption>Leading the team through the build.</figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
