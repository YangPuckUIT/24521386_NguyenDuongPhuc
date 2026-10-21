
export class AudioEngine {
  private audioContext: AudioContext;
  private analyser: AnalyserNode;
  private source: AudioBufferSourceNode | null = null;

  // Callback khi bài hát kết thúc tự nhiên
  private onTrackEnded: (() => void) | null = null;

  constructor() {
    this.audioContext = new AudioContext();

    this.analyser = this.audioContext.createAnalyser();

    this.analyser.fftSize = 2048;
    this.analyser.smoothingTimeConstant = 0.8;

    this.analyser.connect(this.audioContext.destination);
  }

  getContext(): AudioContext {
    return this.audioContext;
  }

  getAnalyser(): AnalyserNode {
    return this.analyser;
  }

  // Cho phép AudioApp nhận thông báo khi bài hát kết thúc
  setOnTrackEnded(callback: (() => void) | null): void {
    this.onTrackEnded = callback;
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

      // Chỉ xử lý khi đây vẫn là source hiện tại
      if (this.source === source) {
        this.source = null;

        console.log('[AUDIO] Track ended naturally');

        this.onTrackEnded?.();
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

    // Không gọi callback chuyển bài khi Stop thủ công
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
    this.onTrackEnded = null;

    this.analyser.disconnect();

    if (this.audioContext.state !== 'closed') {
      await this.audioContext.close();
    }

    console.log('[AUDIO] Engine disposed');
  }
}
