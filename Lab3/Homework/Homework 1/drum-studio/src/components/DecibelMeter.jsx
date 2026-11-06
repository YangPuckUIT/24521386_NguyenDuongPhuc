
export default function DecibelMeter({ level = 0 }) {
  const safeLevel = Math.min(100, Math.max(0, level));

  return (
    <section
      className="decibel-meter"
      aria-labelledby="meter-title"
    >
      <h2 id="meter-title">Drum Level Meter</h2>

      <div className="meter-info">
        <span>Audio activity </span>
        <strong>{Math.round(safeLevel)}%</strong>
      </div>

      <div
        className="meter-track"
        role="meter"
        aria-label="Drum activity level"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(safeLevel)}
      >
        <div
          className="meter-fill"
          style={{ width: `${safeLevel}%` }}
        />
      </div>
    </section>
  );
}
