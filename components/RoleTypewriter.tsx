"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type RoleItem = { label: string; description: string };

const TYPE_MS = 55;
const DELETE_MS = 32;
const HOLD_MS = 1800;
const GAP_MS = 250;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function RoleTypewriter({ roles }: { roles: RoleItem[] }) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(isReduced);

    if (isReduced) {
      setText(roles[0]?.label ?? "");
      setShowDescription(true);
      return;
    }

    let cancelled = false;

    async function run() {
      while (!cancelled) {
        for (let i = 0; i < roles.length; i++) {
          const role = roles[i];
          setIndex(i);
          setShowDescription(false);

          for (let c = 1; c <= role.label.length; c++) {
            if (cancelled) return;
            setText(role.label.slice(0, c));
            await sleep(TYPE_MS);
          }

          if (cancelled) return;
          setShowDescription(true);
          await sleep(HOLD_MS);

          for (let c = role.label.length - 1; c >= 0; c--) {
            if (cancelled) return;
            setText(role.label.slice(0, c));
            await sleep(DELETE_MS);
          }

          setShowDescription(false);
          if (cancelled) return;
          await sleep(GAP_MS);
        }
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [roles]);

  const current = roles[index];

  return (
    <div className="role-typewriter">
      <p className="role-typewriter-line">
        Hi, I&apos;m{" "}
        <span className="role-typewriter-word">
          {text}
          {!reduced && <span className="typewriter-cursor" data-done={text === current?.label}>|</span>}
        </span>
      </p>
      <div className="role-typewriter-desc-slot">
        <AnimatePresence mode="wait">
          {showDescription && current && (
            <motion.p
              key={current.label}
              className="role-typewriter-desc"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {current.description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
