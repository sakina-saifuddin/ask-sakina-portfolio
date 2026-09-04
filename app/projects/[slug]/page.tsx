import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { Header } from "@/components/Header";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { Footer } from "@/components/Footer";
import { projects } from "@/data/portfolio";

export function generateStaticParams() { return projects.map((p) => ({ slug: p.slug })); }

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <ScrollAnimations />
      <Header />
      <main className="case-page">
        <Link className="back" href="/projects">← A Few Things I&apos;ve Shipped</Link>
        <header className="case-hero reveal">
          <div>
            <span className="section-kicker">{project.category}</span>
            <h1>{project.title}</h1>
            <p>{project.summary}</p>
          </div>
          <div className="case-metric"><strong>{project.headlineMetric}</strong><span>{project.headlineLabel}</span></div>
        </header>

        <section className="case-problem reveal"><span>THE PROBLEM</span><h2>{project.problem}</h2></section>

        <section className="case-body">
          <div className="case-copy reveal">
            <span className="section-kicker">WHAT I DID</span>
            <h2>How I approached it.</h2>
            <ol>{project.approach.map((x) => <li key={x}>{x}</li>)}</ol>
          </div>
          <div className="case-copy reveal">
            <span className="section-kicker">NUMBERS & CHECKS</span>
            <h2>How I knew it worked.</h2>
            <ul>{project.evaluation.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        </section>

        {project.caseStudySections && project.caseStudySections.length > 0 && (
          <section className="story-case-study reveal">
            <div className="story-case-intro">
              <span className="section-kicker">CASE STUDY</span>
              <h2>The full story, without the jargon.</h2>
              <p>The challenge, what I tried, what I changed, and what the numbers mean in simple language.</p>
            </div>
            <div className="story-case-sections">
              {project.caseStudySections.map((section, index) => (
                <article key={section.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{section.title}</h3><p>{section.text}</p></div>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="evidence-section">
          <div className="section-heading reveal">
            <span className="section-kicker">PROJECT PROOF</span>
            <h2>What the work looked like.</h2>
            <p>Each visual has a short caption so the result is understandable even without a technical background.</p>
          </div>
          <div className="evidence-grid">
            {project.evidence.map((ev) => (
              <figure className="reveal" key={ev.label}>
                {ev.type === "image" && ev.src ? (
                  <div className="evidence-image"><Image src={ev.src} fill sizes="(max-width: 900px) 94vw, 75vw" alt={ev.caption} /></div>
                ) : (
                  <div className="evidence-placeholder"><strong>{ev.label}</strong><small>{ev.caption}</small></div>
                )}
                <figcaption><b>{ev.label}</b><p>{ev.caption}</p></figcaption>
              </figure>
            ))}
          </div>
        </section>

        {project.documentGallery && (
          <section className="document-gallery reveal">
            <div className="document-gallery-heading">
              <div>
                <span className="section-kicker">FULL WALKTHROUGH</span>
                <h2>{project.documentGallery.title}</h2>
                <p>{project.documentGallery.description}</p>
              </div>
              {project.documentGallery.downloadHref && (
                <a href={project.documentGallery.downloadHref} target="_blank" rel="noreferrer">
                  {project.documentGallery.downloadLabel || "Open document"} <ExternalLink size={15}/>
                </a>
              )}
            </div>
            <div className="document-scroll" aria-label={`${project.title} document pages`}>
              {project.documentGallery.items.map((item, index) => (
                <figure key={`${item.label}-${index}`}>
                  {item.src && <div className="document-page"><Image src={item.src} fill sizes="(max-width: 800px) 88vw, 760px" alt={item.caption} /></div>}
                  <figcaption><b>{item.label}</b><p>{item.caption}</p></figcaption>
                </figure>
              ))}
            </div>
            <p className="document-scroll-hint">← Scroll left / right to continue →</p>
          </section>
        )}

        {project.localVideo && (
          <section className="video-proof reveal">
            <div className="section-heading"><span className="section-kicker">WORKING DEMO</span><h2>See the application in use.</h2><p>The uploaded demo is embedded directly in the project page.</p></div>
            <div className="local-video-frame">
              <video autoPlay muted loop controls playsInline preload="auto">
                <source src={project.localVideo} type="video/mp4" />
                Your browser does not support embedded video.
              </video>
            </div>
          </section>
        )}

        {project.videoId && !project.localVideo && (
          <section className="video-proof reveal">
            <div className="section-heading"><span className="section-kicker">DEMO</span><h2>Watch the project.</h2></div>
            <div className="video-frame">
              <iframe
                src={`https://www.youtube.com/embed/${project.videoId}`}
                title={`${project.title} demo`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </section>
        )}

        <section className="outcome-box reveal">
          <span>OUTCOME</span>
          <h2>What this project shows.</h2>
          <div>{project.outcomes.map((outcome) => <article key={outcome.value + outcome.label}><strong>{outcome.value}</strong><p>{outcome.label}</p></article>)}</div>
          <p className="limitations"><b>Limits / next step:</b> {project.limitations}</p>
        </section>

        <section className="project-footer-links reveal">
          <div className="tags large">{project.tech.map((t) => <span key={t}>{t}</span>)}</div>
          <div>{project.links.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label} <ExternalLink size={15}/></a>)}</div>
        </section>
      </main>
      <Footer />
    </>
  );
}
