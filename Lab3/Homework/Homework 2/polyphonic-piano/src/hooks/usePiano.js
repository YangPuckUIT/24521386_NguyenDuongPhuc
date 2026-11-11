
import { useCallback, useEffect, useRef, useState } from "react";
import { PolyphonicSynth } from "../audio/PolyphonicSynth";
import { AudioTaskQueue } from "../utils/AudioTaskQueue";
import { PIANO_NOTES } from "../utils/pianoNotes";

const NOTE_MAP = new Map(
  PIANO_NOTES.map((note) => [note.midi, note])
);

export function usePiano() {
  const [pressed, setPressed] = useState(() => new Set());
  const [recording, setRecording] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [recordedCount, setRecordedCount] = useState(0);

  const synthRef = useRef(null);
  const queueRef = useRef(new AudioTaskQueue());
  const heldRef = useRef(new Set());
  const pendingRef = useRef(new Map());
  const activeRecordingRef = useRef(new Map());
  const lastStartRef = useRef(null);
  const recordingRef = useRef(false);
  const playingRef = useRef(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    const finishRecordedNote = (midi) => {
      const active = activeRecordingRef.current.get(midi);
      if (!active) return;

      active.task.durationMs = Math.max(
        40,
        performance.now() - active.startedAt
      );

      activeRecordingRef.current.delete(midi);
    };

    const synth = new PolyphonicSynth(
      8,
      (midis) => setPressed(new Set(midis)),
      finishRecordedNote
    );

    synthRef.current = synth;

    return () => {
      controllerRef.current?.abort();
      controllerRef.current = null;
      playingRef.current = false;
      recordingRef.current = false;
      heldRef.current.clear();
      pendingRef.current.clear();
      activeRecordingRef.current.clear();
      synthRef.current = null;
      void synth.dispose();
    };
  }, []);

  const noteOn = useCallback(async (midi) => {
    if (playingRef.current) return;

    const synth = synthRef.current;
    const note = NOTE_MAP.get(midi);

    if (!synth || !note || heldRef.current.has(midi)) {
      return;
    }

    heldRef.current.add(midi);
    const token = {};
    pendingRef.current.set(midi, token);

    try {
      await synth.ensureContext();

      if (
        synthRef.current !== synth ||
        playingRef.current ||
        !heldRef.current.has(midi) ||
        pendingRef.current.get(midi) !== token
      ) {
        return;
      }

      const started = synth.noteOn(midi, note.freqHz);

      if (!started || !recordingRef.current) return;

      const now = performance.now();
      const deltaMs = lastStartRef.current === null
        ? 0
        : Math.max(0, now - lastStartRef.current);

      lastStartRef.current = now;

      const task = {
        midi,
        freqHz: note.freqHz,
        durationMs: 0,
        deltaMs,
      };

      queueRef.current.enqueue(task);

      activeRecordingRef.current.set(midi, {
        task,
        startedAt: now,
      });

      setRecordedCount(queueRef.current.size);
    } catch (error) {
      console.error("Unable to start note:", error);
      heldRef.current.delete(midi);
    } finally {
      if (pendingRef.current.get(midi) === token) {
        pendingRef.current.delete(midi);
      }
    }
  }, []);

  const noteOff = useCallback((midi) => {
    heldRef.current.delete(midi);
    pendingRef.current.delete(midi);

    if (!playingRef.current) {
      synthRef.current?.noteOff(midi);
    }
  }, []);

  const startRecording = useCallback(() => {
    if (playingRef.current || recordingRef.current) return;

    synthRef.current?.stopAll();
    heldRef.current.clear();
    pendingRef.current.clear();
    activeRecordingRef.current.clear();
    queueRef.current.clear();

    lastStartRef.current = null;
    recordingRef.current = true;
    setRecording(true);
    setRecordedCount(0);
  }, []);

  const stopRecording = useCallback(() => {
    if (!recordingRef.current) return;

    const now = performance.now();

    for (const active of activeRecordingRef.current.values()) {
      active.task.durationMs = Math.max(
        40,
        now - active.startedAt
      );
    }

    activeRecordingRef.current.clear();
    recordingRef.current = false;
    setRecording(false);
  }, []);

  const stopSequence = useCallback(() => {
    controllerRef.current?.abort();
    controllerRef.current = null;

    playingRef.current = false;
    setPlaying(false);
    synthRef.current?.stopAll();
  }, []);

  const playSequence = useCallback(async (speed) => {
    if (
      playingRef.current ||
      recordingRef.current ||
      queueRef.current.size === 0
    ) {
      return;
    }

    const synth = synthRef.current;
    if (!synth) return;

    playingRef.current = true;
    setPlaying(true);

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      await synth.ensureContext();

      if (controller.signal.aborted) return;

      heldRef.current.clear();
      pendingRef.current.clear();
      synth.stopAll();

      await queueRef.current.replay(
        synth,
        speed,
        controller.signal
      );
    } catch (error) {
      if (error?.name !== "AbortError") {
        console.error("Sequence playback failed:", error);
      }
    } finally {
      if (controllerRef.current === controller) {
        controllerRef.current = null;
        playingRef.current = false;
        setPlaying(false);
      }
    }
  }, []);

  return {
    pressed,
    recording,
    playing,
    recordedCount,
    noteOn,
    noteOff,
    startRecording,
    stopRecording,
    playSequence,
    stopSequence,
  };
}
