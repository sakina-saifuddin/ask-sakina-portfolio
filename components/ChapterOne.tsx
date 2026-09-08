"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ConfettiButton } from "@/components/ConfettiButton";
import { triggerPageCurtain } from "@/components/PageCurtain";
import { AskResumeTerminal } from "@/components/AskResumeTerminal";
import { ToolStackGrid } from "@/components/ToolStackGrid";
import { usePanelEntered } from "@/components/usePanelEntered";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ChapterOne() {
  const chapterEntered = usePanelEntered("chapter-one");
  const terminalEntered = usePanelEntered("chapter-one-terminal");

  return (
    <>
      <section className="hz-panel hz-panel-chapter" data-nav-theme="light" data-panel-id="chapter-one">
        <motion.div
          className="hz-chapter-kicker-block"
          initial={{ opacity: 0, y: 24 }}
          animate={chapterEntered ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="hz-chapter-eyebrow">Folio — Edition</span>
          <h2 className="hz-chapter-title-sm">Chapter I</h2>
        </motion.div>

        <motion.div
          className="hz-chapter-intro"
          initial={{ opacity: 0, y: 24 }}
          animate={chapterEntered ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
        >
          <span className="hz-chapter-quick-intro">Quick Intro</span>
          <p className="hz-chapter-intro-text">
            Hi, I&rsquo;m Sakina — I work across AI, data, software, and automation, building systems that are useful, clear, and impactful.
          </p>
          <p className="hz-chapter-tagline">
            &ldquo;Work for money.<br />Data for love.&rdquo;
          </p>

          <div className="hz-chapter-photo-row">
            <Link
              href="/about"
              className="hz-chapter-more-link"
              onClick={(event) => {
                event.preventDefault();
                triggerPageCurtain("/about");
              }}
            >
              <span className="hz-chapter-more-link-text">More about me</span>
              <ArrowUpRight size={16} strokeWidth={2} />
            </Link>

            <motion.div
              className="hz-chapter-portrait"
              initial={{ clipPath: "inset(0 0 0 100%)" }}
              animate={chapterEntered ? { clipPath: "inset(0 0 0 0%)" } : undefined}
              transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
            >
              <motion.div
                className="hz-chapter-portrait-media"
                initial={{ scale: 1.15 }}
                animate={chapterEntered ? { scale: 1 } : undefined}
                transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
              >
                <Image src="/pic3.JPG" alt="Sakina Saifuddin" fill sizes="(max-width: 900px) 80vw, 42vw" style={{ objectFit: "cover", objectPosition: "top" }} />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="hz-chapter-beyond"
          initial={{ opacity: 0, y: 30 }}
          animate={chapterEntered ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
        >
          <p className="hz-chapter-beyond-text">
            <strong>Beyond Coding:</strong> Long drives, food,<br />fashion, and dancing.
          </p>
        </motion.div>
      </section>

      <section className="hz-panel hz-panel-stack" data-nav-theme="light">
        <ToolStackGrid />
      </section>

      <section className="hz-panel hz-panel-terminal" data-nav-theme="light" data-panel-id="chapter-one-terminal">
        <motion.div
          className="terminal-page-heading"
          initial={{ opacity: 0, y: 24 }}
          animate={terminalEntered ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span>Folio — Edition</span>
          <h2>Ask My Resume</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={terminalEntered ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
        >
          <AskResumeTerminal />
        </motion.div>

        <motion.div
          className="terminal-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={terminalEntered ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
        >
          <ConfettiButton />
        </motion.div>
      </section>
    </>
  );
}
