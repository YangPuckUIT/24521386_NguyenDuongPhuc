
import Piano from "./components/Piano";
import SequencerControls from "./components/SequencerControls";
import { usePiano } from "./hooks/usePiano";
import "./App.css";

export default function App() {
  const {
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
  } = usePiano();

  return (
    <main className="app">
      <header className="masthead">
        <div className="brand">
          <span className="eyebrow">STEREO LAB / 88</span>
          <h1>
            KEYCLUB<span className="brand-dot">.</span>
          </h1>
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
            AUDIO ENGINE
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

      <SequencerControls
        recording={recording}
        playing={playing}
        recordedCount={recordedCount}
        startRecording={startRecording}
        stopRecording={stopRecording}
        playSequence={playSequence}
        stopSequence={stopSequence}
      />

      <footer className="site-footer">
        <span>KEYCLUB INSTRUMENTS</span>
        <span>BUILT FOR THE LOVE OF SOUND</span>
      </footer>
    </main>
  );
}
