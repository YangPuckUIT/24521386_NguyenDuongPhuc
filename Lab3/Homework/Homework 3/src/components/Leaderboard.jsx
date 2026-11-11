import { useId, useMemo, useState } from 'react'

const SORT_OPTIONS = [
  { value: 'total', label: 'Total Points' },
  { value: 'wwcdCount', label: 'WWCD' },
  { value: 'placementPts', label: 'Placement Points' },
  { value: 'killPts', label: 'Kill Points' },
]

export default function Leaderboard({ standings }) {
  const searchId = useId()
  const sortId = useId()

  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('total')

  const filteredStandings = useMemo(() => {
    const query = search.trim().toLowerCase()

    const result = standings.filter((squad) =>
      squad.squadName.toLowerCase().includes(query)
    )

    return result.sort((a, b) => {
      const aValue =
        sortBy === 'total'
          ? a.placementPts + a.killPts
          : a[sortBy]

      const bValue =
        sortBy === 'total'
          ? b.placementPts + b.killPts
          : b[sortBy]

      return bValue - aValue || a.squadName.localeCompare(b.squadName)
    })
  }, [standings, search, sortBy])

  const resetFilters = () => {
    setSearch('')
    setSortBy('total')
  }

  return (
    <section
      id="leaderboard"
      className="panel"
      aria-labelledby="leaderboard-title"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">THE CONTENDERS</span>
          <h2 id="leaderboard-title">PVS LEADERBOARD</h2>
        </div>

        <span className="mock-label">DEMO STANDINGS</span>
      </div>

      <div className="leaderboard-controls">
        <div className="control-field">
          <label htmlFor={searchId}>SEARCH SQUAD</label>

          <input
            id={searchId}
            type="search"
            placeholder="Search Vietnamese squads..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="control-field">
          <label htmlFor={sortId}>SORT BY</label>

          <select
            id={sortId}
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className="reset-button"
          onClick={resetFilters}
        >
          RESET
        </button>
      </div>

      <p className="results-count" role="status">
        {filteredStandings.length} of {standings.length} squads displayed
      </p>

      <div className="table-scroll">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th scope="col">RANK</th>
              <th scope="col">SQUAD</th>
              <th scope="col">WWCD</th>
              <th scope="col">PLACEMENT</th>
              <th scope="col">KILLS</th>
              <th scope="col">TOTAL</th>
            </tr>
          </thead>

          <tbody>
            {filteredStandings.map((squad, index) => (
              <tr key={squad.squadId}>
                <td className="rank-cell">#{index + 1}</td>
                <th scope="row" className="squad-cell">
                  {squad.squadName}
                </th>
                <td>{squad.wwcdCount}</td>
                <td>{squad.placementPts}</td>
                <td>{squad.killPts}</td>
                <td className="total-cell">
                  {squad.placementPts + squad.killPts}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredStandings.length === 0 && (
        <p className="empty-state">
          No squads found. Try another search.
        </p>
      )}
    </section>
  )
}