"use client";

import { useRef, useState, type RefObject } from "react";
import { motion } from "framer-motion";

const tools = [
  { name: "Python", icon: "https://cdn.simpleicons.org/python" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript" },
  { name: "React", icon: "https://cdn.simpleicons.org/react" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs" },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git" },
  { name: "PyTorch", icon: "https://cdn.simpleicons.org/pytorch" },
  { name: "TensorFlow", icon: "https://cdn.simpleicons.org/tensorflow" },
  { name: "Scikit-learn", icon: "https://cdn.simpleicons.org/scikitlearn" },
  { name: "OpenCV", icon: "https://cdn.simpleicons.org/opencv" },
  { name: "OpenAI", icon: "https://cdn.simpleicons.org/openai" },
  { name: "SQL", icon: "https://cdn.simpleicons.org/postgresql" },
  { name: "Power BI", icon: "/tech/power-bi.svg" },
  { name: "Tableau", icon: "/tech/tableau.svg" },
  { name: "AWS", icon: "/tech/aws.svg" },
];

// fixed scatter offsets, kept within a ~320px radius so the pile stays
// visible even on the narrowest mobile viewport
const layout = [
  { x: -95, y: -55, rotate: -12 },
  { x: -50, y: 35, rotate: 9 },
  { x: 10, y: -70, rotate: -7 },
  { x: 70, y: 25, rotate: 15 },
  { x: -120, y: 65, rotate: 5 },
  { x: 35, y: 80, rotate: -11 },
  { x: 105, y: -35, rotate: 10 },
  { x: -25, y: -100, rotate: -4 },
  { x: 130, y: 50, rotate: -15 },
  { x: -140, y: -15, rotate: 12 },
  { x: 80, y: -90, rotate: 6 },
  { x: -70, y: 100, rotate: -9 },
  { x: 145, y: -75, rotate: 14 },
  { x: -130, y: 110, rotate: -6 },
  { x: 20, y: 0, rotate: 3 },
  { x: -10, y: -20, rotate: -3 },
];

function ToolCard({
  name,
  icon,
  offset,
  containerRef,
}: {
  name: string;
  icon: string;
  offset: { x: number; y: number; rotate: number };
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <motion.div
      className="tool-card"
      style={{ x: offset.x, y: offset.y, rotate: offset.rotate }}
      drag
      dragConstraints={containerRef}
      dragElastic={0.55}
      dragMomentum
      whileDrag={{ scale: 1.1, zIndex: 60, boxShadow: "0 24px 48px rgba(0,0,0,.4)" }}
      whileHover={{ scale: 1.04 }}
    >
      {!failed ? (
        <img
          src={icon}
          alt={`${name} logo`}
          draggable={false}
          className="tool-card-icon"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="tool-card-fallback">{name.slice(0, 2).toUpperCase()}</span>
      )}
      <span className="tool-card-label">{name}</span>
    </motion.div>
  );
}

export function DraggableTools() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="tools-canvas" ref={containerRef}>
      <div className="tools-reveal-text" aria-hidden="true">
        <p>
          Systems for impact.
          <br />
          Code for curiosity.
        </p>
      </div>

      <span className="tools-instruction">Drag each card away →</span>

      {tools.map((tool, i) => (
        <ToolCard
          key={tool.name}
          name={tool.name}
          icon={tool.icon}
          offset={layout[i % layout.length]}
          containerRef={containerRef}
        />
      ))}
    </div>
  );
}
