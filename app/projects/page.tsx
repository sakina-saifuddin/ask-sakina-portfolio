import { Header } from "@/components/Header";
import { ProjectRail } from "@/components/ProjectRail";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { Footer } from "@/components/Footer";
import { moreProjectsUrl } from "@/data/portfolio";

export default function Projects() {
  return (
    <>
      <ScrollAnimations />
      <Header />
      <main className="subpage projects-page">
        <div className="page-intro reveal">
          <span className="neon-label">PROJECT ARCHIVE</span>
          <h1>A Few Things I&apos;ve Shipped</h1>
          <p>Projects across forecasting, financial analytics, healthcare automation, data engineering, machine learning, and software performance. Open any project to see the challenge, what I changed, the numbers, and the proof behind the result.</p>
        </div>
        <ProjectRail showHeading={false} />

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
