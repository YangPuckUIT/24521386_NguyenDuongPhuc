
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
  const pendingNotesRef = useRef(new Set());

  useEffect(() => {
    const synth = new PolyphonicSynth(8, (midis) => {
      setPressed(new Set(midis));
    });

    synthRef.current = synth;

    return () => {
      synthRef.current = null;
      heldNotesRef.current.clear();
      pendingNotesRef.current.clear();
      void synth.dispose();
    };
  }, []);

  const noteOn = useCallback(async (midi) => {
    const synth = synthRef.current;
    const note = NOTE_MAP.get(midi);

    if (!synth || !note) return;
    if (heldNotesRef.current.has(midi)) return;

    heldNotesRef.current.add(midi);
    pendingNotesRef.current.add(midi);

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
      console.error("Audio initialization failed:", error);
      heldNotesRef.current.delete(midi);
    } finally {
      pendingNotesRef.current.delete(midi);
    }
  }, []);

  const noteOff = useCallback((midi) => {
    heldNotesRef.current.delete(midi);
    pendingNotesRef.current.delete(midi);
    synthRef.current?.noteOff(midi);
  }, []);

  return (
    <main className="app">
      <header>
        <h1>88-Key Polyphonic Piano</h1>
        <p>
          React 19 · Web Audio API · FIFO Voice Stealing
        </p>
      </header>

      <section className="status-panel">
        <p>
          Active voices: <strong>{pressed.size} / 8</strong>
        </p>
        <p>
          Total keys: <strong>88</strong>
        </p>
      </section>

      <Piano
        pressed={pressed}
        onNoteOn={noteOn}
        onNoteOff={noteOff}
      />
    </main>
  );
}
