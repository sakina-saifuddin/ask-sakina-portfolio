"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { technologyGroups } from "@/data/portfolio";

type Mode = "peek" | "expanded";
type ActiveState = { index: number; mode: Mode } | null;

const SPRING = { type: "spring", stiffness: 300, damping: 32, mass: 0.8 } as const;
const FLAP_SPRING = { type: "spring", stiffness: 220, damping: 28, mass: 0.9 } as const;

function FolderChip({ name, icon }: { name: string; icon: string }) {
  const [failed, setFailed] = useState(false);
  const hasLogo = Boolean(icon) && !failed;

  return (
    <div className={`folder-chip ${hasLogo ? "" : "folder-chip-text-only"}`}>
      {hasLogo && (
        <img src={icon} alt="" className="folder-chip-icon" onError={() => setFailed(true)} />
      )}
      <span>{name}</span>
    </div>
  );
}

function Folder({
  title,
  items,
  index,
  active,
  isTouch,
  onActivate,
  onDeactivate,
}: {
  title: string;
  items: { name: string; icon: string }[];
  index: number;
  active: ActiveState;
  isTouch: boolean;
  onActivate: (index: number, mode: Mode) => void;
  onDeactivate: () => void;
}) {
  const mode = active?.index === index ? active.mode : null;
  const n = items.length;
  const mid = (n - 1) / 2;

  function handleClick(event: React.MouseEvent) {
    event.stopPropagation();
    if (isTouch) {
      if (mode) onDeactivate();
      else onActivate(index, "expanded");
    } else {
      onActivate(index, "expanded");
    }
  }

  return (
    <div
      className="folder"
      data-mode={mode ?? "closed"}
      onMouseEnter={() => !isTouch && onActivate(index, "peek")}
      onMouseLeave={() => !isTouch && onDeactivate()}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleClick(event as unknown as React.MouseEvent);
        }
      }}
    >
      <div className="folder-shape">
        <div className="folder-back" />

        <div className="folder-cards">
          {items.map((item, i) => {
            const offset = i - mid;
            const isPeek = mode === "peek";
            const isExpanded = mode === "expanded";

            const cols = Math.min(n, 3);
            const row = Math.floor(i / cols);
            const colIndexInRow = i - row * cols;
            const itemsInRow = Math.min(cols, n - row * cols);
            const rowMid = (itemsInRow - 1) / 2;
            const colOffset = colIndexInRow - rowMid;

            const x = isExpanded ? colOffset * 120 : isPeek ? offset * 22 : 0;
            const y = isExpanded ? -104 - row * 76 : isPeek ? -38 : 0;
            const rotate = isExpanded ? 0 : isPeek ? offset * 6 : 0;
            const scale = mode ? 1 : 0.8;
            const opacity = mode ? 1 : 0;

            return (
              <motion.div
                key={item.name}
                className="folder-card-slot"
                style={{ zIndex: 20 + i }}
                initial={false}
                animate={{ x, y, rotate, scale, opacity }}
                transition={SPRING}
              >
                <FolderChip name={item.name} icon={item.icon} />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="folder-front"
          initial={false}
          animate={{ rotateX: mode === "expanded" ? -22 : mode === "peek" ? -9 : 0 }}
          transition={FLAP_SPRING}
        />
        <div className="folder-tab" />
      </div>

      <span className="folder-title">{title}</span>
      <span className="folder-count">{n} tools</span>
    </div>
  );
}

export function FolderTools() {
  const [active, setActive] = useState<ActiveState>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    setIsTouch(mq.matches);
    const handler = (event: MediaQueryListEvent) => setIsTouch(event.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="folders-canvas" onClick={() => isTouch && setActive(null)}>
      <div className="folders-heading">
        <span>Folio — Edition</span>
        <h2>Tools I Build With</h2>
      </div>

      <div className="folders-grid">
        {technologyGroups.map((group, index) => (
          <Folder
            key={group.title}
            title={group.title}
            items={group.items}
            index={index}
            active={active}
            isTouch={isTouch}
            onActivate={(i, mode) => setActive({ index: i, mode })}
            onDeactivate={() => setActive(null)}
          />
        ))}
      </div>
    </div>
  );
}
