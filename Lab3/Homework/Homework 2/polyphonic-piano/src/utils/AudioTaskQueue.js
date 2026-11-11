
export class AudioTaskQueue {
  constructor() {
    this.tasks = [];
  }

  enqueue(task) {
    const { midi, freqHz, durationMs, deltaMs } = task;

    if (
      !Number.isInteger(midi) ||
      ![freqHz, durationMs, deltaMs].every(
        (value) => Number.isFinite(value) && value >= 0
      ) ||
      freqHz === 0
    ) {
      throw new Error("Invalid audio task");
    }

    this.tasks.push({
      midi,
      freqHz,
      durationMs,
      deltaMs,
    });
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

    if (signal?.aborted) {
      throw signal.reason;
    }

    const tasks = this.getAll();
    const pending = new Set();

    const wait = (durationMs) =>
      new Promise((resolve, reject) => {
        if (signal?.aborted) {
          reject(signal.reason);
          return;
        }

        let timer;

        const onAbort = () => {
          cleanup();
          reject(signal.reason);
        };

        const cleanup = () => {
          clearTimeout(timer);
          pending.delete(timer);
          signal?.removeEventListener("abort", onAbort);
        };

        timer = setTimeout(() => {
          cleanup();
          resolve();
        }, durationMs);

        pending.add(timer);
        signal?.addEventListener("abort", onAbort, {
          once: true,
        });
      });

    const releases = new Map();

    try {
      const startTime = performance.now();
      let positionMs = 0;
      let endTimeMs = 0;

      for (const task of tasks) {
        positionMs += task.deltaMs / speed;

        const remaining =
          startTime + positionMs - performance.now();

        await wait(Math.max(0, remaining));

        if (signal?.aborted) {
          throw signal.reason;
        }

        // A repeated MIDI note replaces its previous voice.
        const previous = releases.get(task.midi);

        if (previous !== undefined) {
          clearTimeout(previous);
          pending.delete(previous);
          releases.delete(task.midi);
          synth.noteOff(task.midi);
        }

        const started = synth.noteOn(
          task.midi,
          task.freqHz
        );

        if (started) {
          const timer = setTimeout(() => {
            pending.delete(timer);

            if (releases.get(task.midi) === timer) {
              releases.delete(task.midi);
              synth.noteOff(task.midi);
            }
          }, task.durationMs / speed);

          releases.set(task.midi, timer);
          pending.add(timer);
        }

        endTimeMs = Math.max(
          endTimeMs,
          positionMs + task.durationMs / speed
        );
      }

      await wait(
        Math.max(
          0,
          startTime + endTimeMs - performance.now()
        )
      );
    } finally {
      for (const timer of pending) {
        clearTimeout(timer);
      }

      releases.clear();
      synth.stopAll();
    }
  }
}
