
import { useState } from "react";

export default function SequencerControls({
  recording,
  playing,
  recordedCount,
  startRecording,
  stopRecording,
  playSequence,
  stopSequence,
}) {
  const [speed, setSpeed] = useState(1);

  const status = recording
    ? "RECORDING"
    : playing
      ? "PLAYING"
      : "STANDBY";

  return (
    <section className="sequencer" aria-label="Music sequencer">
      <div className="sequencer-header">
        <div>
          <span className="eyebrow">02 / SEQUENCER</span>
          <h2>Catch that melody.</h2>
          <p>Record a tune. Twist the tempo. Play it again.</p>
        </div>

        <div className="sequence-status" aria-live="polite">
          <span
            className={`status-light ${
              recording ? "is-recording" : ""
            } ${playing ? "is-playing" : ""}`}
          />
          {status}
        </div>
      </div>

      <div className="sequence-display">
        <div>
          <span>NOTES CAPTURED</span>
          <strong>{String(recordedCount).padStart(2, "0")}</strong>
        </div>

        <div>
          <span>PLAYBACK SPEED</span>
          <strong>{speed.toFixed(1)}x</strong>
        </div>
      </div>

      <div className="sequence-controls">
        <div className="record-controls">
          <button
            type="button"
            className="control-button record-button"
            disabled={recording || playing}
            onClick={startRecording}
          >
            <span aria-hidden="true">●</span>
            Record
          </button>

          <button
            type="button"
            className="control-button"
            disabled={!recording}
            onClick={stopRecording}
          >
            Stop Recording
          </button>
        </div>

        <fieldset className="speed-control" disabled={playing}>
          <legend>Tempo</legend>

          {[0.5, 1, 2].map((value) => (
            <button
              key={value}
              type="button"
              className={speed === value ? "selected" : ""}
              aria-pressed={speed === value}
              onClick={() => setSpeed(value)}
            >
              {value.toFixed(1)}x
            </button>
          ))}
        </fieldset>

        <div className="playback-controls">
          <button
            type="button"
            className="control-button play-button"
            disabled={recording || playing || recordedCount === 0}
            onClick={() => playSequence(speed)}
          >
            Play Sequence
          </button>

          <button
            type="button"
            className="control-button stop-button"
            disabled={!playing}
            onClick={stopSequence}
          >
            Stop Sequence
          </button>
        </div>
      </div>

      <p className="sequence-hint">
        Each new recording replaces the previous take.
        Playback supports overlapping notes and chords.
      </p>
    </section>
  );
}
