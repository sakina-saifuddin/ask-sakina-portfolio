"use client";

import { useRef } from "react";
import type { MouseEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "@/components/Header";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { triggerClipWipeCurtain } from "@/components/ClipWipeCurtain";
import { projects } from "@/data/portfolio";

const EASE = [0.16, 1, 0.3, 1] as const;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const shortTitles: Record<string, string> = {
  "retail-demand-forecasting": "Retail Inventory Forecasting",
  "financial-reconciliation": "Financial Reconciliation",
  "healthcare-eligibility-pipeline": "Healthcare Eligibility Pipeline",
  "oracle-financial-etl": "Oracle Financial ETL",
  "pneumonia-dcgan": "Pneumonia X-ray GAN",
  "seizure-detection": "EEG Seizure Detection",
  "vertebral-column-classification": "Vertebral Classification",
  "fitness-video-optimization": "Fitness Video Optimization",
};

export default function Works() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".works-carousel-card");
    const amount = (card?.offsetWidth ?? 320) + 40;
    track.scrollBy({ left: amount * direction, behavior: "smooth" });
  }

  return (
    <>
      <ScrollAnimations />
      <Header theme="light" />
      <main className="works-grid-page">
        <div className="works-grid-inner">
          <span className="works-grid-kicker">Folio — Edition</span>
          <div className="works-grid-heading">
            <h1>All Work</h1>
            <span>({projects.length})</span>
          </div>

          <div className="works-carousel">
            <div className="works-carousel-track" ref={trackRef}>
              {projects.map((project, index) => (
                <motion.a
                  key={project.slug}
                  href={`/works/${project.slug}`}
                  className="works-carousel-card"
                  onClick={(event: MouseEvent) => {
                    event.preventDefault();
                    triggerClipWipeCurtain(`/works/${project.slug}`);
                  }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: index * 0.05 }}
                >
                  <motion.div
                    className="works-grid-media"
                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                    animate={{ clipPath: "inset(0 0% 0 0)" }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.12 + index * 0.05 }}
                  >
                    {project.evidence[0]?.src && (
                      <Image
                        src={project.evidence[0].src}
                        alt={project.title}
                        fill
                        sizes="320px"
                        style={{ objectFit: "contain" }}
                      />
                    )}
                  </motion.div>
                  <div className="works-grid-meta">
                    <span className="works-grid-number">{pad(index + 1)}.</span>
                    <div>
                      <span className="works-grid-category">{project.category}</span>
                      <h2 className="works-grid-title">{shortTitles[project.slug] ?? project.title}</h2>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="works-carousel-arrows">
              <button type="button" aria-label="Previous" onClick={() => scrollByCard(-1)}>
                <ChevronLeft size={18} />
              </button>
              <button type="button" aria-label="Next" onClick={() => scrollByCard(1)}>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
