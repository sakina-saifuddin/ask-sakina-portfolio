import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/portfolio";

const selectedSlugs = [
  "retail-demand-forecasting",
  "financial-reconciliation",
  "healthcare-eligibility-pipeline",
  "pneumonia-dcgan",
  "fitness-video-optimization",
];

const oneLiners: Record<string, string> = {
  "retail-demand-forecasting": "A LightGBM forecasting pipeline over 3M+ retail sales records, tuned to minimize error store-by-store.",
  "financial-reconciliation": "A centralized Power BI + PowerApps system that automated 1,074 recurring grant and financial reports.",
  "healthcare-eligibility-pipeline": "A unified eligibility pipeline reconciling 15–20 healthcare data sources into one consistent benefit summary.",
  "pneumonia-dcgan": "Two DCGAN experiments that improved chest X-ray classification balance from 73.56% to 82.21% accuracy.",
  "fitness-video-optimization": "Diagnosed a video-delivery bottleneck and cut load time from about five minutes to roughly three seconds.",
};

export function ChapterWork() {
  const selected = selectedSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));

  return (
    <section id="work" className="chapter chapter-alt chapter-work">
      <div className="chapter-label reveal">
        <span className="chapter-eyebrow">Chapter II</span>
        <span className="chapter-eyebrow-title">Selected Work</span>
      </div>

      <p className="chapter-intro-line reveal">A few projects that show the range — from forecasting and generative AI to financial systems and healthcare data.</p>

      <div className="work-list">
        {selected.map((project, index) => (
          <article className="work-row reveal" key={project.slug}>
            <span className="work-row-number">{String(index + 1).padStart(2, "0")}</span>
            <div className="work-row-visual">
              {project.evidence[0]?.src && (
                <Image src={project.evidence[0].src} alt={project.evidence[0].caption} fill sizes="(max-width: 900px) 92vw, 44vw" />
              )}
            </div>
            <div className="work-row-copy">
              <small className="work-row-category">{project.category}</small>
              <h3>{project.title}</h3>
              <p>{oneLiners[project.slug] ?? project.summary}</p>
              <Link className="work-row-link" href={`/projects/${project.slug}`}>
                Read the case study <ArrowUpRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <Link className="chapter-more-link reveal" href="/projects">View the full archive of work →</Link>
    </section>
  );
}
