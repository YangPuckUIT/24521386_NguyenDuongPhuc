
export const DRUM_PADS = [
  {
    id: "kick",
    key: "W",
    code: "KeyW",
    name: "Kick",
    sound: "/sounds/kick.wav",
  },
  {
    id: "snare",
    key: "A",
    code: "KeyA",
    name: "Snare",
    sound: "/sounds/snare.wav",
  },
  {
    id: "hihat",
    key: "S",
    code: "KeyS",
    name: "Hi-Hat",
    sound: "/sounds/hihat.wav",
  },
  {
    id: "clap",
    key: "D",
    code: "KeyD",
    name: "Clap",
    sound: "/sounds/clap.wav",
  },
  {
    id: "tom1",
    key: "J",
    code: "KeyJ",
    name: "High Tom",
    sound: "/sounds/tom1.wav",
  },
  {
    id: "tom2",
    key: "K",
    code: "KeyK",
    name: "Low Tom",
    sound: "/sounds/tom2.wav",
  },
  {
    id: "crash",
    key: "L",
    code: "KeyL",
    name: "Crash",
    sound: "/sounds/crash.wav",
  },
];

export const PAD_MAP = new Map(
  DRUM_PADS.map((pad) => [pad.code, pad])
);

export const PAD_ID_MAP = new Map(
  DRUM_PADS.map((pad) => [pad.id, pad])
);
