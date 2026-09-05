"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";

export type DockItem = {
  title: string;
  icon: ReactNode;
  href?: string;
  isMenuTrigger?: boolean;
};

export function FloatingDock({
  items,
  menuOpen,
  onMenuClick,
  onNavigate,
}: {
  items: DockItem[];
  menuOpen: boolean;
  onMenuClick: () => void;
  onNavigate: () => void;
}) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(event) => mouseX.set(event.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="floating-dock"
      data-menu-open={menuOpen}
    >
      {items.map((item) =>
        item.isMenuTrigger ? (
          <DockIcon key={item.title} mouseX={mouseX} item={item} isMenu>
            <button
              type="button"
              className="floating-dock-trigger"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="navbar-overlay"
              onClick={onMenuClick}
            >
              {item.icon}
            </button>
          </DockIcon>
        ) : (
          <DockIcon key={item.title} mouseX={mouseX} item={item}>
            <Link href={item.href!} className="floating-dock-trigger" onClick={onNavigate}>
              {item.icon}
            </Link>
          </DockIcon>
        )
      )}
    </motion.div>
  );
}

function DockIcon({
  mouseX,
  item,
  isMenu,
  children,
}: {
  mouseX: MotionValue<number>;
  item: DockItem;
  isMenu?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return value - bounds.x - bounds.width / 2;
  });

  const sizeSync = useTransform(distance, [-140, 0, 140], [40, 62, 40]);
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 160, damping: 14 });

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      className={`floating-dock-icon${isMenu ? " floating-dock-menu-item" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && <span className="floating-dock-tooltip">{item.title}</span>}
      {children}
    </motion.div>
  );
}
