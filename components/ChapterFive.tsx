"use client";

import { motion } from "framer-motion";
import { Typewriter } from "@/components/Typewriter";
import { usePanelEntered } from "@/components/usePanelEntered";
import { profile } from "@/data/portfolio";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ChapterFive() {
  const entered = usePanelEntered("chapter-five");

  return (
    <section className="hz-panel hz-panel-next" data-nav-theme="dark" data-panel-id="chapter-five">
      <motion.div
        className="next-social"
        initial={{ opacity: 0, y: 16 }}
        animate={entered ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
      </motion.div>

      <h2 className="next-heading">
        <span className="next-heading-line">
          {entered && <Typewriter text="Next" speed={45} startDelay={200} sound showCursor={false} />}
        </span>
        <span className="next-heading-highlight">
          {entered && <Typewriter text="Chapter" speed={45} startDelay={200 + 4 * 45} sound />}
        </span>
      </h2>

      <motion.div
        className="next-footer"
        initial={{ opacity: 0, y: 20 }}
        animate={entered ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
      >
        <div className="next-contact">
          <span>Contact</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
        <span className="next-tagline">{profile.availability}</span>
      </motion.div>
    </section>
  );
}
