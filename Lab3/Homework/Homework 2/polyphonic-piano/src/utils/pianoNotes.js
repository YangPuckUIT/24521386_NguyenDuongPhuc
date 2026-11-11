
const NOTE_NAMES = [
  "C", "C#", "D", "D#", "E", "F",
  "F#", "G", "G#", "A", "A#", "B",
];

export const PIANO_NOTES = Array.from(
  { length: 88 },
  (_, index) => {
    const midi = index + 21;
    const pitch = NOTE_NAMES[midi % 12];
    const octave = Math.floor(midi / 12) - 1;

    return {
      midi,
      noteName: `${pitch}${octave}`,
      freqHz: 440 * 2 ** ((midi - 69) / 12),
      isBlack: pitch.includes("#"),
    };
  }
);
