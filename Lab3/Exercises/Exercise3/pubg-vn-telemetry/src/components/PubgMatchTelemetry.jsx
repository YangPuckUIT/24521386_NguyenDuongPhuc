
import { useEffect, useState } from 'react';
import { fetchKraftonPubgTelemetry } from '../services/telemetry';

export function PubgMatchTelemetry({ squadId = 'te' }) {
  const [view, setView] = useState({
    status: 'IDLE',
    data: null,
    error: null,
  });

  const [retryTick, setRetryTick] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    setView({
      status: 'LOADING',
      data: null,
      error: null,
    });

    fetchKraftonPubgTelemetry(squadId, {
      signal: controller.signal,
    })
      .then((payload) => {
        if (controller.signal.aborted) return;

        setView({
          status: 'SUCCESS',
          data: payload,
          error: null,
        });
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        if (controller.signal.aborted) return;

        setView({
          status: 'ERROR',
          data: null,
          error: err.message,
        });
      });

    return () => controller.abort();
  }, [squadId, retryTick]);

  if (view.status === 'IDLE') {
    return <section>Waiting for telemetry...</section>;
  }

if (view.status === 'LOADING') {
  return (
    <section
      className="telemetry-skeleton"
      aria-busy="true"
      aria-label="Loading PUBG squad telemetry"
    >
      <span className="sr-only">
        Syncing KRAFTON Radar...
      </span>
      <div className="skeleton-line skeleton-title" />
      <div className="skeleton-line skeleton-medium" />
      <div className="skeleton-line skeleton-short" />
      <div className="skeleton-line skeleton-medium" />
    </section>
  );
}

  if (view.status === 'ERROR') {
    return (
      <section role="alert">
        <p>Blue-Zone Link Lost: {view.error}</p>
        <button
          type="button"
          onClick={() => setRetryTick((t) => t + 1)}
        >
          Reconnect Satellite (Retry)
        </button>
      </section>
    );
  }

  return (
    <article aria-live="polite">
      <h2>{view.data.name}</h2>
      <p>Map: {view.data.map}</p>
      <p>Phase: {view.data.phase}</p>
      <p>Alive: {view.data.alive}</p>
      <p>Kills: {view.data.kills}</p>
      <p>WWCD Probability: {view.data.wwcdProb}</p>
      <p>Status: {view.data.status}</p>
    </article>
  );
}
