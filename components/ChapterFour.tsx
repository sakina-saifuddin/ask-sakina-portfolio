"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { profile } from "@/data/portfolio";
import { usePanelEntered } from "@/components/usePanelEntered";

const EASE = [0.16, 1, 0.3, 1] as const;

type Organization = (typeof profile.organizations)[number];

const logoStyle: Record<string, { objectFit: "contain" | "cover"; objectPosition?: string; transform?: string }> = {
  "The Walnut Agency": { objectFit: "cover", objectPosition: "left center" },
  SoftSyncDev: { objectFit: "contain", transform: "scale(1.6)" },
};

export function ChapterFour() {
  const [active, setActive] = useState<Organization | null>(null);
  const entered = usePanelEntered("chapter-four");

  return (
    <section className="hz-panel hz-panel-experience" data-nav-theme="light" data-panel-id="chapter-four">
      <span className="exp-chapter-label">Chapter IV</span>

      <div className="exp-list-wrap">
        <span className="exp-eyebrow">Selected Experience</span>
        <ul className="exp-list">
          {profile.organizations.map((org, index) => (
            <motion.li
              key={org.name}
              className="exp-list-row"
              initial={{ opacity: 0, y: 30 }}
              animate={entered ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
            >
              <a
                href={org.href}
                target="_blank"
                rel="noreferrer"
                className={`exp-list-item${active?.name === org.name ? " is-active" : ""}`}
                onMouseEnter={() => setActive(org)}
                onMouseLeave={() => setActive(null)}
              >
                {active?.name === org.name && (
                  <motion.span
                    className="exp-row-preview"
                    initial={{ opacity: 0, x: -40, y: "-50%" }}
                    animate={{ opacity: 1, x: 0, y: "-50%" }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <Image
                      src={org.logo}
                      alt={org.name}
                      fill
                      sizes="200px"
                      style={{
                        objectFit: logoStyle[org.name]?.objectFit ?? "contain",
                        objectPosition: logoStyle[org.name]?.objectPosition ?? "center",
                        transform: logoStyle[org.name]?.transform,
                      }}
                    />
                  </motion.span>
                )}
                {org.name}
              </a>
            </motion.li>
          ))}
          <motion.li
            className="exp-list-row"
            initial={{ opacity: 0, y: 30 }}
            animate={entered ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, ease: EASE, delay: profile.organizations.length * 0.08 }}
          >
            <span className="exp-list-item exp-list-item-static">And more</span>
          </motion.li>
        </ul>
      </div>

      <p className="exp-footnote">Work spanning healthcare, finance, retail, and marketing teams.</p>
    </section>
  );
}
