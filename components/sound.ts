"use client";

let sharedAudioCtx: AudioContext | null = null;
let unlockAttached = false;

export function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!sharedAudioCtx) sharedAudioCtx = new Ctor();
  return sharedAudioCtx;
}

export function attachAudioUnlock() {
  if (typeof window === "undefined" || unlockAttached) return;
  unlockAttached = true;

  function unlock() {
    const ctx = getAudioContext();
    if (ctx) {
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      // iOS Safari keeps audio output silent until a sound is actually started
      // synchronously inside the gesture, even after resume() resolves — so
      // play an inaudible buffer right here to fully unlock the output path.
      try {
        const buffer = ctx.createBuffer(1, 1, 22050);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start(0);
      } catch {}
    }
    window.removeEventListener("pointerdown", unlock);
    window.removeEventListener("keydown", unlock);
    window.removeEventListener("touchstart", unlock);
  }

  window.addEventListener("pointerdown", unlock);
  window.addEventListener("keydown", unlock);
  window.addEventListener("touchstart", unlock, { passive: true });
}

async function ensureRunning(ctx: AudioContext): Promise<boolean> {
  if (ctx.state === "suspended") {
    try {
      await ctx.resume();
    } catch {
      return false;
    }
  }
  return ctx.state === "running";
}

export async function playTypewriterTick() {
  const ctx = getAudioContext();
  if (!ctx || !(await ensureRunning(ctx))) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "square";
  osc.frequency.setValueAtTime(1500 + Math.random() * 300, now);
  osc.frequency.exponentialRampToValueAtTime(500, now + 0.02);

  gain.gain.setValueAtTime(0.05, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.03);
}

export async function playWheelTick() {
  const ctx = getAudioContext();
  if (!ctx || !(await ensureRunning(ctx))) return;

  const now = ctx.currentTime;

  // Short filtered noise burst reads as a mechanical ratchet click,
  // like a wheel-of-fortune peg snapping past a pawl.
  const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * 0.03));
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const bandpass = ctx.createBiquadFilter();
  bandpass.type = "bandpass";
  bandpass.frequency.setValueAtTime(1800, now);
  bandpass.Q.value = 1.2;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.55, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

  noise.connect(bandpass);
  bandpass.connect(gain);
  gain.connect(ctx.destination);
  noise.start(now);
}
