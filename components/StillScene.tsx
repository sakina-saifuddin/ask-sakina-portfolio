"use client";

import { RoomCanvas } from "./RoomCanvas";

// Non-interactive copy of the desk for the plain page: same layers, no rain or parallax.
export function StillScene() {
  return (
    <>
      <img src="/room/far.webp" alt="" />
      <img src="/room/near.webp" alt="" />
      <RoomCanvas />
    </>
  );
}
