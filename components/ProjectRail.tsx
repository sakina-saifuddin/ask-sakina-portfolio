"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Project, projects } from "@/data/portfolio";
import { useRef, useState } from "react";

function ProjectVisual({ project }: { project: Project }) {
  const [active, setActive] = useState(0);

  if (project.localVideo) {
    return (
      <div className="project-media project-media-video">
        <div className="project-card-video">
          <video autoPlay muted loop playsInline controls preload="auto">
            <source src={project.localVideo} type="video/mp4" />
            Your browser does not support embedded video.
          </video>
        </div>
        <p className="project-media-note">Live application demo · the video plays directly in the project card.</p>
      </div>
    );
  }

  if (project.documentGallery) {
    return (
      <div className="project-media project-media-document">
        <div className="project-card-document-scroll" aria-label={`${project.title} full document`}>
          {project.documentGallery.items.map((item, index) => (
            <figure key={`${item.label}-${index}`}>
              {item.src && (
                <div className="project-document-page">
                  <Image src={item.src} alt={item.caption} fill sizes="(max-width: 900px) 86vw, 52vw" />
                </div>
              )}
              <figcaption><b>{item.label}</b><p>{item.caption}</p></figcaption>
            </figure>
          ))}
        </div>
        <p className="project-media-note">← Scroll left / right through the complete {project.slug === "pneumonia-dcgan" ? "presentation" : "report"} →</p>
      </div>
    );
  }

  const evidence = project.evidence[active] ?? project.evidence[0];
  return (
    <div className="project-media">
      <div className="project-main-image">
        {evidence?.type === "image" && evidence.src ? (
          <Image src={evidence.src} alt={evidence.caption} fill sizes="(max-width: 900px) 95vw, 55vw" />
        ) : (
          <div className="visual-placeholder"><span>PROJECT OVERVIEW</span><strong>{project.headlineMetric}</strong><p>{evidence?.caption || project.headlineLabel}</p></div>
        )}
      </div>
      <div className="project-thumbnails">
        {project.evidence.map((ev, index) => (
          <button className={active === index ? "active" : ""} onClick={() => setActive(index)} key={`${ev.label}-${index}`} aria-label={`Show ${ev.label}`}>
            {ev.type === "image" && ev.src ? <Image src={ev.src} alt="" fill sizes="160px" /> : <span>{index + 1}</span>}
            <small>{ev.label}</small>
          </button>
        ))}
      </div>
    </div>
  );
}

export function ProjectRail({ showHeading = true }: { showHeading?: boolean }) {
  const rail = useRef<HTMLDivElement>(null);
  const move = (direction: number) => rail.current?.scrollBy({ left: direction * (rail.current.clientWidth + 24), behavior: "smooth" });

  return (
    <section className={`work-section ${showHeading ? "" : "archive-rail"}`} id="projects">
      {showHeading && (
        <div className="section-title-row reveal">
          <div><span className="section-kicker">04 / PROJECTS</span><h2>A Few Things I've Shipped</h2><p>Real systems, dashboards, pipelines, models, reports, and product work — with the screenshots, numbers, and case studies behind them.</p></div>
          <div className="rail-actions"><Link href="/projects">Full archive →</Link><div className="rail-controls"><button onClick={() => move(-1)} aria-label="Previous project"><ArrowLeft/></button><button onClick={() => move(1)} aria-label="Next project"><ArrowRight/></button></div></div>
        </div>
      )}
      {!showHeading && <div className="archive-controls"><span>Featured projects</span><div className="rail-controls"><button onClick={() => move(-1)} aria-label="Previous project"><ArrowLeft/></button><button onClick={() => move(1)} aria-label="Next project"><ArrowRight/></button></div></div>}

      <div className="project-rail" ref={rail}>
        {projects.map((project, index) => (
          <article className="project-card" key={project.slug}>
            <ProjectVisual project={project}/>
            <div className="project-content">
              <div className="project-card-top"><span>{String(index + 1).padStart(2, "0")}</span><small>{project.category}</small></div>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="project-outcomes">{project.outcomes.map((outcome) => <div key={outcome.value + outcome.label}><strong>{outcome.value}</strong><span>{outcome.label}</span></div>)}</div>
              <div className="tags">{project.tech.slice(0, 7).map((t) => <span key={t}>{t}</span>)}</div>
              <div className="project-card-links"><Link href={`/projects/${project.slug}`}>Read case study <ExternalLink size={15}/></Link>{project.links.slice(0, 1).map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a>)}</div>
            </div>
          </article>
        ))}
      </div>
      <div className="scroll-hint">Use the arrows or swipe to view the next project.</div>
    </section>
  );
}
