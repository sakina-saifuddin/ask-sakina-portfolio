"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { triggerClipWipeCurtain } from "@/components/ClipWipeCurtain";

const EASE = [0.16, 1, 0.3, 1] as const;

type RelatedWorkItem = {
  number: string;
  title: string;
  image: string;
  href?: string;
  slug?: string;
};

const relatedWork: RelatedWorkItem[] = [
  {
    number: "01",
    title: "Sakina Job OS — Agentic AI Job Search & Outreach Platform",
    image: "/projects/job-os-placeholder.png",
    href: "/works/sakina-job-os",
    slug: "sakina-job-os",
  },
  {
    number: "02",
    title: "AI-Driven Retail Inventory Forecasting & Autonomous Inventory Optimization",
    image: "/project-evidence/retail-report/page-16.png",
    href: "/works/retail-demand-forecasting",
    slug: "retail-demand-forecasting",
  },
  {
    number: "03",
    title: "Financial Reconciliation & Grant Verification System",
    image: "/project-evidence/financial-reconciliation/grants-overview1.png",
    href: "/works/financial-reconciliation",
    slug: "financial-reconciliation",
  },
  {
    number: "04",
    title: "Oracle Financial ETL Pipeline",
    image: "/project-evidence/oracle-etl/conversion.png",
    href: "/works/oracle-financial-etl",
    slug: "oracle-financial-etl",
  },
  {
    number: "05",
    title: "GAN-Based Chest X-ray Augmentation for Pneumonia Detection",
    image: "/project-evidence/gan-deck/architecture.png",
    href: "/works/pneumonia-dcgan",
    slug: "pneumonia-dcgan",
  },
];

export function ChapterTwo() {
  const [active, setActive] = useState<RelatedWorkItem | null>(null);

  return (
    <section className="hz-panel hz-panel-related-work" data-nav-theme="light">
      <motion.div
        className="ch2-heading"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <span>Chapter II</span>
        <h2>Related Work</h2>
      </motion.div>

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
        {relatedWork.map((item) => {
          const content = (
            <>
              <span className="ch2-list-number">{item.number}</span>
              <span className="ch2-list-title">{item.title}</span>
            </>
          );
          const isActive = active?.number === item.number;
          const isDimmed = active !== null && !isActive;
          const stateClass = isActive ? " is-active" : isDimmed ? " ch2-list-item-dimmed" : "";
          return (
            <li key={item.number} className="ch2-list-row">
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
            </li>
          );
        })}
      </ul>

      <span className="ch2-disclaimer">❋ Live site unavailable for some inactive or incomplete projects</span>

      <Link
        href="/works"
        className="ch2-view-all"
        onClick={(event) => {
          event.preventDefault();
          triggerClipWipeCurtain("/works");
        }}
      >
        View All Work →
      </Link>
    </section>
  );
}
