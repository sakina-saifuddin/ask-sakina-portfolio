import { profile, experience, projects, technologyGroups } from "@/data/portfolio";
import type { ChannelId } from "@/lib/channels";

const shortTitle = (t: string) => t.split(" — ")[0];

export function ChannelView({ id }: { id: ChannelId }) {
  if (id === "about")
    return (
      <div className="ch">
        <h3>{profile.headline}</h3>
        <p>{profile.intro}</p>
        <p className="dim">{profile.education} · {profile.graduation}</p>
        <p className="dim">{profile.location}</p>
        <div className="stats">
          {profile.heroStats.map((s) => (
            <div key={s.label}><b>{s.value}</b><span>{s.label}</span></div>
          ))}
        </div>
        <h4>Looking for</h4>
        <ul>{profile.targetRoles.map((r) => <li key={r}>{r}</li>)}</ul>
        <p className="dim">{profile.availability}</p>
      </div>
    );

  if (id === "work")
    return (
      <div className="ch">
        {experience.map((e) => (
          <section key={e.company + e.period}>
            <h3>{e.company}</h3>
            <p className="dim">{e.period} · {e.role}</p>
            <p>{e.intro}</p>
            <ul>{e.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
            <p className="tags">{e.tools.join(" · ")}</p>
          </section>
        ))}
      </div>
    );

  if (id === "projects")
    return (
      <div className="ch">
        {projects.map((p) => (
          <section key={p.slug}>
            <h3>{shortTitle(p.title)}</h3>
            <p className="dim">{p.headlineMetric} · {p.headlineLabel}</p>
            <p>{p.summary}</p>
            <p className="tags">{p.tech.slice(0, 8).join(" · ")}</p>
            {p.links.length > 0 && (
              <p>
                {p.links.slice(0, 3).map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
                ))}
              </p>
            )}
          </section>
        ))}
      </div>
    );

  if (id === "tools")
    return (
      <div className="ch">
        {technologyGroups.map((g) => (
          <section key={g.title}>
            <h3>{g.title}</h3>
            <p>{g.items.map((i) => i.name).join(" · ")}</p>
          </section>
        ))}
      </div>
    );

  return (
    <div className="ch">
      <h3>Say hello</h3>
      <p>{profile.availability}.</p>
      <p><a href={`mailto:${profile.email}`}>{profile.email}</a></p>
      <p><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a><a href="/resume.pdf" target="_blank" rel="noreferrer">Resume (PDF)</a></p>
      <p className="dim">{profile.location}</p>
    </div>
  );
}
