export default function Leaderboard({ standings }) {
  const ranked = [...standings].sort(
    (a, b) =>
      b.placementPts + b.killPts -
      (a.placementPts + a.killPts)
  )

  return (
    <section id="leaderboard" className="panel" aria-labelledby="leaderboard-title">
      <div className="section-heading">
        <div>
          <span className="eyebrow">THE CONTENDERS</span>
          <h2 id="leaderboard-title">PVS LEADERBOARD</h2>
        </div>
        <span className="mock-label">DEMO STANDINGS</span>
      </div>

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
            {ranked.map((squad, index) => (
              <tr key={squad.squadId}>
                <td className="rank-cell">#{index + 1}</td>
                <td className="squad-cell">{squad.squadName}</td>
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
    </section>
  )
}