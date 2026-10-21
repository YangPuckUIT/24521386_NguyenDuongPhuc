
export class AudioEngine {
  private audioContext: AudioContext;
  private analyser: AnalyserNode;
  private source: AudioBufferSourceNode | null = null;

  constructor() {
    this.audioContext = new AudioContext();

    this.analyser = this.audioContext.createAnalyser();

    // FFT size theo yêu cầu bài tập
    this.analyser.fftSize = 256;

    // Làm chuyển động của visualizer mượt hơn
    this.analyser.smoothingTimeConstant = 0.8;

    // Kết nối analyser với loa
    this.analyser.connect(this.audioContext.destination);
  }

  getContext(): AudioContext {
    return this.audioContext;
  }

  getAnalyser(): AnalyserNode {
    return this.analyser;
  }

  async play(buffer: AudioBuffer): Promise<void> {
    this.stop();

    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }

    const source = this.audioContext.createBufferSource();

    source.buffer = buffer;
    source.connect(this.analyser);

    source.onended = () => {
      source.disconnect();

      if (this.source === source) {
        this.source = null;
      }
    };

    this.source = source;
    source.start();

    console.log('[AUDIO] Playback started');
  }

  stop(): void {
    if (!this.source) return;

    const source = this.source;
    this.source = null;

    source.onended = null;
    source.stop();
    source.disconnect();

    console.log('[AUDIO] Playback stopped');
  }

  getFrequencyData(): Uint8Array<ArrayBuffer> {
    const data = new Uint8Array(
      this.analyser.frequencyBinCount
    );

    this.analyser.getByteFrequencyData(data);

    return data;
  }

  async dispose(): Promise<void> {
    this.stop();
    this.analyser.disconnect();

    if (this.audioContext.state !== 'closed') {
      await this.audioContext.close();
    }

    console.log('[AUDIO] Engine disposed');
  }
}
