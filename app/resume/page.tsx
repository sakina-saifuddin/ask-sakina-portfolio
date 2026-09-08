import { Header } from "@/components/Header";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { Footer } from "@/components/Footer";
import { profile } from "@/data/portfolio";

export default function Resume() {
  return (
    <>
      <ScrollAnimations />
      <Header theme="light" />
      <main className="subpage">
        <div className="page-intro reveal"><span className="neon-label">RESUME</span><h1>Resume<span>.</span></h1><p>View the complete resume directly inside the portfolio. Download it only if you want a copy.</p></div>
        <div className="resume-layout reveal">
          <div className="pdf-shell"><iframe src="/resume.pdf#view=FitH" title="Sakina Saifuddin resume" /></div>
          <aside className="resume-aside">
            <small>QUICK PROFILE</small><h3>{profile.name}</h3><p>{profile.education}</p><p>{profile.location}</p><hr/>
            <small>TARGET ROLES</small><div className="tags">{profile.targetRoles.map((role) => <span key={role}>{role}</span>)}</div><hr/>
            <small>AT A GLANCE</small>{profile.heroStats.map((stat) => <div className="resume-stat" key={stat.value}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
            <a className="dark-button" href="/resume.pdf" download>Download PDF ↓</a>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
