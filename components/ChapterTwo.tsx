"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { triggerClipWipeCurtain } from "@/components/ClipWipeCurtain";
import { usePanelEntered } from "@/components/usePanelEntered";
import { HeaderWordsReveal } from "@/components/HeaderWordsReveal";

const EASE = [0.16, 1, 0.3, 1] as const;

type RelatedWorkItem = {
  number: string;
  title: string;
  shortTitle: string;
  image: string;
  href?: string;
  slug?: string;
};

const relatedWork: RelatedWorkItem[] = [
  {
    number: "01",
    title: "Power Guard 360 — Predictive Maintenance for a Power Plant (2nd place, CodeRED Orion)",
    shortTitle: "Power Plant Failure Prediction",
    image: "/project-evidence/powerguard360/live-01-plant-3d-twin.png",
    href: "/books?project=power-guard-360",
    slug: "power-guard-360",
  },
  {
    number: "02",
    title: "Sakina Job OS — Agentic AI Job Search & Outreach Platform",
    shortTitle: "Agentic AI Job Platform",
    image: "/projects/job-os-placeholder.png",
    href: "/books?project=sakina-job-os",
    slug: "sakina-job-os",
  },
  {
    number: "03",
    title: "AI-Driven Retail Inventory Forecasting & Autonomous Inventory Optimization",
    shortTitle: "AI Retail Demand Forecasting",
    image: "/project-evidence/retail-report/page-16.png",
    href: "/books?project=retail-demand-forecasting",
    slug: "retail-demand-forecasting",
  },
  {
    number: "04",
    title: "Grant Financial Analytics & Reporting Dashboards",
    shortTitle: "Power BI Grant Dashboards",
    image: "/project-evidence/financial-reconciliation/grants-overview1-dummy.png",
    href: "/books?project=financial-reconciliation",
    slug: "financial-reconciliation",
  },
  {
    number: "05",
    title: "Oracle Financial ETL Pipeline",
    shortTitle: "Oracle Financial Data Pipeline",
    image: "/project-evidence/oracle-etl/conversion.png",
    href: "/books?project=oracle-financial-etl",
    slug: "oracle-financial-etl",
  },
  {
    number: "06",
    title: "GAN-Based Chest X-ray Augmentation for Pneumonia Detection",
    shortTitle: "AI Pneumonia X-ray Detection",
    image: "/project-evidence/gan-deck/architecture.png",
    href: "/books?project=pneumonia-dcgan",
    slug: "pneumonia-dcgan",
  },
];

export function ChapterTwo() {
  const [active, setActive] = useState<RelatedWorkItem | null>(null);
  const entered = usePanelEntered("chapter-two");

  return (
    <section className="hz-panel hz-panel-related-work" data-nav-theme="light" data-panel-id="chapter-two">
      <div className="ch2-heading">
        <span className="ch2-heading-eyebrow">All Related Work</span>
        <span className="ch2-heading-number">
          <HeaderWordsReveal text="Chapter II" active={entered} />
        </span>
      </div>

      <div className="ch2-preview-box">
        {active && (
          <motion.div
            key={active.number}
            className="ch2-preview-media"
            initial={{ opacity: 0, scale: 0.35 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <Image src={active.image} alt={active.title} fill sizes="320px" style={{ objectFit: "cover" }} />
          </motion.div>
        )}
        <span className="ch2-preview-name">{active ? active.title : "Hover a project"}</span>
      </div>

      <ul className="ch2-list">
        {relatedWork.map((item, index) => {
          const content = (
            <>
              <span className="ch2-list-number">{item.number}</span>
              <span className="ch2-list-title">
                <span className="ch2-list-title-full">{item.title}</span>
                <span className="ch2-list-title-short">{item.shortTitle}</span>
              </span>
            </>
          );
          const isActive = active?.number === item.number;
          const isDimmed = active !== null && !isActive;
          const stateClass = isActive ? " is-active" : isDimmed ? " ch2-list-item-dimmed" : "";
          return (
            <motion.li
              key={item.number}
              className="ch2-list-row"
              initial={{ opacity: 0, y: 20 }}
              animate={entered ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, ease: EASE, delay: 0.15 + index * 0.06 }}
            >
              {item.href ? (
                <Link
                  href={item.href}
                  className={`ch2-list-item${stateClass}`}
                  onMouseEnter={() => setActive(item)}
                  onMouseLeave={() => setActive(null)}
                  onClick={(event) => {
                    event.preventDefault();
                    triggerClipWipeCurtain(item.href!);
                  }}
                >
                  {content}
                </Link>
              ) : (
                <div
                  className={`ch2-list-item ch2-list-item-static${stateClass}`}
                  onMouseEnter={() => setActive(item)}
                  onMouseLeave={() => setActive(null)}
                >
                  {content}
                </div>
              )}
            </motion.li>
          );
        })}
      </ul>

      <div className="ch2-footer-row">
        <motion.span
          className="ch2-disclaimer"
          initial={{ opacity: 0, y: 16 }}
          animate={entered ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
        >
          ❋ Live site unavailable for some inactive or incomplete projects
        </motion.span>

        <motion.div
          style={{ display: "inline-block" }}
          initial={{ opacity: 0, y: 16 }}
          animate={entered ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, ease: EASE, delay: 0.35 }}
        >
          <Link
            href="/books"
            className="ch2-view-all"
            onClick={(event) => {
              event.preventDefault();
              triggerClipWipeCurtain("/books");
            }}
          >
            View All Work →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
