import { useId, useMemo, useState } from 'react'

export default function KillFeed({ events, standings }) {
  const filterId = useId()
  const [selectedSquad, setSelectedSquad] = useState('all')

  const filteredEvents = useMemo(() => {
    if (selectedSquad === 'all') {
      return events
    }

    return events.filter(
      (event) => event.squad.toLowerCase() === selectedSquad
    )
  }, [events, selectedSquad])

  return (
    <section
      id="killfeed"
      className="panel"
      aria-labelledby="feed-title"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">BATTLEGROUND ACTIVITY</span>
          <h2 id="feed-title">KILL FEED</h2>
        </div>
      </div>

      <div className="control-field killfeed-control">
        <label htmlFor={filterId}>FILTER BY SQUAD</label>

        <select
          id={filterId}
          value={selectedSquad}
          onChange={(event) => setSelectedSquad(event.target.value)}
        >
          <option value="all">All Squads</option>

          {standings.map((squad) => (
            <option key={squad.squadId} value={squad.squadId}>
              {squad.squadName}
            </option>
          ))}
        </select>
      </div>

      <p className="results-count" role="status">
        {filteredEvents.length} combat events
      </p>

      {filteredEvents.length > 0 ? (
        <ol className="kill-feed">
          {filteredEvents.map((event) => (
            <li key={event.id}>
              <span className="feed-squad">{event.squad}</span>
              <strong>{event.player}</strong>
              <span className="feed-action">{event.action}</span>
              <strong>{event.target}</strong>
              <small>{event.weapon}</small>
            </li>
          ))}
        </ol>
      ) : (
        <p className="empty-state">
          No combat events for this squad.
        </p>
      )}

      <p className="feed-note">
        Simulated match events for educational demonstration.
      </p>
    </section>
  )
}