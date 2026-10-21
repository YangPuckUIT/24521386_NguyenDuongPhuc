
export interface AudioTask {
  trackUrl: string;
  controller: AbortController;
  resolve: (buffer: AudioBuffer) => void;
  reject: (reason: unknown) => void;
}

export class AudioTaskQueue {
  private queue: AudioTask[] = [];
  private isProcessing = false;
  private activeController: AbortController | null = null;
  private audioContext: AudioContext;

  constructor(audioContext: AudioContext) {
    this.audioContext = audioContext;
  }

  enqueue(trackUrl: string): Promise<AudioBuffer> {
    const controller = new AbortController();

    return new Promise((resolve, reject) => {
      this.queue.push({
        trackUrl,
        controller,
        resolve,
        reject,
      });

      void this.processNext();
    });
  }

  private async processNext(): Promise<void> {
    if (this.isProcessing) return;

    this.isProcessing = true;

    try {
      while (this.queue.length > 0) {
        const task = this.queue.shift()!;
        this.activeController = task.controller;

        console.log(`[FIFO] START: ${task.trackUrl}`);

        try {
          const response = await fetch(task.trackUrl, {
            signal: task.controller.signal,
          });

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }

          const arrayBuffer = await response.arrayBuffer();

          if (task.controller.signal.aborted) {
            throw new DOMException("Cancelled", "AbortError");
          }

          const audioBuffer =
            await this.audioContext.decodeAudioData(arrayBuffer);

          if (task.controller.signal.aborted) {
            throw new DOMException("Cancelled", "AbortError");
          }

          console.log(`[FIFO] DONE: ${task.trackUrl}`);

          task.resolve(audioBuffer);
        } catch (error) {
          console.error(`[FIFO] ERROR: ${task.trackUrl}`, error);
          task.reject(error);
        } finally {
          this.activeController = null;
        }
      }
    } finally {
      this.isProcessing = false;
    }
  }

  cancelActive(): void {
    this.activeController?.abort();
  }

  cancelPending(): void {
    for (const task of this.queue) {
      task.controller.abort();

      task.reject(
        new DOMException("Cancelled", "AbortError")
      );
    }

    this.queue = [];
  }

  getPendingCount(): number {
    return this.queue.length;
  }
}
