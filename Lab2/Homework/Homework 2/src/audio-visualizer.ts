
export class AudioVisualizer {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private analyser: AnalyserNode;
  private animationId: number | null = null;

  constructor(
    canvas: HTMLCanvasElement,
    analyser: AnalyserNode
  ) {
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Canvas 2D is not supported');
    }

    this.canvas = canvas;
    this.context = context;
    this.analyser = analyser;

    this.resize();
  }

  resize(): void {
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;

    const dpr = window.devicePixelRatio || 1;

    this.canvas.width = Math.round(width * dpr);
    this.canvas.height = Math.round(height * dpr);

    this.context.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  start(): void {
    if (this.animationId !== null) return;

    const draw = () => {
      const width = this.canvas.clientWidth;
      const height = this.canvas.clientHeight;

      const data = new Uint8Array(
        this.analyser.frequencyBinCount
      );

      this.analyser.getByteFrequencyData(data);

      this.context.clearRect(0, 0, width, height);

      this.context.fillStyle = '#101c2a';
      this.context.fillRect(0, 0, width, height);

      const barCount = 64;
      const gap = 3;
      const barWidth =
        (width - gap * (barCount - 1)) / barCount;

      for (let i = 0; i < barCount; i++) {
        const value = data[i] / 255;
        const barHeight = Math.max(2, value * height);

        const x = i * (barWidth + gap);
        const y = height - barHeight;

        this.context.fillStyle = '#20c997';
        this.context.fillRect(
          x,
          y,
          Math.max(1, barWidth),
          barHeight
        );
      }

      this.animationId = requestAnimationFrame(draw);
    };

    this.animationId = requestAnimationFrame(draw);
  }

  stop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  dispose(): void {
    this.stop();
  }
}
