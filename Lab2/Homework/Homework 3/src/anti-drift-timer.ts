export function createAntiDriftTimer(
  durationMs: number,
  onTick: (remaining: number) => void
): () => void {
  if (!Number.isFinite(durationMs) || durationMs < 0) {
    throw new RangeError('durationMs must be a non-negative finite number');
  }

  const targetTime = Date.now() + durationMs;

  let rafId: number | null = null;
  let cancelled = false;

  function tick(): void {
    if (cancelled) return;

    const remaining = Math.max(0, targetTime - Date.now());

    onTick(remaining);

    if (!cancelled && remaining > 0) {
      rafId = requestAnimationFrame(tick);
    } else {
      rafId = null;
    }
  }

  tick();

  return () => {
    cancelled = true;

    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };
}