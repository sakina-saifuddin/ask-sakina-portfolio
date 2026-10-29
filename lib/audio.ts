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
    crtHum(c);
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

// The CRT's horizontal scan whine (15.75 kHz) with a faint mains hum under it.
// Barely audible on purpose; many adults can't hear 15.75 kHz at all.
function crtHum(c: AudioContext) {
  for (const [freq, gain] of [[15750, 0.0035], [120, 0.006], [60, 0.004]] as const) {
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "sine";
    o.frequency.value = freq;
    g.gain.value = gain;
    o.connect(g).connect(master!);
    o.start();
  }
}

// ---- lo-fi beat: drums, chords, bass and vinyl crackle, all synthesized ----------
const BPM = 74;
const STEP = 60 / BPM / 4;
const SWING = 0.14;
// Fmaj7, Em7, Dm9, Cmaj7 as MIDI notes
const CHORDS = [
  [53, 57, 60, 64, 69],
  [52, 55, 59, 62, 67],
  [50, 53, 57, 60, 64],
  [48, 52, 55, 59, 64],
];
let lofiOn = false;
let lofiTimer: ReturnType<typeof setInterval> | undefined;
let lofiBus: GainNode | null = null;
let nextTime = 0;
let stepNo = 0;
let crackle: AudioBufferSourceNode | null = null;

export function isLofi() {
  return lofiOn;
}

const mtof = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

function hit(c: AudioContext, t: number, type: "kick" | "snare" | "hat", vel: number) {
  const bus = lofiBus!;
  if (type === "kick") {
    const o = c.createOscillator();
    const g = c.createGain();
    o.frequency.setValueAtTime(140, t);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.14);
    g.gain.setValueAtTime(0.9 * vel, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.32);
    o.connect(g).connect(bus);
    o.start(t);
    o.stop(t + 0.35);
    return;
  }
  const n = c.createBufferSource();
  n.buffer = noise(c, 0.4, false);
  const f = filter(c, type === "snare" ? "bandpass" : "highpass", type === "snare" ? 1800 : 7500, 0.8);
  const g = c.createGain();
  const len = type === "snare" ? 0.2 : 0.045;
  g.gain.setValueAtTime((type === "snare" ? 0.5 : 0.16) * vel, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + len);
  n.connect(f).connect(g).connect(bus);
  n.start(t);
  n.stop(t + len + 0.02);
}

function chord(c: AudioContext, t: number, notes: number[], dur: number) {
  const bus = lofiBus!;
  const lp = filter(c, "lowpass", 1400, 0.5);
  const g = c.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(0.07, t + 0.08);
  g.gain.exponentialRampToValueAtTime(0.0008, t + dur);
  lp.connect(g).connect(bus);
  for (const m of notes) {
    for (const det of [-6, 6]) {
      const o = c.createOscillator();
      o.type = "triangle";
      o.frequency.value = mtof(m);
      o.detune.value = det;
      o.connect(lp);
      o.start(t);
      o.stop(t + dur + 0.05);
    }
  }
  // bass: root an octave down
  const b = c.createOscillator();
  const bg = c.createGain();
  b.type = "sine";
  b.frequency.value = mtof(notes[0] - 12);
  bg.gain.setValueAtTime(0.0001, t);
  bg.gain.linearRampToValueAtTime(0.28, t + 0.03);
  bg.gain.exponentialRampToValueAtTime(0.001, t + dur * 0.9);
  b.connect(bg).connect(bus);
  b.start(t);
  b.stop(t + dur);
}

function schedule() {
  const c = ctx;
  if (!c || !lofiBus) return;
  while (nextTime < c.currentTime + 0.35) {
    const s = stepNo % 16;
    const bar = Math.floor(stepNo / 16) % CHORDS.length;
    const swing = s % 2 === 1 ? STEP * SWING : 0;
    const t = nextTime + swing;
    if (s === 0) chord(c, t, CHORDS[bar], STEP * 16 * 0.98);
    if (s === 0 || s === 7 || s === 10) hit(c, t, "kick", s === 0 ? 1 : 0.7);
    if (s === 4 || s === 12) hit(c, t, "snare", 0.8 + Math.random() * 0.2);
    if (s % 2 === 0) hit(c, t, "hat", 0.5 + Math.random() * 0.5);
    else if (Math.random() < 0.3) hit(c, t, "hat", 0.3);
    nextTime += STEP;
    stepNo++;
  }
}

export function startLofi() {
  const c = ensure();
  if (!c || !master || lofiOn) return;
  if (!on) start();
  lofiOn = true;
  if (!lofiBus) {
    // tape-y tone: soft low-pass plus a slow pitch-free level sway
    lofiBus = c.createGain();
    const lp = filter(c, "lowpass", 4200, 0.4);
    lofiBus.connect(lp).connect(master);
  }
  lofiBus.gain.cancelScheduledValues(c.currentTime);
  lofiBus.gain.setValueAtTime(0, c.currentTime);
  lofiBus.gain.linearRampToValueAtTime(0.9, c.currentTime + 1.2);
  if (!crackle) {
    crackle = c.createBufferSource();
    const buf = c.createBuffer(1, c.sampleRate * 4, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() < 0.0006 ? (Math.random() * 2 - 1) * 0.8 : 0;
    crackle.buffer = buf;
    crackle.loop = true;
    const g = c.createGain();
    g.gain.value = 0.09;
    crackle.connect(filter(c, "highpass", 1500)).connect(g).connect(lofiBus);
    crackle.start();
  }
  nextTime = c.currentTime + 0.1;
  stepNo = 0;
  clearInterval(lofiTimer);
  lofiTimer = setInterval(schedule, 100);
}

export function stopLofi() {
  lofiOn = false;
  clearInterval(lofiTimer);
  if (ctx && lofiBus) {
    lofiBus.gain.cancelScheduledValues(ctx.currentTime);
    lofiBus.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
  }
}
