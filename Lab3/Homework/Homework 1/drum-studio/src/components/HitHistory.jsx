
export default function HitHistory({ hits }) {
  const latestHit = hits[0];

  return (
    <section
      className="hit-history"
      aria-labelledby="hit-history-title"
    >
      <h2 id="hit-history-title">Recent Hits</h2>

      <output
        className="hit-announcement"
        aria-live="polite"
        aria-atomic="true"
      >
        {latestHit
          ? `Last played: ${latestHit.name}`
          : "No drums played yet."}
      </output>

      <ul className="hit-list" aria-label="Recent drum hits">
        {hits.map((hit) => (
          <li key={hit.id}>
            <kbd>{hit.key}</kbd>
            <span>{hit.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
