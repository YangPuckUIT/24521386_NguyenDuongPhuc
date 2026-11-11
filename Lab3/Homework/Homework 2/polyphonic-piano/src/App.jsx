
import { useCallback, useEffect, useRef, useState } from "react";
import Piano from "./components/Piano";
import { PolyphonicSynth } from "./audio/PolyphonicSynth";
import { PIANO_NOTES } from "./utils/pianoNotes";
import "./App.css";

const NOTE_MAP = new Map(
  PIANO_NOTES.map((note) => [note.midi, note])
);

export default function App() {
  const [pressed, setPressed] = useState(() => new Set());
  const synthRef = useRef(null);
  const heldNotesRef = useRef(new Set());

  useEffect(() => {
    const synth = new PolyphonicSynth(8, (midis) => {
      setPressed(new Set(midis));
    });

    synthRef.current = synth;

    return () => {
      synthRef.current = null;
      heldNotesRef.current.clear();
      void synth.dispose();
    };
  }, []);

  const noteOn = useCallback(async (midi) => {
    const synth = synthRef.current;
    const note = NOTE_MAP.get(midi);

    if (!synth || !note || heldNotesRef.current.has(midi)) {
      return;
    }

    heldNotesRef.current.add(midi);

    try {
      await synth.ensureContext();

      if (
        synthRef.current !== synth ||
        !heldNotesRef.current.has(midi)
      ) {
        return;
      }

      synth.noteOn(midi, note.freqHz);
    } catch (error) {
      heldNotesRef.current.delete(midi);
      console.error("Audio initialization failed:", error);
    }
  }, []);

  const noteOff = useCallback((midi) => {
    heldNotesRef.current.delete(midi);
    synthRef.current?.noteOff(midi);
  }, []);

  return (
    <main className="app">
      <header className="masthead">
        <div className="brand">
          <span className="eyebrow">STEREO LAB / 88</span>
          <h1>KEYCLUB<span className="brand-dot">.</span></h1>
          <p>Your own little sound machine.</p>
        </div>

        <div className="edition">
          <span>MK 01</span>
          <strong>POLYPHONIC</strong>
          <span>SYNTHESIZER</span>
        </div>
      </header>

      <section className="instrument" aria-label="Piano instrument">
        <div className="instrument-top">
          <div className="instrument-heading">
            <span className="eyebrow">THE INSTRUMENT</span>
            <h2>Make some noise.</h2>
          </div>

          <span className="live-indicator">
            <span className="live-light" />
            AUDIO READY
          </span>
        </div>

        <div className="stats">
          <div className="stat stat-yellow">
            <span>ACTIVE VOICES</span>
            <strong>{pressed.size}<small> / 8</small></strong>
          </div>

          <div className="stat stat-mint">
            <span>PIANO RANGE</span>
            <strong>A0 <small>TO</small> C8</strong>
          </div>

          <div className="stat stat-pink">
            <span>VOICE MODE</span>
            <strong>FIFO</strong>
          </div>
        </div>

        <div className="keyboard-label">
          <span>01 / KEYBOARD</span>
          <span>SCROLL TO EXPLORE ALL 88 KEYS</span>
        </div>

        <Piano
          pressed={pressed}
          onNoteOn={noteOn}
          onNoteOff={noteOff}
        />

        <div className="keyboard-footer">
          <span>52 WHITE + 36 BLACK</span>
          <span>8 VOICE ENGINE</span>
        </div>
      </section>

      <section className="sequencer-preview">
        <div>
          <span className="eyebrow">COMING UP NEXT</span>
          <h2>Catch that melody.</h2>
          <p>
            Record your notes, play them back,
            and experiment with tempo.
          </p>
        </div>

        <span className="preview-label">
          SEQUENCER / 02
        </span>
      </section>

      <footer className="site-footer">
        <span>KEYCLUB INSTRUMENTS</span>
        <span>BUILT FOR THE LOVE OF SOUND</span>
      </footer>
    </main>
  );
}
