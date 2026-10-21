import './style.css';

import { initializeAudioApp } from './audio-app';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('App root not found');
}

app.innerHTML = `
  <main class="workspace">
    <header class="topbar">
      <a class="brand" href="/" aria-label="FREQ ROOM home">
        FREQ<span class="brand-divider">/</span>ROOM
      </a>

      <span class="topbar-meta">AUDIO WORKSPACE — 01</span>
    </header>

    <section class="intro" aria-labelledby="page-title">
      <p class="section-kicker">AN AUDIO EXPERIMENT</p>

      <h1 id="page-title">Sound, in motion.</h1>

      <p class="intro-description">
        A space to see what you hear.
      </p>
    </section>

    <section class="workspace-panel" aria-labelledby="controls-title">
      <div class="panel-heading">
        <h2 id="controls-title">
          <span class="section-number">01 /</span>
          Playback
        </h2>

        <span class="panel-meta" id="playback-state">
          STANDBY
        </span>
      </div>

      <div class="file-picker">
        <label for="audio-files">Choose audio files</label>

        <p>
          Add one or more tracks to your listening session.
        </p>

        <input
          type="file"
          id="audio-files"
          accept="audio/*"
          multiple
        />
      </div>

      <div class="playback-controls">
        <button
          id="play-button"
          class="button button-primary"
          type="button"
          disabled
        >
          PLAY
        </button>

        <button
          id="stop-button"
          class="button button-secondary"
          type="button"
          disabled
        >
          STOP
        </button>

        <button
          id="cancel-button"
          class="button button-secondary"
          type="button"
          disabled
        >
          CLEAR QUEUE
        </button>
      </div>

      <div class="status-line">
        <span class="status-indicator" aria-hidden="true"></span>

        <p id="audio-status" role="status" aria-live="polite">
          Ready. Select audio files to begin.
        </p>
      </div>
    </section>

    <section class="workspace-panel" aria-labelledby="visualizer-title">
      <div class="panel-heading">
        <h2 id="visualizer-title">
          <span class="section-number">02 /</span>
          Spectrum
        </h2>

        <span class="panel-meta">256 FFT</span>
      </div>

      <div class="spectrum-container">
        <canvas
          id="audio-canvas"
          width="800"
          height="250"
          role="img"
          aria-label="Audio frequency spectrum visualizer"
        ></canvas>
      </div>

      <div class="spectrum-labels" aria-hidden="true">
        <span>LOW</span>
        <span>MID</span>
        <span>HIGH</span>
      </div>
    </section>

    <section class="workspace-panel" aria-labelledby="queue-title">
      <div class="panel-heading">
        <h2 id="queue-title">
          <span class="section-number">03 /</span>
          Up next
        </h2>

        <span class="panel-meta" id="queue-count">
          00 PENDING
        </span>
      </div>

      <ol id="queue-list" class="queue-list">
        <li class="queue-empty">
          Your queue is empty.
        </li>
      </ol>
    </section>

    <footer class="footer">
      <span>BUILT FOR THE FREQUENCIES BETWEEN</span>
      <span>2026</span>
    </footer>
  </main>
`;

initializeAudioApp();