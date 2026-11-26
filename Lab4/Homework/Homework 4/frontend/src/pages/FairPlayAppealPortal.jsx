import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useAppealSlaTimer from "../hooks/useAppealSlaTimer";
import "./Portal.css";

const dossiers = {
  Himass: {
    name: "Himass",
    violations: 4,
    appeals: 2,
    resolved: 1,
  },
  TanVuu: {
    name: "TanVuu",
    violations: 2,
    appeals: 3,
    resolved: 2,
  },
};

function DossierView({ user }) {
  const data = dossiers[user];

  const [deadline] = useState(() => Date.now() + 48 * 60 * 60 * 1000);

  const { formatted, expired } = useAppealSlaTimer(deadline);

  const matrix = useMemo(
    () => ({
      violations: data.violations,
      appeals: data.appeals,
      resolved: data.resolved,
      pending: data.appeals - data.resolved,
    }),
    [data],
  );

  return (
    <section className="dossier">
      <h2>{data.name} Dossier</h2>

      <div className="matrix">
        <div className="matrix-item">
          <span>Violations</span>
          <strong>{matrix.violations}</strong>
        </div>

        <div className="matrix-item">
          <span>Appeals</span>
          <strong>{matrix.appeals}</strong>
        </div>

        <div className="matrix-item">
          <span>Resolved</span>
          <strong>{matrix.resolved}</strong>
        </div>

        <div className="matrix-item">
          <span>Pending</span>
          <strong>{matrix.pending}</strong>
        </div>
      </div>

      <div className="sla-panel">
        <h3>Appeal SLA Countdown</h3>

        <strong>{expired ? "Expired" : formatted}</strong>

        <p>
          {expired
            ? "The appeal review deadline has passed."
            : "Time remaining for appeal review."}
        </p>
      </div>
    </section>
  );
}

export default function FairPlayAppealPortal() {
  return (
    <main className="portal">
      <header className="portal-header">
        <h1>FairPlay Appeal Portal</h1>
        <p>Review player dossiers and appeal status.</p>
      </header>

      <nav className="portal-nav">
        <Link to="/dossier/himass">Himass Dossier</Link>
        <Link to="/dossier/tanvuu">TanVuu Dossier</Link>
        <Link to="/">SwipeDeck</Link>
      </nav>

      <DossierView user="Himass" />
      <DossierView user="TanVuu" />
    </main>
  );
}

export { DossierView };
