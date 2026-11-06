
export const DRUM_PADS = [
  { id: "kick", key: "W", code: "KeyW", name: "Kick" },
  { id: "snare", key: "A", code: "KeyA", name: "Snare" },
  { id: "hihat", key: "S", code: "KeyS", name: "Hi-Hat" },
  { id: "clap", key: "D", code: "KeyD", name: "Clap" },
  { id: "tom1", key: "J", code: "KeyJ", name: "High Tom" },
  { id: "tom2", key: "K", code: "KeyK", name: "Low Tom" },
  { id: "crash", key: "L", code: "KeyL", name: "Crash" },
];

export const PAD_MAP = new Map(
  DRUM_PADS.map((pad) => [pad.code, pad])
);
