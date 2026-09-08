import { profile } from "@/data/portfolio";

export function ChapterContact() {
  return (
    <section id="contact" className="chapter chapter-contact">
      <div className="chapter-label reveal">
        <span className="chapter-eyebrow">Final Chapter</span>
        <span className="chapter-eyebrow-title">Contact</span>
      </div>

      <h2 className="contact-headline reveal">Let&apos;s build something useful.</h2>
      <p className="contact-sub reveal">{profile.availability}.</p>

      <div className="contact-links reveal">
        <a href={`mailto:${profile.email}?subject=Opportunity for Sakina Saifuddin`}>Email →</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn →</a>
        <a href={profile.github} target="_blank" rel="noreferrer">GitHub →</a>
        <a href="/resume">Resume →</a>
      </div>
    </section>
  );
}
