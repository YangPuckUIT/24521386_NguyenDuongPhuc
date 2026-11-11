export default function ArenaHeader() {
  return (
    <header className="arena-header">
      <a className="brand" href="#home" aria-label="PUBG Vietnam Arena home">
        <span className="brand-mark">P</span>
        <span>
          <strong>PUBG VIETNAM</strong>
          <small>CHAMPIONSHIP ARENA</small>
        </span>
      </a>

      <nav className="arena-nav" aria-label="Main navigation">
        <a href="#drops">AIRDROPS</a>
        <a href="#leaderboard">LEADERBOARD</a>
        <a href="#killfeed">KILL FEED</a>
      </nav>

      <span className="season-badge">PVS FINALS</span>
    </header>
  )
}