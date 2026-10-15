/**
 * Polyphonic audio engine.
 * This module does not depend on HTML elements or keyboard mappings.
 */

class AudioEngine {
    constructor() {
        this.audioContext = null;
    }

    async init() {
        if (!this.audioContext) {
            const AudioContextClass =
                window.AudioContext || window.webkitAudioContext;

            this.audioContext = new AudioContextClass();
        }

        if (this.audioContext.state === "suspended") {
            await this.audioContext.resume();
        }
    }

    play(soundName) {
        if (!this.audioContext) {
            throw new Error("AudioEngine has not been initialized.");
        }

        const now = this.audioContext.currentTime;

        switch (soundName) {
            case "kick":
                this.playKick(now);
                break;
            case "snare":
                this.playSnare(now);
                break;
            case "closed-hihat":
                this.playHiHat(now, 0.08);
                break;
            case "open-hihat":
                this.playHiHat(now, 0.4);
                break;
            case "tom":
                this.playTom(now);
                break;
            case "crash":
                this.playHiHat(now, 0.7);
                break;
            default:
                throw new Error(`Unknown sound: ${soundName}`);
        }
    }

    playKick(now) {
        const oscillator = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(150, now);
        oscillator.frequency.exponentialRampToValueAtTime(45, now + 0.15);

        gain.gain.setValueAtTime(0.9, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        oscillator.connect(gain);
        gain.connect(this.audioContext.destination);

        oscillator.start(now);
        oscillator.stop(now + 0.2);
    }

    playSnare(now) {
        this.playNoise(now, 0.18, 0.5, 1800);
    }

    playHiHat(now, duration) {
        this.playNoise(now, duration, 0.25, 7000);
    }

    playTom(now) {
        const oscillator = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(180, now);
        oscillator.frequency.exponentialRampToValueAtTime(70, now + 0.3);

        gain.gain.setValueAtTime(0.7, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        oscillator.connect(gain);
        gain.connect(this.audioContext.destination);

        oscillator.start(now);
        oscillator.stop(now + 0.3);
    }

    playNoise(now, duration, volume, filterFrequency) {
        const sampleRate = this.audioContext.sampleRate;
        const frameCount = Math.floor(sampleRate * duration);
        const buffer = this.audioContext.createBuffer(
            1,
            frameCount,
            sampleRate
        );
        const data = buffer.getChannelData(0);

        for (let i = 0; i < frameCount; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const source = this.audioContext.createBufferSource();
        const filter = this.audioContext.createBiquadFilter();
        const gain = this.audioContext.createGain();

        source.buffer = buffer;
        filter.type = "highpass";
        filter.frequency.setValueAtTime(filterFrequency, now);

        gain.gain.setValueAtTime(volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.audioContext.destination);

        source.start(now);
        source.stop(now + duration);
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = AudioEngine;
}