import Image from "next/image";
import { Header } from "@/components/Header";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { Footer } from "@/components/Footer";

const items = [
  {
    title: "2nd Place — CodeRED Orion Hackathon",
    context: "Placed 2nd out of 70+ teams at the University of Houston's biggest hackathon with Power Guard 360. See the achievements page for the full story.",
    src: "/project-evidence/powerguard360/hw-7-physical-model.jpg",
  },
  {
    title: "Eligibility Pipeline Appreciation",
    context: "Team feedback on the healthcare eligibility pipeline and discrepancy resolution work.",
    src: "/appreciation/dentalx-team.png",
  },
  {
    title: "Financial Automation & Power BI Recognition",
    context: "Recognition for the monthly financial data workflow, background automation, and DAX work.",
    src: "/appreciation/uh-manager.jfif",
  },
  {
    title: "Certificate of Appreciation — Queper",
    context: "Recognition for content writing and social media management contributions.",
    src: "/appreciation/queper.png",
  },
  {
    title: "Academic Recommendation",
    context: "LinkedIn recommendation from a former instructor and Final Year Project supervisor.",
    src: "/appreciation/linkedin-recommendation.png",
  },
  {
    title: "Waste Wise Dialogue 1.0 — Event Organization",
    context: "Iqra University recognition for organizing an academic panel discussion on waste management and sustainability.",
    src: "/appreciation/waste-wise.jpg",
  },
  {
    title: "IU Techies’22 — Speed Programming",
    context: "Participation in Iqra University’s speed-programming competition, with a second-place team finish.",
    src: "/appreciation/techies22.jpg",
  },
];

export default function Appreciation() {
  return (
    <>
      <ScrollAnimations />
      <Header theme="light" />
      <main className="subpage">
        <div className="page-intro reveal">
          <span className="neon-label">RECOGNITION</span>
          <h1>Appreciation & recommendations<span>.</span></h1>
          <p>Messages, recommendations, and recognition I have received from managers, teammates, instructors, and organizations.</p>
        </div>
        <section className="appreciation-grid real-gallery">
          {items.map((item) => (
            <figure className="reveal appreciation-card" key={item.title}>
              <a className="gallery-image" href={item.src} target="_blank" rel="noreferrer">
                <Image src={item.src} alt={item.title} fill sizes="(max-width: 800px) 94vw, 46vw" />
              </a>
              <figcaption><b>{item.title}</b><p>{item.context}</p><a href={item.src} target="_blank" rel="noreferrer">Open full image ↗</a></figcaption>
            </figure>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
