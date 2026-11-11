
import { PIANO_NOTES } from "../utils/pianoNotes";
import { PianoKey } from "./PianoKey";

export default function Piano({
  pressed,
  onNoteOn,
  onNoteOff,
}) {
  return (
    <section aria-label="88-key piano">
      <div className="piano-scroll">
        <div className="piano-keyboard">
          {PIANO_NOTES.map((note) => (
            <PianoKey
              key={note.midi}
              midi={note.midi}
              noteName={note.noteName}
              isBlack={note.isBlack}
              isPressed={pressed.has(note.midi)}
              onNoteOn={onNoteOn}
              onNoteOff={onNoteOff}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
