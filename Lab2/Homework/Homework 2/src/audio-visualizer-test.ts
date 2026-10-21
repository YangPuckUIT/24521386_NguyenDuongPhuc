
import { AudioEngine } from './audio-engine';
import { AudioVisualizer } from './audio-visualizer';

export function testAudioVisualizer(): void {
  console.log('=== AUDIO VISUALIZER TEST ===');

  const engine = new AudioEngine();
  const context = engine.getContext();

  // Tạo Canvas để hiển thị các cột âm thanh
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 250;
  canvas.style.width = '100%';
  canvas.style.maxWidth = '800px';
  canvas.style.height = '250px';
  canvas.style.display = 'block';
  canvas.style.margin = '20px auto';

  document.body.appendChild(canvas);

  const visualizer = new AudioVisualizer(
    canvas,
    engine.getAnalyser()
  );

  // Tạo hai nút điều khiển
  const controls = document.createElement('section');
  controls.style.display = 'flex';
  controls.style.justifyContent = 'center';
  controls.style.gap = '12px';

  const playButton = document.createElement('button');
  playButton.textContent = 'Play Visualizer';

  const stopButton = document.createElement('button');
  stopButton.textContent = 'Stop Visualizer';

  controls.append(playButton, stopButton);
  document.body.appendChild(controls);

  // Tạo âm thanh thử nghiệm dài 5 giây
  const sampleRate = context.sampleRate;
  const duration = 5;

  const buffer = context.createBuffer(
    1,
    sampleRate * duration,
    sampleRate
  );

  const samples = buffer.getChannelData(0);

  for (let i = 0; i < samples.length; i++) {
    const time = i / sampleRate;

    // Thay đổi tần số để các cột chuyển động
    const frequency = 220 + 660 * (time / duration);

    samples[i] =
      Math.sin(2 * Math.PI * frequency * time) * 0.25;
  }

  playButton.addEventListener('click', async () => {
    try {
      await engine.play(buffer);
      visualizer.start();

      console.log('[VISUALIZER] Animation started');
    } catch (error) {
      console.error('[VISUALIZER] Playback failed', error);
    }
  });

  stopButton.addEventListener('click', () => {
    engine.stop();
    visualizer.stop();

    console.log('[VISUALIZER] Animation stopped');
  });

  window.addEventListener(
    'beforeunload',
    () => {
      visualizer.dispose();
      void engine.dispose();
    },
    { once: true }
  );

  console.log('PASS: Visualizer initialized');
}
