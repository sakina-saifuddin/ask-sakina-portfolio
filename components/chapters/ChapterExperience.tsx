import Image from "next/image";
import { experience, profile } from "@/data/portfolio";

const selectedCompanies = [
  "Dental-X AI",
  "Texas Manufacturing Assistance Center (TMAC / NIST-MEP)",
  "BluTech Consulting",
  "The Walnut Agency",
  "SoftSyncDev",
];

function findLogo(company: string) {
  const org = profile.organizations.find((item) => company.includes(item.name) || item.name.includes(company.split(" ")[0]));
  return org?.logo;
}

export function ChapterExperience() {
  const selected = selectedCompanies
    .map((company) => experience.find((item) => item.company === company))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <section id="experience" className="chapter chapter-alt chapter-experience">
      <div className="chapter-label reveal">
        <span className="chapter-eyebrow">Chapter IV</span>
        <span className="chapter-eyebrow-title">Selected Experience</span>
      </div>

      <p className="chapter-intro-line reveal">Roles across healthcare automation, financial analytics, and software engineering.</p>

      <div className="experience-editorial-list">
        {selected.map((item) => {
          const logo = findLogo(item.company);
          const stat = item.stats[0];
          return (
            <article className="experience-editorial-row reveal" key={item.company}>
              <div className="experience-editorial-logo">
                {logo && <Image src={logo} alt={`${item.company} logo`} width={44} height={44} />}
              </div>
              <div className="experience-editorial-main">
                <h3>{item.role}</h3>
                <span>{item.company}</span>
              </div>
              <div className="experience-editorial-period">{item.period}</div>
              {stat && (
                <div className="experience-editorial-stat"><strong>{stat.value}</strong><span>{stat.label}</span></div>
              )}
            </article>
          );
        })}
      </div>

      <div className="chapter-closing-line reveal">
        <span>AND MORE</span>
        <p>Work across AI, analytics, research, marketing, and digital teams.</p>
      </div>
    </section>
  );
}
