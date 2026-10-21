
import { AudioTaskQueue } from './audio-queue-controller';

export async function testAudioQueue(): Promise<void> {
  console.log('=== FIFO AUDIO QUEUE TEST ===');

  const audioContext = new AudioContext();
  const queue = new AudioTaskQueue(audioContext);

  // Generate a small valid WAV file for testing
  function createTestAudio(): string {
    const sampleRate = 8000;
    const samples = 800;
    const buffer = new ArrayBuffer(44 + samples * 2);
    const view = new DataView(buffer);

    function writeString(offset: number, text: string): void {
      for (let i = 0; i < text.length; i++) {
        view.setUint8(offset + i, text.charCodeAt(i));
      }
    }

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + samples * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, samples * 2, true);

    const blob = new Blob([buffer], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  }

  const trackA = createTestAudio();
  const trackB = createTestAudio();
  const trackC = createTestAudio();

  try {
    console.log('Enqueue A');
    const promiseA = queue.enqueue(trackA);

    console.log('Enqueue B');
    const promiseB = queue.enqueue(trackB);

    console.log('Enqueue C');
    const promiseC = queue.enqueue(trackC);

    const results = await Promise.all([
      promiseA,
      promiseB,
      promiseC,
    ]);

    results.forEach((buffer, index) => {
      const name = ['A', 'B', 'C'][index];
      console.log(`Completed ${name}: ${buffer.duration}s`);
    });

    console.log('PASS: All three tracks decoded');
    console.log('=== TEST FINISHED ===');
  } catch (error) {
    console.error('FAIL:', error);
  } finally {
    URL.revokeObjectURL(trackA);
    URL.revokeObjectURL(trackB);
    URL.revokeObjectURL(trackC);
    await audioContext.close();
  }
}
