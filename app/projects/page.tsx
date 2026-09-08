import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Header } from "@/components/Header";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { Footer } from "@/components/Footer";
import { projects, moreProjectsUrl } from "@/data/portfolio";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Projects() {
  return (
    <>
      <ScrollAnimations />
      <Header theme="light" />
      <main className="subpage works-page">
        <div className="page-intro reveal">
          <span className="neon-label">PROJECT ARCHIVE</span>
          <h1>A Few Things I&apos;ve Shipped</h1>
          <p>Projects across forecasting, financial analytics, healthcare automation, data engineering, machine learning, and software performance. Select a project to jump to it.</p>
        </div>

        <ol className="works-list">
          {projects.map((project, index) => (
            <li key={project.slug} className="works-list-row reveal">
              <a href={`#work-${project.slug}`} className="works-list-item">
                <span className="works-list-number">{pad(index + 1)}</span>
                <div className="works-list-media">
                  {project.evidence[0]?.src && (
                    <Image
                      src={project.evidence[0].src}
                      alt={project.title}
                      fill
                      sizes="(max-width: 900px) 92vw, 900px"
                    />
                  )}
                </div>
                <span className="works-list-category">{project.category}</span>
                <h2 className="works-list-title">{project.title}</h2>
              </a>
            </li>
          ))}
        </ol>

        <div className="works-details">
          {projects.map((project, index) => {
            const next = projects[(index + 1) % projects.length];
            return (
              <section id={`work-${project.slug}`} className="work-detail reveal" key={project.slug}>
                <div className="work-detail-head">
                  <span className="work-detail-number">{pad(index + 1)}</span>
                  <span className="work-detail-category">{project.category}</span>
                  <h2>{project.title}</h2>
                  <p className="work-detail-overview">{project.summary}</p>
                </div>

                {project.approach.length > 0 && (
                  <ul className="work-detail-bullets">
                    {project.approach.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                )}

                <div className="work-detail-media">
                  {project.evidence.map(
                    (ev) =>
                      ev.src && (
                        <div className="work-detail-image" key={ev.label}>
                          <Image src={ev.src} alt={ev.caption} fill sizes="(max-width: 900px) 94vw, 900px" />
                        </div>
                      )
                  )}
                </div>

                <div className="work-detail-footer">
                  <div className="work-detail-links">
                    {project.links.map((link) => (
                      <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                        {link.label} <ExternalLink size={15} />
                      </a>
                    ))}
                  </div>
                  <a href={`#work-${next.slug}`} className="work-detail-next">
                    Next project: {next.title} →
                  </a>
                </div>
              </section>
            );
          })}
        </div>

        <section className="more-projects-cta reveal">
          <span className="section-kicker">MORE MACHINE LEARNING</span>
          <h2>Explore more machine learning projects</h2>
          <p>More notebooks and data-science work are available in my Data Science Projects repository.</p>
          <a href={moreProjectsUrl} target="_blank" rel="noreferrer">Explore more projects on GitHub ↗</a>
        </section>
      </main>
      <Footer />
    </>
  );
}
