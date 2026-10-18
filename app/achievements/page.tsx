import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { HorizontalTrack } from "@/components/HorizontalTrack";

export const metadata = { title: "Achievements — Sakina Saifuddin" };

const PG = "/project-evidence/powerguard360";
const DEVPOST = "https://devpost.com/software/power-guard-360";
const YOUTUBE = "https://www.youtube.com/watch?v=1z6rV0uYjOI";

const stats = [
  { value: "2nd", label: "place" },
  { value: "70+", label: "teams" },
  { value: "$500", label: "cash prize" },
  { value: "24", label: "hours" },
];

const photos = [
  { title: "Pitching to the judges", src: `${PG}/pitching-to-judges.jpg`, position: "85% center" },
  { title: "Presenting the demo", src: `${PG}/presenting-demo.jpg` },
  { title: "The live sensor board", src: `${PG}/hw-1-sensor-board-setup.jpg` },
  { title: "Our physical model", src: `${PG}/hw-7-physical-model.jpg` },
];

export default function Achievements() {
  return (
    <>
      <Header />
      <main>
        <HorizontalTrack>
          <section className="hz-panel achp-panel achp-hero" data-nav-theme="dark" data-panel-id="ach-hero">
            <div className="achp-copy">
              <span className="achp-eyebrow">Achievement · CodeRED Orion · Oct 11, 2026</span>
              <h1 className="achp-title">2nd place at CodeRED Orion</h1>
              <p className="achp-text">
                CodeRED Orion is the University of Houston&apos;s biggest hackathon. Competing against more than 70 teams, I
                led our team to 2nd place and a $500 cash prize for Best Pitch/Demo with Power Guard 360: machine learning
                that predicts power plant failures before they cut power to an AI data center.
              </p>
              <div className="achp-stats">
                {stats.map((s) => (
                  <div key={s.label}>
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="achp-links">
                <Link href="/book/power-guard-360">Read the project book →</Link>
                <a href={DEVPOST} target="_blank" rel="noreferrer">Devpost ↗</a>
                <a href="https://powerguard360.us/" target="_blank" rel="noreferrer">Live website ↗</a>
              </div>
            </div>
            <figure className="achp-figure achp-hero-photo">
              <div className="achp-frame">
                <Image src={`${PG}/award-500-best-pitch.jpg`} alt="Sakina and the Power Guard 360 team on stage holding the $500 Best Pitch prize check" fill priority sizes="(max-width: 900px) 92vw, 52vw" />
              </div>
              <figcaption>On stage with the $500 Best Pitch/Demo prize.</figcaption>
            </figure>
          </section>

          <section className="hz-panel achp-panel achp-lead achp-light" data-nav-theme="light" data-panel-id="ach-lead">
            <figure className="achp-figure achp-lead-photo">
              <div className="achp-frame">
                <Image src={`${PG}/leading-the-team.jpg`} alt="Sakina, in red, leading the team while they wire the sensor board" fill sizes="(max-width: 900px) 92vw, 48vw" />
              </div>
              <figcaption>Leading the team through the build.</figcaption>
            </figure>
            <div className="achp-copy">
              <span className="achp-eyebrow">Leading the team</span>
              <h2 className="achp-title">Getting the best out of every teammate</h2>
              <p className="achp-text">
                I led a team of undergraduate students through 24 hours of building. I split the work by each person&apos;s
                strengths: hardware, the plant server, the website and the phone app. Then I kept everyone moving toward one
                working demo.
              </p>
              <p className="achp-text">
                When something broke, like the venue Wi-Fi blocking our sensor board, we fixed it together and kept going. By
                judging, every part worked end to end, from a real sensor reading to an engineer arriving at the turbine.
              </p>
            </div>
          </section>

          <section className="hz-panel achp-panel achp-demo" data-nav-theme="dark" data-panel-id="ach-demo">
            <div className="achp-copy">
              <span className="achp-eyebrow">The demo</span>
              <h2 className="achp-title">See Power Guard 360 in action</h2>
              <p className="achp-text">
                A live sensor board, a 3D digital twin of the plant, and a model that flags failing turbines and explains why.
              </p>
              <div className="achp-links">
                <a href={YOUTUBE} target="_blank" rel="noreferrer">Watch on YouTube ↗</a>
              </div>
            </div>
            <div className="achp-video">
              <iframe
                src="https://www.youtube-nocookie.com/embed/1z6rV0uYjOI"
                title="Power Guard 360 demo"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </section>

          <section className="hz-panel achp-panel achp-day achp-light" data-nav-theme="light" data-panel-id="ach-day">
            <div className="achp-day-head">
              <span className="achp-eyebrow">On the day</span>
              <h2 className="achp-title">From the build to the stage</h2>
            </div>
            <div className="achp-day-grid">
              {photos.map((p) => (
                <figure className="achp-figure" key={p.title}>
                  <a className="achp-frame" href={p.src} target="_blank" rel="noreferrer">
                    <Image src={p.src} alt={p.title} fill sizes="(max-width: 900px) 92vw, 22vw" style={p.position ? { objectPosition: p.position } : undefined} />
                  </a>
                  <figcaption>{p.title}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        </HorizontalTrack>
      </main>
    </>
  );
}
