import { profile, experience, projects } from "@/data/portfolio";
import { StillScene } from "@/components/StillScene";

export const metadata = { title: "Sakina Saifuddin · plain version" };

export default function Lofi() {
  return (
    <main className="lofi">
      <h1>Hi, I&apos;m Sakina.</h1>
      <p className="dek">{profile.headline}</p>
      <a className="still" href="/?room=1" aria-label="Open the interactive desk">
        <StillScene />
      </a>
      <p className="note">
        This is the plain version, used on small screens and for reduced motion.{" "}
        <a href="/?room=1">Open the interactive desk anyway.</a>
      </p>
      <p>{profile.intro}</p>

      <h2>Work</h2>
      {experience.map((e) => (
        <div className="item" key={e.company + e.period}>
          <div className="hd">
            <span className="t">{e.company}</span>
            <span className="y">{e.period}</span>
          </div>
          <p>
            {e.role}. {e.intro}
          </p>
        </div>
      ))}

      <h2>Projects</h2>
      {projects.map((p) => (
        <div className="item" key={p.slug}>
          <div className="hd">
            <span className="t">{p.title.split(" — ")[0]}</span>
            <span className="y">{p.headlineMetric}</span>
          </div>
          <p>{p.summary}</p>
        </div>
      ))}

      <h2>Online</h2>
      <p>
        <a href={`mailto:${profile.email}`}>{profile.email}</a> · <a href={profile.linkedin}>LinkedIn</a> ·{" "}
        <a href={profile.github}>GitHub</a> · <a href="/resume.pdf">Resume</a>
      </p>
    </main>
  );
}
