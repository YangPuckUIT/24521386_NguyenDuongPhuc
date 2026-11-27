import { useState } from "react";
import EvidenceCard from "./EvidenceCard";

export default function EvidenceGrid({ clips, pageSize = 6 }) {
  const [page, setPage] = useState(1);

  // Derived state: calculated during render
  const totalPages = Math.ceil(clips.length / pageSize) || 1;
  const startIdx = (page - 1) * pageSize;
  const visibleItems = clips.slice(startIdx, startIdx + pageSize);

  return (
    <section className="evidence-container">
      <div className="grid-layout">
        {visibleItems.map((clip) => (
          <EvidenceCard key={clip._id} clip={clip} />
        ))}
      </div>

      <div className="pagination">
        <span className="pagination-info">
          {startIdx + 1}–{Math.min(startIdx + pageSize, clips.length)} of{" "}
          {clips.length}
        </span>

        <div className="pagination-controls">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((current) => current - 1)}
            aria-label="Previous page"
          >
            ←
          </button>

          <span className="page-number">
            {page} / {totalPages}
          </span>

          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((current) => current + 1)}
            aria-label="Next page"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
