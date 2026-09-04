import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Header } from "@/components/Header";
import { RecruiterQA } from "@/components/RecruiterQA";
import { TechMarquee } from "@/components/TechMarquee";
import { ProjectRail } from "@/components/ProjectRail";
import { Experience } from "@/components/Experience";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { Footer } from "@/components/Footer";
import { profile } from "@/data/portfolio";

export default function Home() {
  return (
    <>
      <ScrollAnimations />
      <Header />
      <main>
        <section className="hero" id="about">
          <div className="hero-copy reveal">
            <span className="eyebrow">PORTFOLIO OF SAKINA</span>
            <h1 className="hero-headline">I'm <span className="hero-name">&#123;Sakina&#125;</span>.</h1>
            <h2 className="hero-subheadline">{profile.headline}</h2>
            <p className="hero-intro">{profile.intro}</p>
            <div className="hero-meta">
              <span><MapPin size={16}/>{profile.location}</span>
              <span>{profile.education}</span>
              <span>{profile.graduation}</span>
            </div>
            <div className="role-block">
              <small>ROLES I’M INTERESTED IN</small>
              <div className="role-list">{profile.targetRoles.map((role) => <span key={role}>{role}</span>)}</div>
            </div>
            <div className="hero-actions">
              <Link className="primary-button neon-button" href="/projects">View my work</Link>
              <Link className="secondary-button" href="/resume">View resume</Link>
            </div>
          </div>

          <div className="portrait-wrap reveal">
            <div className="portrait"><Image src="/profile.jpg" fill priority sizes="(max-width: 900px) 92vw, 42vw" alt="Sakina Saifuddin" /></div>
            <div className="portrait-location"><MapPin size={15}/> Houston, Texas</div>
          </div>

          <div className="hero-stats reveal">{profile.heroStats.map((stat) => <div key={stat.value + stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>

          <div className="worked-with reveal">
            <span>EXPERIENCE ACROSS</span>
            <div className="company-logo-row">
              {profile.organizations.map((org) => (
                <a key={org.name} href={org.href} target="_blank" rel="noreferrer" className="company-logo-card" title={org.name}>
                  {/* {org.logo ? <img src={org.logo} alt={`${org.name} logo`} /> : <strong>{org.name}</strong>} */}

    {org.name.toLowerCase().includes("dental") ? (
  <div className="dentalx-logo">
    <span>DENTAL</span>
    <strong>X</strong>
  </div>
) : org.logo ? (
  <img src={org.logo} alt={`${org.name} logo`} />
) : (
  <strong>{org.name}</strong>
)}

                </a>
              ))}
            </div>
          </div>
        </section>

        <RecruiterQA />
        <TechMarquee />
        <Experience />
        <ProjectRail />

        <section className="journey-section" id="journey">
          <div className="section-heading reveal"><span className="section-kicker">05 / JOURNEY</span><h2>How my work connects</h2><p>My work started with clients and performance, moved into software and analytics, and now also includes machine learning, healthcare data, and automation.</p></div>
          <div className="journey-line">
            <article className="reveal"><span>01</span><h3>Business & performance</h3><p>I worked with client accounts, campaign performance, content planning, and growth before moving deeper into technical work.</p></article>
            <article className="reveal"><span>02</span><h3>Software engineering</h3><p>I built web, mobile, backend, API, and cloud-based applications and learned how production systems are put together.</p></article>
            <article className="reveal"><span>03</span><h3>Data & business intelligence</h3><p>I built dashboards, data pipelines, and reporting workflows around financial, banking, and operational data.</p></article>
            <article className="reveal"><span>04</span><h3>Machine learning & AI</h3><p>I train forecasting, computer-vision, neural-network, and generative models and work with LLM-based integrations.</p></article>
          </div>
        </section>

        <section className="recognition-preview">
          <div className="section-heading reveal"><span className="section-kicker">06 / APPRECIATION</span><h2>Appreciation & recommendations</h2><p>Messages, recommendations, and recognition from people I have worked with and learned from.</p></div>
          <Link className="text-link reveal" href="/appreciation">View appreciation →</Link>
        </section>

        <section className="closing-cta reveal" id="contact"><span>CONTACT</span><h2>Want to talk about a role or project?</h2><p>I’m open to opportunities across software, data, analytics, machine learning, and automation.</p><div><a className="primary-button neon-button" href={`mailto:${profile.email}?subject=Opportunity for Sakina Saifuddin`}>Email Sakina</a><a className="secondary-button" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></div></section>
      </main>
      <Footer />
    </>
  );
}
