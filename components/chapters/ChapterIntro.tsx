import Image from "next/image";

export function ChapterIntro() {
  return (
    <section id="intro" className="chapter chapter-intro">
      <div className="chapter-label reveal">
        <span className="chapter-eyebrow">Chapter I</span>
        <span className="chapter-eyebrow-title">Introduction</span>
      </div>

      <div className="intro-grid">
        <div className="intro-copy reveal">
          <h1 className="intro-name">Sakina Saifuddin</h1>
          <p className="intro-statement">AI, data, software, and automation — built with curiosity and intention.</p>
        </div>

        <div className="intro-portrait reveal">
          <Image src="/profile.jpg" alt="Sakina Saifuddin" fill priority sizes="(max-width: 900px) 92vw, 46vw" />
        </div>
      </div>

      <p className="intro-quote reveal">Systems for impact. Code for curiosity.</p>
    </section>
  );
}
