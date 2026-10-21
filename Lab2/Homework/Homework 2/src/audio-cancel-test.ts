
import { AudioTaskQueue } from './audio-queue-controller';

export async function testAudioCancellation(): Promise<void> {
  console.log('=== AUDIO CANCELLATION TEST ===');

  const audioContext = new AudioContext();
  const queue = new AudioTaskQueue(audioContext);

  const originalFetch = window.fetch;

  // Giả lập download chậm để có thời gian hủy tác vụ.
  window.fetch = (_input, init) => {
    return new Promise<Response>((_resolve, reject) => {
      const signal = init?.signal;

      if (signal?.aborted) {
        reject(new DOMException('Cancelled', 'AbortError'));
        return;
      }

      signal?.addEventListener(
        'abort',
        () => {
          reject(new DOMException('Cancelled', 'AbortError'));
        },
        { once: true }
      );
    });
  };

  try {
    const results: string[] = [];

    const trackA = queue.enqueue('test-track-A').then(
      () => 'A: completed',
      (error: unknown) =>
        `A: ${error instanceof Error ? error.name : 'UnknownError'}`
    );

    const trackB = queue.enqueue('test-track-B').then(
      () => 'B: completed',
      (error: unknown) =>
        `B: ${error instanceof Error ? error.name : 'UnknownError'}`
    );

    const trackC = queue.enqueue('test-track-C').then(
      () => 'C: completed',
      (error: unknown) =>
        `C: ${error instanceof Error ? error.name : 'UnknownError'}`
    );

    console.log('Pending before cancel:', queue.getPendingCount());

    queue.cancelPending();
    queue.cancelActive();

    results.push(...(await Promise.all([trackA, trackB, trackC])));

    console.log('Results:', results);
    console.log('Pending after cancel:', queue.getPendingCount());

    const passed =
      results.every((result) => result.endsWith('AbortError')) &&
      queue.getPendingCount() === 0;

    console.log(
      passed
        ? 'PASS: Active and pending tasks cancelled'
        : 'FAIL: Cancellation test'
    );

    console.log('=== TEST FINISHED ===');
  } finally {
    window.fetch = originalFetch;
    await audioContext.close();
  }
}
