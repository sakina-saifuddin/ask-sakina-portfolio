import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { Footer } from "@/components/Footer";

export const metadata = { title: "Achievements — Sakina Saifuddin" };

const PG = "/project-evidence/powerguard360";

const stats = [
  { value: "2nd", label: "place" },
  { value: "70+", label: "teams competing" },
  { value: "24 hrs", label: "to build it" },
];

const photos = [
  {
    title: "The live sensor board",
    context: "An Arduino with a motor speed sensor and an air quality sensor drove one turbine live during judging.",
    src: `${PG}/hw-1-sensor-board-setup.jpg`,
  },
  {
    title: "Gas leak test",
    context: "Holding gas near the air quality sensor raised a possible gas leak alert in the app.",
    src: `${PG}/hw-3-gas-leak-test.jpg`,
  },
  {
    title: "The 3D digital twin",
    context: "Every turbine, the battery yard and the AI data center, with the model's diagnosis for each unit.",
    src: `${PG}/live-01-plant-3d-twin.png`,
  },
  {
    title: "The engineer's phone",
    context: "When the manager approves a repair, the engineer gets the job on their phone.",
    src: `${PG}/hw-6-engineer-phone-app.jpg`,
  },
];

export default function Achievements() {
  return (
    <>
      <ScrollAnimations />
      <Header theme="light" />
      <main className="subpage">
        <div className="page-intro reveal">
          <span className="neon-label">ACHIEVEMENT</span>
          <h1>2nd place at CodeRED Orion<span>.</span></h1>
          <p>
            CodeRED Orion is the University of Houston&apos;s biggest hackathon. Our team competed against more than 70 teams and
            placed 2nd, winning a prize with Power Guard 360: a system that predicts power plant failures before they cut
            power to an AI data center.
          </p>
        </div>

        <section className="certificate-single reveal">
          <a className="certificate-image" href={`${PG}/hw-7-physical-model.jpg`} target="_blank" rel="noreferrer">
            <Image src={`${PG}/hw-7-physical-model.jpg`} alt="Power Guard 360 physical model of the power plant and AI data center at CodeRED Orion" fill sizes="(max-width: 900px) 94vw, 68vw" />
          </a>
          <div className="certificate-copy">
            <span>CODERED ORION · OCT 2026</span>
            <h2>Power Guard 360</h2>
            <p>University of Houston · Chevron track</p>
            <div className="achievement-stats">
              {stats.map((s) => (
                <div key={s.label}>
                  <strong>{s.value}</strong>
                  <small>{s.label}</small>
                </div>
              ))}
            </div>
            <p>
              I built the machine learning models that flag failing turbines and explain why, the 3D plant model, and the
              deployed website.
            </p>
            <div className="achievement-links">
              <Link href="/book/power-guard-360">Read the project book →</Link>
              <a href="https://powerguard360.us/" target="_blank" rel="noreferrer">Live website ↗</a>
              <a href="https://www.youtube.com/watch?v=1z6rV0uYjOI" target="_blank" rel="noreferrer">YouTube demo ↗</a>
            </div>
          </div>
        </section>

        <section className="video-proof reveal">
          <span className="neon-label">DEMO</span>
          <div className="video-frame">
            <iframe
              src="https://www.youtube-nocookie.com/embed/1z6rV0uYjOI"
              title="Power Guard 360 demo"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </section>

        <section className="appreciation-grid real-gallery">
          {photos.map((item) => (
            <figure className="reveal appreciation-card" key={item.title}>
              <a className="gallery-image" href={item.src} target="_blank" rel="noreferrer">
                <Image src={item.src} alt={item.title} fill sizes="(max-width: 800px) 94vw, 46vw" />
              </a>
              <figcaption><b>{item.title}</b><p>{item.context}</p></figcaption>
            </figure>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
