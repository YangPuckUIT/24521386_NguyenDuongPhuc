
export class AudioVisualizer {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private analyser: AnalyserNode;

  private animationId: number | null = null;

  private readonly barCount = 48;
  private readonly sensitivity = 0.8;

  private barHeights = new Float32Array(this.barCount);

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

      this.context.fillStyle = '#0d1316';
      this.context.fillRect(0, 0, width, height);

      const gap = 3;
      const barWidth =
        (width - gap * (this.barCount - 1)) /
        this.barCount;

      const sampleRate = this.analyser.context.sampleRate;
      const nyquist = sampleRate / 2;

      const minFrequency = 40;
      const maxFrequency = Math.min(16000, nyquist);

      for (let i = 0; i < this.barCount; i++) {
        // Mỗi cột ứng với một dải tần logarithmic
        const startFrequency =
          minFrequency *
          Math.pow(
            maxFrequency / minFrequency,
            i / this.barCount
          );

        const endFrequency =
          minFrequency *
          Math.pow(
            maxFrequency / minFrequency,
            (i + 1) / this.barCount
          );

        const startBin = Math.min(
          data.length - 1,
          Math.floor(
            (startFrequency / nyquist) * data.length
          )
        );

        const endBin = Math.min(
          data.length,
          Math.max(
            startBin + 1,
            Math.ceil(
              (endFrequency / nyquist) * data.length
            )
          )
        );

        // Tính năng lượng của dải tần
        let sumSquares = 0;

        for (let j = startBin; j < endBin; j++) {
          const value = data[j] / 255;
          sumSquares += value * value;
        }

        const rms = Math.sqrt(
          sumSquares / (endBin - startBin)
        );

        // Nén biên độ để giữ sự khác biệt giữa các cột
// Vị trí cột, từ 0 (LOW) đến 1 (HIGH)
// Vị trí cột: 0 = LOW, 0.5 = MID, 1 = HIGH
const position = i / (this.barCount - 1);

// Giảm nhẹ bass để các cột bên trái không quá cao
const bassControl =
  1 - 0.25 * Math.exp(
    -Math.pow(position / 0.22, 2)
  );

// Tăng vừa phải vùng giữa, chuyển tiếp mềm sang hai bên
const midBoost =
  1 + 0.3 * Math.exp(
    -Math.pow((position - 0.5) / 0.38, 2)
  );

// Tăng nhẹ treble để bên phải không quá thấp
    const trebleBoost =
        1 + 0.15 * Math.exp(-Math.pow((position - 1) / 0.25, 2));

// Chiều cao cột theo dữ liệu âm thanh thực tế
    const targetHeight =
        Math.pow(rms, 1.5) *
        height *
        this.sensitivity *
        bassControl *
        midBoost *
        trebleBoost;

        // Attack nhanh, release chậm
        const previousHeight = this.barHeights[i];

        const smoothing =
          targetHeight > previousHeight ? 0.55 : 0.12;

        const smoothHeight =
          previousHeight +
          (targetHeight - previousHeight) * smoothing;

        this.barHeights[i] = smoothHeight;

        const barHeight = Math.max(
          2,
          Math.min(height, smoothHeight)
        );

        const x = i * (barWidth + gap);
        const y = height - barHeight;

        this.context.fillStyle = '#a9c2ad';

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

    this.barHeights.fill(0);
  }

  dispose(): void {
    this.stop();
  }
}
