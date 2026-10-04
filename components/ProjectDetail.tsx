"use client";

import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Header } from "@/components/Header";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { triggerPageCurtain } from "@/components/PageCurtain";
import { triggerClipWipeCurtain } from "@/components/ClipWipeCurtain";
import type { Project } from "@/data/portfolio";

const EASE = [0.16, 1, 0.3, 1] as const;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function navigate(href: string) {
  return (event: MouseEvent) => {
    event.preventDefault();
    triggerPageCurtain(href);
  };
}

function navigateNextProject(href: string) {
  return (event: MouseEvent) => {
    event.preventDefault();
    triggerClipWipeCurtain(href);
  };
}

export function ProjectDetail({ project, index, next }: { project: Project; index: number; next: Project }) {
  const [heroRevealed, setHeroRevealed] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("pd-hero-slug") === project.slug) {
      setHeroRevealed(false);
    }
  }, [project.slug]);

  useEffect(() => {
    if (heroRevealed) return;
    function onLanded(event: Event) {
      const detail = (event as CustomEvent<{ slug: string }>).detail;
      if (detail?.slug === project.slug) {
        setHeroRevealed(true);
        sessionStorage.removeItem("pd-hero-slug");
      }
    }
    window.addEventListener("project-image-landed", onLanded);
    const fallback = setTimeout(() => setHeroRevealed(true), 2500);
    return () => {
      window.removeEventListener("project-image-landed", onLanded);
      clearTimeout(fallback);
    };
  }, [heroRevealed, project.slug]);

  return (
    <>
      <ScrollAnimations />
      <Header theme="light" />
      <main className="pd-page">
        <div className="pd-layout">
          <div className="pd-left">
            <Link href="/books" className="pd-back" onClick={navigate("/books")}>
              <ArrowLeft size={14} /> Project Books
            </Link>

            <motion.div
              className="pd-head"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="pd-eyebrow">{pad(index + 1)} · {project.category}</span>
              <h1 className="pd-title">{project.title}</h1>
            </motion.div>

            <motion.div
              className="pd-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            >
              <span className="pd-section-label">Overview</span>
              <p className="pd-overview">{project.summary}</p>
            </motion.div>

            <motion.div
              className="pd-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
            >
              <span className="pd-section-label">Details</span>

              <div className="pd-details-row">
                <span className="pd-details-key">Key result</span>
                <span className="pd-details-value">
                  {project.headlineMetric} — {project.headlineLabel}
                </span>
              </div>

              {(project.links.length > 0 || project.documentGallery?.downloadHref) && (
                <div className="pd-details-row">
                  <span className="pd-details-key">Links</span>
                  <div className="pd-links">
                    {project.links.map((link) => (
                      <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                        {link.label} <ExternalLink size={13} />
                      </a>
                    ))}
                    {project.documentGallery?.downloadHref && (
                      <a href={project.documentGallery.downloadHref} target="_blank" rel="noreferrer">
                        {project.documentGallery.downloadLabel ?? "Open full document"} <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              className="pd-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.24 }}
            >
              <span className="pd-section-label">Stack</span>
              <div className="pd-stack-box">
                {project.tech.map((t) => (
                  <span className="pd-tag" key={t}>{t}</span>
                ))}
              </div>

              {project.outcomes.length > 0 && (
                <div className="pd-numbers">
                  {project.outcomes.map((o) => (
                    <div key={o.label}>
                      <span className="pd-stat-value">{o.value}</span>
                      <span className="pd-stat-label">{o.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            <div className="pd-next">
              <span className="pd-next-label">Next project</span>
              <Link
                href={`/works/${next.slug}`}
                className="pd-next-title"
                onClick={navigateNextProject(`/works/${next.slug}`)}
              >
                {next.title} →
              </Link>
            </div>
          </div>

          <div className="pd-right">
            {project.evidencePrivacyNotice && (
              <div className="pd-privacy-notice reveal">
                <strong>Evidence note — sample data</strong>
                <p>{project.evidencePrivacyNotice}</p>
              </div>
            )}

            {project.evidence.map((item, i) =>
              item.src ? (
                i === 0 ? (
                  <div
                    className="pd-right-media"
                    key={item.label}
                    data-hero-slug={project.slug}
                    style={{ opacity: heroRevealed ? 1 : 0 }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.src} alt={item.caption} loading="eager" />
                  </div>
                ) : (
                  <div className="pd-right-media reveal reveal-image" key={item.label}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.src} alt={item.caption} loading="lazy" />
                  </div>
                )
              ) : null
            )}

            {project.localVideo && (
              <div className="pd-right-video reveal reveal-image">
                <video src={project.localVideo} controls playsInline />
              </div>
            )}

            {project.documentGallery && (
              <div className="pd-doc-divider reveal reveal-image">
                <span>{project.documentGallery.title}</span>
                <p>{project.documentGallery.description}</p>
              </div>
            )}

            {project.documentGallery?.items.map((item) =>
              item.src ? (
                <div className="pd-right-media reveal reveal-image" key={item.label}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.src} alt={item.caption} loading="lazy" />
                </div>
              ) : null
            )}
          </div>
        </div>
      </main>
    </>
  );
}
