
import { AudioEngine } from './audio-engine';

export async function testAudioEngine(): Promise<void> {
  console.log('=== AUDIO ENGINE TEST ===');

  const engine = new AudioEngine();
  const context = engine.getContext();
  const analyser = engine.getAnalyser();

  console.log('FFT Size:', analyser.fftSize);
  console.log('Frequency Bins:', analyser.frequencyBinCount);

  // Tạo âm thanh thử nghiệm dài 1 giây
  const sampleRate = context.sampleRate;
  const buffer = context.createBuffer(1, sampleRate, sampleRate);
  const samples = buffer.getChannelData(0);

  for (let i = 0; i < samples.length; i++) {
    samples[i] = Math.sin(
      (2 * Math.PI * 440 * i) / sampleRate
    ) * 0.2;
  }

  // Tạo nút Play để trình duyệt cho phép phát âm thanh
  const button = document.createElement('button');
  button.textContent = 'Test Audio Engine';
  button.style.padding = '12px 20px';
  button.style.margin = '20px';
  button.style.cursor = 'pointer';

  document.body.appendChild(button);

  button.addEventListener('click', async () => {
    await engine.play(buffer);

    console.log('Playback started');

    // Đợi một chút để analyser nhận tín hiệu
    await new Promise((resolve) => setTimeout(resolve, 200));

    const frequencyData = engine.getFrequencyData();

    console.log('Frequency Data:', frequencyData);
    console.log(
      'Maximum Frequency Value:',
      Math.max(...frequencyData)
    );

    const passed =
      analyser.fftSize === 256 &&
      analyser.frequencyBinCount === 128 &&
      Math.max(...frequencyData) > 0;

    console.log(
      passed
        ? 'PASS: AudioEngine and AnalyserNode working'
        : 'FAIL: AudioEngine test'
    );
  });
}
