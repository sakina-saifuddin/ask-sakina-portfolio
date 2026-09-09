"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { profile } from "@/data/portfolio";

const EASE = [0.16, 1, 0.3, 1] as const;

const interests = [
  { label: "Long drives", image: "/interests/driving.png" },
  { label: "Food", image: "/interests/food.jfif" },
  { label: "Fashion", image: "/interests/fashion.jfif" },
  { label: "Dancing", image: "/interests/dancing.jfif" },
];

function EyePair() {
  const containerRef = useRef<HTMLDivElement>(null);

  const leftX = useMotionValue(0);
  const leftY = useMotionValue(0);
  const rightX = useMotionValue(0);
  const rightY = useMotionValue(0);

  const springOpts = { stiffness: 260, damping: 20, mass: 0.3 };
  const leftXs = useSpring(leftX, springOpts);
  const leftYs = useSpring(leftY, springOpts);
  const rightXs = useSpring(rightX, springOpts);
  const rightYs = useSpring(rightY, springOpts);

  useEffect(() => {
    const maxShift = 5;

    function onMouseMove(event: MouseEvent) {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (event.clientX - cx) / (window.innerWidth / 2);
      const dy = (event.clientY - cy) / (window.innerHeight / 2);
      const clampedX = Math.max(-1, Math.min(1, dx)) * maxShift;
      const clampedY = Math.max(-1, Math.min(1, dy)) * maxShift;
      leftX.set(clampedX);
      leftY.set(clampedY);
      rightX.set(clampedX);
      rightY.set(clampedY);
    }

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [leftX, leftY, rightX, rightY]);

  return (
    <div className="duo-eyes" ref={containerRef} aria-hidden="true">
      <motion.span className="duo-eye duo-eye-left" style={{ x: leftXs, y: leftYs }} />
      <motion.span className="duo-eye duo-eye-right" style={{ x: rightXs, y: rightYs }} />
    </div>
  );
}

export function ChapterOneRedesign() {
  return (
    <section className="duo-hero">
      <div className="duo-name-layer" aria-hidden="true">
        <span className="duo-name-line duo-name-top">Sakina</span>
        <span className="duo-name-line duo-name-bottom">Saifuddin</span>
      </div>

      <motion.div
        className="duo-interests"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
      >
        {interests.map((interest, index) => (
          <motion.div
            className="duo-interest-item"
            key={interest.label}
            initial={{ opacity: 0, y: -16, rotate: index % 2 === 0 ? -8 : 8 }}
            animate={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -6 : 6 }}
            whileHover={{ y: -6, rotate: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.4 + index * 0.08 }}
          >
            <Image src={interest.image} alt={interest.label} fill sizes="72px" style={{ objectFit: "cover" }} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="duo-head-frame"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: EASE }}
      >
        <Image
          src="/pic3.JPG"
          alt="Sakina Saifuddin"
          fill
          sizes="480px"
          priority
          style={{ objectFit: "cover", objectPosition: "50% 18%", transform: "scale(1.55)" }}
        />
        <EyePair />
      </motion.div>

      <motion.div
        className="duo-quote"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
      >
        <span className="duo-quote-eyebrow">Quick Intro</span>
        <p>
          &ldquo;Work for money.
          <br />
          Data for love.&rdquo;
        </p>
      </motion.div>

      <motion.div
        className="duo-intro"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
      >
        Hi, I&rsquo;m Sakina — I work across AI, data, software, and automation, building systems that are
        useful, clear, and impactful.
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.65 }}
      >
        <Link href="/about" className="duo-cta">
          More about me
        </Link>
      </motion.div>

      <div className="duo-footer-row">
        <span>{profile.location}</span>
        <span>Open for early-career roles</span>
      </div>
    </section>
  );
}
