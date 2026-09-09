"use client";

import { motion } from "framer-motion";
import { usePanelEntered } from "@/components/usePanelEntered";
import { HeaderWordsReveal } from "@/components/HeaderWordsReveal";

const EASE = [0.16, 1, 0.3, 1] as const;

type WhatIDoItem = {
  title: string;
  description: string;
  image?: string;
  blurredImage?: string;
};

const whatIDo: WhatIDoItem[] = [
  {
    title: "AI & Machine Learning",
    description:
      "Training and shipping models — DCGANs, EEG classifiers, and production LLM integrations — built to hold up outside the notebook.",
    image: "/project-evidence/gan-deck/architecture.png",
  },
  {
    title: "Data & Business Intelligence",
    description:
      "Turning millions of rows into dashboards people actually use — Power BI, Tableau, and SQL behind 1,074 automated reports.",
    image: "/project-evidence/financial-reconciliation/grants-overview1.png",
    blurredImage: "/project-evidence/financial-reconciliation/grants-overview1-blurred.png",
  },
  {
    title: "Software & Automation",
    description:
      "Full-stack apps and ETL pipelines that remove manual work — from a 1,000-user chatbot to a pipeline running on autopilot.",
    image: "/project-evidence/oracle-etl/power-automate.png",
  },
  {
    title: "Marketing & Performance",
    description:
      "70+ client accounts managed, using campaign data to grow engagement 60%+ — reading audiences as closely as data.",
    image: "/project-evidence/marketing/campaign-analytics.png",
  },
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function ChapterThree() {
  const entered = usePanelEntered("chapter-three");

  return (
    <section className="hz-panel hz-panel-what-i-do" data-nav-theme="dark" data-panel-id="chapter-three">
      <span className="wid-chapter-label">
        <HeaderWordsReveal text="Chapter III" active={entered} />
      </span>

      <motion.div
        className="wid-intro"
        initial={{ opacity: 0, y: 24 }}
        animate={entered ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <span className="wid-intro-eyebrow">What I Do?</span>
        <h2 className="wid-intro-statement">
          I build AI, data and software systems with clarity and intention.
        </h2>
      </motion.div>

      <div className="wid-track">
        {whatIDo.map((item, index) => (
          <motion.div
            className="wid-column"
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            animate={entered ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 + index * 0.08 }}
          >
            {item.blurredImage ? (
              <>
                <div
                  className="wid-column-media-blur-base"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div
                  className="wid-column-media-blur-overlay"
                  style={{ backgroundImage: `url(${item.blurredImage})` }}
                />
              </>
            ) : (
              <div
                className="wid-column-media"
                data-pattern={!item.image}
                style={item.image ? { backgroundImage: `url(${item.image})` } : undefined}
              />
            )}
            <span className="wid-column-number">{pad(index + 1)}</span>
            <div className="wid-column-text">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
