import Image from "next/image";
import { Header } from "@/components/Header";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { Footer } from "@/components/Footer";

export default function Certificates() {
  return (
    <>
      <ScrollAnimations />
      <Header />
      <main className="subpage">
        <div className="page-intro reveal">
          <span className="neon-label">CERTIFICATE</span>
          <h1>Certificates<span>.</span></h1>
          <p>Professional learning and technical training completed alongside my academic and project work.</p>
        </div>
        <section className="certificate-single reveal">
          <a className="certificate-image" href="/certificates/nvidia-deep-learning.png" target="_blank" rel="noreferrer">
            <Image src="/certificates/nvidia-deep-learning.png" alt="NVIDIA Getting Started with Deep Learning certificate" fill sizes="(max-width: 900px) 94vw, 68vw" />
          </a>
          <div className="certificate-copy">
            <span>NVIDIA</span>
            <h2>Getting Started with Deep Learning</h2>
            <p>Certificate of Competency</p>
            <p>Issued April 22, 2026</p>
            <a href="/certificates/nvidia-deep-learning.png" target="_blank" rel="noreferrer">View certificate ↗</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
