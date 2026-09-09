"use client";

import { motion } from "framer-motion";

export function HeaderWordsReveal({
  text,
  active,
  stagger = 0.05,
}: {
  text: string;
  active: boolean;
  stagger?: number;
}) {
  const words = text.split(" ");

  return (
    <>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          style={{ display: "inline-block" }}
          initial={{ opacity: 0, y: 10 }}
          animate={active ? { opacity: 1, y: 0 } : undefined}
          transition={{ type: "spring", duration: 2, bounce: 0, delay: index * stagger }}
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </>
  );
}
