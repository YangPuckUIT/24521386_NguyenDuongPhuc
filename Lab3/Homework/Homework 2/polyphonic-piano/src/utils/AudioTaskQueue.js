
export class AudioTaskQueue {
  constructor() {
    this.tasks = [];
  }

  enqueue(task) {
    const { midi, freqHz, durationMs, deltaMs } = task;

    if (
      !Number.isInteger(midi) ||
      !Number.isFinite(freqHz) ||
      freqHz <= 0 ||
      !Number.isFinite(durationMs) ||
      durationMs < 0 ||
      !Number.isFinite(deltaMs) ||
      deltaMs < 0
    ) {
      throw new Error("Invalid audio task");
    }

    // Keep the reference so recording can finalize duration.
    this.tasks.push(task);
  }

  getAll() {
    return this.tasks.map((task) => ({ ...task }));
  }

  get size() {
    return this.tasks.length;
  }

  clear() {
    this.tasks = [];
  }

  async replay(synth, speed = 1, signal) {
    if (![0.5, 1, 2].includes(speed)) {
      throw new Error("Unsupported replay speed");
    }

    const tasks = this.getAll();
    const timers = new Set();
    const releases = new Map();

    const abortError = () =>
      new DOMException("Playback cancelled", "AbortError");

    const wait = (ms) =>
      new Promise((resolve, reject) => {
        if (signal?.aborted) {
          reject(abortError());
          return;
        }

        let timer;

        const cleanup = () => {
          clearTimeout(timer);
          timers.delete(timer);
          signal?.removeEventListener("abort", onAbort);
        };

        const onAbort = () => {
          cleanup();
          reject(abortError());
        };

        timer = setTimeout(() => {
          cleanup();
          resolve();
        }, ms);

        timers.add(timer);
        signal?.addEventListener("abort", onAbort, {
          once: true,
        });
      });

    try {
      let positionMs = 0;
      let endMs = 0;
      const startedAt = performance.now();

      for (const task of tasks) {
        positionMs += task.deltaMs / speed;

        await wait(Math.max(
          0,
          startedAt + positionMs - performance.now()
        ));

        if (signal?.aborted) throw abortError();

        const previous = releases.get(task.midi);

        if (previous !== undefined) {
          clearTimeout(previous);
          timers.delete(previous);
          releases.delete(task.midi);
          synth.noteOff(task.midi);
        }

        const started = synth.noteOn(task.midi, task.freqHz);

        if (started) {
          const timer = setTimeout(() => {
            timers.delete(timer);

            if (releases.get(task.midi) === timer) {
              releases.delete(task.midi);
              synth.noteOff(task.midi);
            }
          }, task.durationMs / speed);

          releases.set(task.midi, timer);
          timers.add(timer);
        }

        endMs = Math.max(
          endMs,
          positionMs + task.durationMs / speed
        );
      }

      await wait(Math.max(
        0,
        startedAt + endMs - performance.now()
      ));
    } finally {
      for (const timer of timers) {
        clearTimeout(timer);
      }

      releases.clear();
      synth.stopAll();
    }
  }
}
