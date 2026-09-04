"use client";

import { useState } from "react";
import { technologyGroups } from "@/data/portfolio";

function TechItem({ name, icon }: { name: string; icon: string }) {
  const [failed, setFailed] = useState(false);
  const hasLogo = Boolean(icon) && !failed;

  return (
    <div className={`technology-item ${hasLogo ? "has-logo" : "text-only"}`}>
      {hasLogo ? (
        <>
          <div className="technology-icon">
            <img src={icon} alt={`${name} logo`} loading="lazy" onError={() => setFailed(true)} />
          </div>
          <span>{name}</span>
        </>
      ) : (
        <span className="technology-text-only">{name}</span>
      )}
    </div>
  );
}

export function TechMarquee() {
  return (
    <section className="tools-section" id="tools">
      <div className="section-heading reveal">
        <span className="section-kicker">02 / TOOLS</span>
        <h2>Tools & technologies I’ve worked with</h2>
        <p>Grouped by the kind of work I use them for across software, machine learning, data, BI, automation, and cloud projects.</p>
      </div>
      <div className="technology-groups">
        {technologyGroups.map((group) => (
          <article className="technology-group reveal" key={group.title}>
            <h3>{group.title}</h3>
            <div className="technology-grid">
              {group.items.map((item) => <TechItem key={item.name} name={item.name} icon={item.icon} />)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
