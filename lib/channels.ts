// The five "tapes" on the desk. Each tape is also a numbered button on the TV.
export const CHANNELS = [
  { id: "about", n: 1, spine: "ABOUT ME", color: "#e0b24a" },
  { id: "work", n: 2, spine: "WORK 2021—NOW", color: "#d9604c" },
  { id: "projects", n: 3, spine: "PROJECTS", color: "#4c8fd9" },
  { id: "tools", n: 4, spine: "TOOLS & STACK", color: "#58b985" },
  { id: "online", n: 5, spine: "SAY HELLO", color: "#b172d6" },
] as const;

export type ChannelId = (typeof CHANNELS)[number]["id"];

// Place an element on the 1600x900 stage using stage units.
export const u = (x: number, y: number, w: number, h: number) => ({
  left: `${(x / 16).toFixed(4)}%`,
  top: `${(y / 9).toFixed(4)}%`,
  width: `${(w / 16).toFixed(4)}%`,
  height: `${(h / 9).toFixed(4)}%`,
});

// Where the TV screen sits on the stage (used by the camera and the overlay).
export const SCREEN = { x: 562, y: 242, w: 380, h: 285 };
