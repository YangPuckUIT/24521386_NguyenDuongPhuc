export default function EvidenceCard({ clip }) {
  return (
    <article className="evidence-card">
      <div className="card-topline">
        <span className="evidence-id">{clip._id}</span>
        <span
          className={`status status-${clip.status.toLowerCase().replaceAll(" ", "-")}`}
        >
          {clip.status}
        </span>
      </div>

      <div className="card-category">{clip.category}</div>

      <h3>{clip.title}</h3>

      <p>{clip.description}</p>

      <div className="card-footer">
        <span>{clip.date}</span>
        <span className="card-arrow">↗</span>
      </div>
    </article>
  );
}
