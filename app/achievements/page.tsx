import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { Footer } from "@/components/Footer";

export const metadata = { title: "Achievements — Sakina Saifuddin" };

const PG = "/project-evidence/powerguard360";
const DEVPOST = "https://devpost.com/software/power-guard-360";

const stats = [
  { value: "2nd", label: "place" },
  { value: "70+", label: "teams competing" },
  { value: "$500", label: "cash prize" },
  { value: "24", label: "hours to build it" },
];

const photos = [
  {
    title: "Pitching to the judges",
    context: "Walking the judges through the live sensor board, the 3D plant and our physical model.",
    src: `${PG}/pitching-to-judges.jpg`,
  },
  {
    title: "Presenting the demo",
    context: "Explaining how the model flags a failing turbine and why, during judging.",
    src: `${PG}/presenting-demo.jpg`,
  },
  {
    title: "The live sensor board",
    context: "An Arduino with a motor speed sensor and an air quality sensor drove one turbine live during judging.",
    src: `${PG}/hw-1-sensor-board-setup.jpg`,
  },
  {
    title: "The physical model",
    context: "A gas power plant feeding an AI data center: the real-world setup behind the project.",
    src: `${PG}/hw-7-physical-model.jpg`,
  },
];

export default function Achievements() {
  return (
    <>
      <ScrollAnimations />
      <Header theme="light" />
      <main className="subpage achievements-page">
        <div className="page-intro reveal">
          <span className="neon-label">ACHIEVEMENT</span>
          <h1>2nd place at CodeRED Orion<span>.</span></h1>
          <p>
            CodeRED Orion is the University of Houston&apos;s biggest hackathon. Competing against more than 70 teams, I led
            our team to 2nd place and a $500 cash prize for Best Pitch/Demo with Power Guard 360: a system that predicts power
            plant failures before they cut power to an AI data center.
          </p>
        </div>

        <section className="certificate-single reveal">
          <a className="certificate-image achievement-photo" href={`${PG}/award-500-best-pitch.jpg`} target="_blank" rel="noreferrer">
            <Image src={`${PG}/award-500-best-pitch.jpg`} alt="Sakina and the Power Guard 360 team on stage holding the $500 Best Pitch prize check at CodeRED Orion" fill sizes="(max-width: 900px) 94vw, 68vw" />
          </a>
          <div className="certificate-copy">
            <span>CODERED ORION · OCT 11, 2026</span>
            <h2>Power Guard 360</h2>
            <p>Winner, Best Pitch/Demo · Chevron track</p>
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
              <a href={DEVPOST} target="_blank" rel="noreferrer">Devpost ↗</a>
              <a href="https://powerguard360.us/" target="_blank" rel="noreferrer">Live website ↗</a>
              <a href="https://www.youtube.com/watch?v=1z6rV0uYjOI" target="_blank" rel="noreferrer">YouTube demo ↗</a>
            </div>
          </div>
        </section>

        <section className="achievement-lead reveal">
          <a className="achievement-lead-image" href={`${PG}/leading-the-team.jpg`} target="_blank" rel="noreferrer">
            <Image src={`${PG}/leading-the-team.jpg`} alt="Sakina, in red, leading the team while they wire the sensor board" fill sizes="(max-width: 900px) 94vw, 55vw" />
          </a>
          <div>
            <span className="neon-label">LEADING THE TEAM</span>
            <h2>Getting the best out of every teammate</h2>
            <p>
              I led a team of undergraduate students through 24 hours of building. I split the work by each person&apos;s
              strengths: hardware, the plant server, the website and the phone app. Then I kept everyone moving toward one
              working demo.
            </p>
            <p>
              When something broke, like the venue Wi-Fi blocking our sensor board, we fixed it together and kept going. By
              judging, every part worked end to end, from a real sensor reading to an engineer arriving at the turbine.
            </p>
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
