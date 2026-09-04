import { ExternalLink } from "lucide-react";
import { experience } from "@/data/portfolio";

const highlightPattern = /(\b\d+(?:\.\d+)?(?:K|M)?\+?%?\b|20% → 80%|25–30%|60%\+|3×|99\.9%|15–20|10–15|11\+|50\+|70\+|1,074|1,000\+|500K\+|10\+|Power BI|PowerApps|Power Automate|SharePoint|Python|SQL|BigQuery|REST API|AWS S3|CI\/CD|OpenAI API|Prisma|Node\.js|React Native|Teradata|HiveQL|Meta Ads)/i;

function HighlightText({ text }: { text: string }) {
  const parts = text.split(highlightPattern);
  return <>{parts.map((part, i) => highlightPattern.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>)}</>;
}

export function Experience() {
  return (
    <section className="experience-section" id="experience">
      <div className="section-heading reveal">
        <span className="section-kicker">03 / EXPERIENCE</span>
        <h2>Experience</h2>
        <p>Each role is summarized around the work, the scale, and the result.</p>
      </div>

      <div className="experience-list">
        {experience.map((item, index) => (
          <article className="experience-item reveal" key={`${item.company}-${item.role}`}>
            <div className="experience-topline"><span>{String(index + 1).padStart(2, "0")}</span><span>{item.period}</span></div>
            <div className="experience-main">
              <div className="experience-title-row">
                <div><h3>{item.role}</h3><a href={item.companyUrl} target="_blank" rel="noreferrer">{item.company} <ExternalLink size={14}/></a></div>
                <span>{item.location}</span>
              </div>
              <p className="experience-intro">{item.intro}</p>
              <div className="impact-strip">{item.stats.map((stat) => <div key={stat.value + stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
              <ul>{item.bullets.map((bullet) => <li key={bullet}><HighlightText text={bullet}/></li>)}</ul>
              <div className="tags">{item.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
