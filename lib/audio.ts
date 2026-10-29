// All sound is synthesized with WebAudio, so there are no audio files to license.
// Nothing runs until the visitor chooses SOUND ON (browsers need a gesture anyway).

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let started = false;
let on = false;
let thunderTimer: ReturnType<typeof setTimeout> | undefined;

function ensure(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function noise(c: AudioContext, seconds: number, brown: boolean) {
  const buf = c.createBuffer(1, Math.floor(c.sampleRate * seconds), c.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < d.length; i++) {
    const w = Math.random() * 2 - 1;
    if (brown) {
      last = (last + 0.02 * w) / 1.02;
      d[i] = last * 3.5;
    } else {
      d[i] = w;
    }
  }
  return buf;
}

function loop(c: AudioContext, buf: AudioBuffer, filters: BiquadFilterNode[], gain: number) {
  const src = c.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  const g = c.createGain();
  g.gain.value = gain;
  let node: AudioNode = src;
  for (const f of filters) {
    node.connect(f);
    node = f;
  }
  node.connect(g);
  g.connect(master!);
  src.start();
}

function filter(c: AudioContext, type: BiquadFilterType, freq: number, q = 0.7) {
  const f = c.createBiquadFilter();
  f.type = type;
  f.frequency.value = freq;
  f.Q.value = q;
  return f;
}

export function isOn() {
  return on;
}

export function start() {
  const c = ensure();
  if (!c || !master) return;
  on = true;
  if (!started) {
    started = true;
    // Rain on glass: bright hiss + a low rumble underneath.
    loop(c, noise(c, 4, false), [filter(c, "highpass", 900), filter(c, "lowpass", 9000)], 0.05);
    loop(c, noise(c, 6, true), [filter(c, "lowpass", 500)], 0.35);
    scheduleThunder();
  }
  master.gain.cancelScheduledValues(c.currentTime);
  master.gain.linearRampToValueAtTime(0.9, c.currentTime + 1.6);
}

export function stop() {
  on = false;
  if (!ctx || !master) return;
  master.gain.cancelScheduledValues(ctx.currentTime);
  master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
}

function scheduleThunder() {
  clearTimeout(thunderTimer);
  thunderTimer = setTimeout(() => {
    if (on) thunder();
    scheduleThunder();
  }, 30000 + Math.random() * 40000);
}

export function thunder() {
  const c = ensure();
  if (!c || !master || !on) return;
  const src = c.createBufferSource();
  src.buffer = noise(c, 5, true);
  const f = filter(c, "lowpass", 160);
  const g = c.createGain();
  const t = c.currentTime;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(1.4, t + 0.4);
  g.gain.exponentialRampToValueAtTime(0.001, t + 4.5);
  src.connect(f).connect(g).connect(master);
  src.start(t);
  src.stop(t + 5);
}

// Tape going into / out of the VCR.
export function clunk() {
  const c = ensure();
  if (!c || !master || !on) return;
  const t = c.currentTime;
  const o = c.createOscillator();
  const og = c.createGain();
  o.type = "sine";
  o.frequency.setValueAtTime(130, t);
  o.frequency.exponentialRampToValueAtTime(48, t + 0.18);
  og.gain.setValueAtTime(0.5, t);
  og.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
  o.connect(og).connect(master);
  o.start(t);
  o.stop(t + 0.25);

  const n = c.createBufferSource();
  n.buffer = noise(c, 0.3, false);
  const ng = c.createGain();
  ng.gain.setValueAtTime(0.25, t);
  ng.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
  n.connect(filter(c, "bandpass", 1800, 1.2)).connect(ng).connect(master);
  n.start(t);
  n.stop(t + 0.3);
  whirr(0.15);
}

// VCR mechanism spinning up.
export function whirr(delay = 0) {
  const c = ensure();
  if (!c || !master || !on) return;
  const t = c.currentTime + delay;
  const n = c.createBufferSource();
  n.buffer = noise(c, 1.4, false);
  const f = filter(c, "bandpass", 700, 4);
  f.frequency.setValueAtTime(500, t);
  f.frequency.linearRampToValueAtTime(1500, t + 0.9);
  const g = c.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(0.12, t + 0.15);
  g.gain.linearRampToValueAtTime(0, t + 1.2);
  n.connect(f).connect(g).connect(master);
  n.start(t);
  n.stop(t + 1.4);
}

export function blip(freq = 880) {
  const c = ensure();
  if (!c || !master || !on) return;
  const t = c.currentTime;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = "square";
  o.frequency.value = freq;
  g.gain.setValueAtTime(0.05, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
  o.connect(g).connect(master);
  o.start(t);
  o.stop(t + 0.07);
}
