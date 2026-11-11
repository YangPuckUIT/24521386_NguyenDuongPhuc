
import { memo } from "react";

export const PianoKey = memo(function PianoKey({
  midi,
  noteName,
  isBlack,
  isPressed,
  onNoteOn,
  onNoteOff,
}) {
  return (
    <button
      type="button"
      className={`piano-key ${
        isBlack ? "black" : "white"
      } ${isPressed ? "pressed" : ""}`}
      aria-label={`${noteName} piano key`}
      aria-pressed={isPressed}
      onPointerDown={(event) => {
        if (event.button !== 0) return;

        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        onNoteOn(midi);
      }}
      onPointerUp={() => onNoteOff(midi)}
      onPointerCancel={() => onNoteOff(midi)}
      onLostPointerCapture={() => onNoteOff(midi)}
      onKeyDown={(event) => {
        if (event.repeat) return;

        if (event.code === "Space" || event.code === "Enter") {
          event.preventDefault();
          onNoteOn(midi);
        }
      }}
      onKeyUp={(event) => {
        if (event.code === "Space" || event.code === "Enter") {
          event.preventDefault();
          onNoteOff(midi);
        }
      }}
    >
      <span>{noteName}</span>
    </button>
  );
});
