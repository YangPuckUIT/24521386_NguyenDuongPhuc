
export class PolyphonicSynth {
  constructor(maxVoices = 8, onVoiceChange = () => {}) {
    this.ctx = null;
    this.maxVoices = maxVoices;
    this.voices = new Map();
    this.onVoiceChange = onVoiceChange;
  }

  async ensureContext() {
    if (!this.ctx) {
      this.ctx = new window.AudioContext();
    }

    if (this.ctx.state === "suspended") {
      await this.ctx.resume();
    }
  }

  noteOn(midi, freqHz) {
    if (!this.ctx || this.ctx.state !== "running") {
      return false;
    }

    if (this.voices.has(midi)) {
      return false;
    }

    // FIFO voice stealing
    if (this.voices.size >= this.maxVoices) {
      const oldestMidi = this.voices.keys().next().value;
      this.noteOff(oldestMidi);
    }

    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freqHz, now);

    // Smooth attack
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(
      0.08,
      now + 0.015
    );

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);

    this.voices.set(midi, { osc, gain });
    this.notify();

    return true;
  }

  noteOff(midi) {
    const voice = this.voices.get(midi);

    if (!voice || !this.ctx) return;

    const now = this.ctx.currentTime;

    voice.gain.gain.cancelScheduledValues(now);

    voice.gain.gain.setValueAtTime(
      Math.max(voice.gain.gain.value, 0.0001),
      now
    );

    // Click-free release
    voice.gain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + 0.04
    );

    voice.osc.stop(now + 0.045);

    this.voices.delete(midi);
    this.notify();
  }

  notify() {
    this.onVoiceChange([...this.voices.keys()]);
  }

  stopAll() {
    for (const midi of [...this.voices.keys()]) {
      this.noteOff(midi);
    }
  }

  async dispose() {
    this.stopAll();

    if (this.ctx && this.ctx.state !== "closed") {
      await this.ctx.close();
    }

    this.ctx = null;
  }
}
