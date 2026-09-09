"use client";

import { useRef, useState } from "react";
import type { MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useAnimate } from "framer-motion";
import { technologyGroups } from "@/data/portfolio";
import { usePanelEntered } from "@/components/usePanelEntered";

const EASE = [0.16, 1, 0.3, 1] as const;
const BOUNCE = { type: "spring", stiffness: 300, damping: 15, mass: 0.6 } as const;

type ToolItem = { name: string; icon: string; blurb: string };

function ToolIcon({ item, className }: { item: ToolItem; className: string }) {
  const [failed, setFailed] = useState(false);
  const hasLogo = Boolean(item.icon) && !failed;

  if (!hasLogo) {
    return (
      <span className={`${className} stack-icon-text-only`}>
        {item.name.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return (
    <img
      src={item.icon}
      alt=""
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function TiltStackRow({
  item,
  onSelect,
  entered,
  index,
}: {
  item: ToolItem;
  onSelect: () => void;
  entered: boolean;
  index: number;
}) {
  const [scope, animateScope] = useAnimate<HTMLButtonElement>();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 220, damping: 16, mass: 0.4 });
  const springY = useSpring(rotateY, { stiffness: 220, damping: 16, mass: 0.4 });

  function handleMouseMove(event: MouseEvent<HTMLButtonElement>) {
    const el = scope.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 16);
    rotateX.set(py * -16);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  function handleClick() {
    animateScope(scope.current, { scale: [1, 1.16, 0.92, 1.04, 1] }, { duration: 0.5, ease: "easeOut" });
    onSelect();
  }

  return (
    <motion.button
      ref={scope}
      type="button"
      className="stack-row"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 500 }}
      initial={{ opacity: 0, y: 24 }}
      animate={entered ? { opacity: 1, y: 0 } : undefined}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      transition={{
        opacity: { duration: 0.5, delay: index * 0.05, ease: EASE },
        y: { duration: 0.5, delay: index * 0.05, ease: EASE },
        scale: { type: "spring", stiffness: 260, damping: 18 },
      }}
    >
      <span className="stack-row-icon-wrap">
        <ToolIcon item={item} className="stack-row-icon" />
      </span>
      <span className="stack-row-name">{item.name}</span>
    </motion.button>
  );
}

export function ToolStackGrid() {
  const [active, setActive] = useState<ToolItem | null>(null);
  const entered = usePanelEntered("chapter-one-stack");
  let rowIndex = 0;

  return (
    <div className="stack-canvas">
      <motion.div
        className="stack-heading"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <span>Folio — Edition</span>
        <h2>The Stack</h2>
      </motion.div>

      <div className="stack-grid">
        {technologyGroups.map((group) => (
          <div className="stack-column" key={group.title}>
            <span className="stack-column-title">{group.title}</span>

            {group.items.map((item) => {
              const index = rowIndex++;
              return (
                <TiltStackRow
                  key={item.name}
                  item={item}
                  entered={entered}
                  index={index}
                  onSelect={() => setActive(item)}
                />
              );
            })}
          </div>
        ))}
      </div>

      {active && (
        <div className="stack-backdrop" onClick={() => setActive(null)}>
          <motion.div
            className="stack-detail-card"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={BOUNCE}
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="stack-detail-close" onClick={() => setActive(null)} aria-label="Close">
              ✕
            </button>

            <span className="stack-detail-icon-wrap">
              <ToolIcon item={active} className="stack-detail-icon" />
            </span>

            <span className="stack-detail-name">{active.name}</span>

            <span className="stack-detail-category">
              {technologyGroups.find((g) => g.items.includes(active))?.title}
            </span>

            <p className="stack-detail-blurb">{active.blurb}</p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
