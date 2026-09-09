"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/data/portfolio";
import { Typewriter } from "@/components/Typewriter";

const EASE = [0.16, 1, 0.3, 1] as const;

const timeline = [
  { period: "Feb 2026 — Present", role: "BI & Automation Intern", company: "TMAC / NIST-MEP" },
  { period: "May 2026 — Sep 2026", role: "AI Automation Engineer", company: "Dental-X AI" },
  { period: "May 2024 — Aug 2025", role: "Business Intelligence Consultant", company: "BluTech Consulting" },
  { period: "Aug 2022 — Sep 2025", role: "Sr. Performance Management Analyst", company: "The Walnut Agency" },
  { period: "Jan 2021 — May 2024", role: "Software Engineer", company: "SoftSyncDev" },
];

const interests = ["driving", "food", "fashion", "dancing"] as const;
type Interest = (typeof interests)[number];

const interestLabels: Record<Interest, string> = {
  driving: "long drives",
  food: "food",
  fashion: "fashion",
  dancing: "dancing",
};

const interestImages: Record<Interest, string> = {
  driving: "/interests/driving.png",
  food: "/interests/food.jfif",
  fashion: "/interests/fashion.jfif",
  dancing: "/interests/dancing.jfif",
};

export function AboutPage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeInterest, setActiveInterest] = useState<Interest | null>(null);
  const [brokenImages, setBrokenImages] = useState<Set<Interest>>(new Set());

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    function onWheel(event: WheelEvent) {
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();
        el!.scrollBy({ left: event.deltaY, behavior: "instant" });
      }
    }

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const panels = Array.from(el.querySelectorAll<HTMLElement>(".hz-panel"));

    function updateNavTheme() {
      const width = el!.clientWidth || 1;
      const index = Math.round(el!.scrollLeft / width);
      const panel = panels[Math.min(Math.max(index, 0), panels.length - 1)];
      document.documentElement.dataset.navTheme = panel?.dataset.navTheme || "dark";
    }

    updateNavTheme();
    el.addEventListener("scroll", updateNavTheme, { passive: true });
    return () => {
      el.removeEventListener("scroll", updateNavTheme);
      delete document.documentElement.dataset.navTheme;
    };
  }, []);

  const showImage = activeInterest && !brokenImages.has(activeInterest);

  return (
    <div className="hz-stage">
      <div className="hz-track" ref={trackRef}>
        <section className="hz-panel about-hero" data-nav-theme="light">
          <div className="about-rail-mask" aria-hidden="true" />

          <motion.div
            className="about-hero-photo"
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <Image src="/pic3.JPG" alt="Sakina Saifuddin" fill sizes="50vw" style={{ objectFit: "cover", objectPosition: "50% 15%" }} priority />
          </motion.div>

          <motion.h1
            className="about-hero-name"
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          >
            Sakina<br />Saifuddin
          </motion.h1>

          <motion.div
            className="about-hero-intro"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
          >
            <span className="about-kicker">About Me</span>
            <p>
              <Typewriter
                speed={16}
                startDelay={700}
                text="Hi, I’m Sakina — a software engineer and data scientist based in Houston, Texas, with 3.5+ years of experience across software engineering, data, automation, and machine learning. I build systems that are clear, reliable, and useful."
              />
            </p>
          </motion.div>
        </section>

        <section className="hz-panel about-philosophy-text" data-nav-theme="light">
          <motion.p
            className="about-philosophy-lead"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            I build systems focused on clarity, reliability, and measurable impact — creating data pipelines,
            dashboards, and software that are dependable, efficient, and easy to trust.
          </motion.p>

          <div className="about-philosophy-grid">
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            >
              Good systems should feel invisible, precise, and dependable. Every pipeline, dashboard, and model
              shapes how a decision gets made.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            >
              Across software, data, and machine learning, clarity and reliability remain central to how I
              approach every project.
            </motion.p>
          </div>
        </section>

        <section className="hz-panel about-quote" data-nav-theme="dark">
          <motion.span
            className="about-kicker about-kicker-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            Philosophy
          </motion.span>
          <p className="about-quote-text">
            &ldquo;<Typewriter text="Work for money." speed={40} startDelay={300} />
            <br />
            <span className="about-quote-highlight">
              <Typewriter text="Data for love." speed={40} startDelay={1900} />
            </span>
            &rdquo;
          </p>
        </section>

        <section className="hz-panel about-timeline" data-nav-theme="dark">
          <motion.div
            className="about-timeline-photo-mobile"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <Image src="/pic2.JPG" alt="Sakina Saifuddin" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "50% 20%" }} />
          </motion.div>

          <motion.div
            className="about-timeline-header"
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <h2>Career<br />Journey</h2>
            <p>
              ✤ A timeline of the roles, projects, and milestones that have shaped how I build, analyze, and
              solve problems.
            </p>
          </motion.div>

          <div className="about-timeline-rows">
            {timeline.map((row, i) => (
              <motion.div
                key={row.company + row.period}
                className="about-timeline-row"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.65, ease: EASE, delay: i * 0.08 }}
              >
                <span className="about-timeline-period">{row.period}</span>
                <span className="about-timeline-role">{row.role}</span>
                <span className="about-timeline-company">{row.company}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="hz-panel about-beyond" data-nav-theme="light">
          <motion.p
            className="about-beyond-text"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            Beyond code:{" "}
            {interests.map((word, i) => (
              <span key={word}>
                <button
                  type="button"
                  className="about-interest-word"
                  data-active={activeInterest === word}
                  onMouseEnter={() => setActiveInterest(word)}
                  onMouseLeave={() => setActiveInterest((cur) => (cur === word ? null : cur))}
                  onFocus={() => setActiveInterest(word)}
                  onBlur={() => setActiveInterest((cur) => (cur === word ? null : cur))}
                >
                  {interestLabels[word]}
                </button>
                {i < interests.length - 2 ? ", " : i === interests.length - 2 ? ", and " : ""}
              </span>
            ))}{" "}
            — quiet interests that shape my perspective and approach to work.
          </motion.p>

          <motion.div
            className="about-beyond-box"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {showImage ? (
                <motion.div
                  key={activeInterest}
                  className="about-beyond-box-image"
                  initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  exit={{ clipPath: "inset(100% 0% 0% 0%)" }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <Image
                    src={interestImages[activeInterest]}
                    alt={activeInterest}
                    fill
                    style={{ objectFit: "cover", filter: "grayscale(1)" }}
                    onError={() =>
                      setBrokenImages((prev) => new Set(prev).add(activeInterest))
                    }
                  />
                </motion.div>
              ) : (
                <motion.span
                  key="placeholder"
                  className="about-beyond-box-empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  aria-hidden="true"
                />
              )}
            </AnimatePresence>
          </motion.div>

          <div className="about-footer-row">
            <span>Open for early-career roles</span>
            <a href={`mailto:${profile.email}`}>
              Email
              <br />
              {profile.email}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
