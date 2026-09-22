import { Header } from "@/components/Header";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { Footer } from "@/components/Footer";
import { profile } from "@/data/portfolio";

export default function Resume() {
  return (
    <>
      <ScrollAnimations />
      <Header theme="light" />
      <main className="resume-page">
        <div className="resume-inner">
          <div className="resume-intro reveal">
            <span className="resume-eyebrow">Resume</span>
            <h1 className="resume-title">Resume.</h1>
            <p className="resume-subtitle">View the complete resume directly inside the portfolio. Download it only if you want a copy.</p>
          </div>

          <div className="resume-layout-grid reveal">
            <div className="resume-pdf-frame">
              <iframe src="/resume.pdf#view=FitH" title="Sakina Saifuddin resume" />
            </div>

            <aside className="resume-side-panel">
              <span className="resume-side-label">Quick profile</span>
              <h3 className="resume-side-name">{profile.name}</h3>
              <p className="resume-side-text">{profile.education}</p>
              <p className="resume-side-text">{profile.location}</p>
              <hr className="resume-side-divider" />

              <span className="resume-side-label">Target roles</span>
              <div className="resume-tag-row">
                {profile.targetRoles.map((role) => (
                  <span className="resume-tag-pill" key={role}>{role}</span>
                ))}
              </div>
              <hr className="resume-side-divider" />

              <span className="resume-side-label">At a glance</span>
              {profile.heroStats.map((stat) => (
                <div className="resume-stat-row" key={stat.value}>
                  <strong className="resume-stat-value">{stat.value}</strong>
                  <span className="resume-stat-label">{stat.label}</span>
                </div>
              ))}

              <a className="resume-download-btn" href="/resume.pdf" download>Download PDF ↓</a>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
