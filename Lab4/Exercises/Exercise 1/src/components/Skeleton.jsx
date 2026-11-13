
export default function Skeleton() {
  return (
    <section
      className="person-detail skeleton"
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading person details"
    >
      <span className="sr-only">Loading person details...</span>

      <div className="skeleton-line skeleton-title" />
      <div className="skeleton-line skeleton-subtitle" />
      <div className="skeleton-line skeleton-field" />
      <div className="skeleton-line skeleton-description" />
    </section>
  );
}
