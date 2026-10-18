import Image from "next/image";
import Link from "next/link";

const items = [
  {
    title: "2nd Place — CodeRED Orion Hackathon",
    context: "Placed 2nd out of 70+ teams at the University of Houston's biggest hackathon with Power Guard 360.",
    src: "/project-evidence/powerguard360/hw-7-physical-model.jpg",
    href: "/achievements",
  },
  {
    title: "Eligibility Pipeline Appreciation",
    context: "Team recognition for the healthcare eligibility pipeline and discrepancy resolution work.",
    src: "/appreciation/dentalx-team.png",
    href: "/appreciation",
  },
  {
    title: "Academic Recommendation",
    context: "LinkedIn recommendation from a former instructor and Final Year Project supervisor.",
    src: "/appreciation/linkedin-recommendation.png",
    href: "/appreciation",
  },
  {
    title: "NVIDIA — Getting Started with Deep Learning",
    context: "Certificate of Competency, issued April 2026.",
    src: "/certificates/nvidia-deep-learning.png",
    href: "/certificates",
  },
];

export function ChapterRecognition() {
  return (
    <section id="recognition" className="chapter chapter-alt chapter-recognition">
      <div className="chapter-label reveal">
        <span className="chapter-eyebrow">Chapter VI</span>
        <span className="chapter-eyebrow-title">Recognition</span>
      </div>

      <p className="chapter-intro-line reveal">A few kind words, one certificate, and moments that mattered.</p>

      <div className="recognition-grid">
        {items.map((item) => (
          <Link className="recognition-card reveal" href={item.href} key={item.title}>
            <div className="recognition-card-image"><Image src={item.src} alt={item.title} fill sizes="(max-width: 900px) 88vw, 30vw" /></div>
            <b>{item.title}</b>
            <p>{item.context}</p>
          </Link>
        ))}
      </div>

      <Link className="chapter-more-link reveal" href="/appreciation">See all appreciation & certificates →</Link>
    </section>
  );
}
