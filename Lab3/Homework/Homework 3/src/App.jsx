import ArenaHeader from './components/ArenaHeader'
import HeroSection from './components/HeroSection'
import DropCard from './components/DropCard'
import Leaderboard from './components/Leaderboard'
import { drops, standings, killFeed } from './data/arenaData'
import './App.css'

export default function App() {
  return (
    <>
      <ArenaHeader />

      <main>
        <HeroSection />

        <section id="drops" className="content-section" aria-labelledby="drops-title">
          <div className="section-heading">
            <div>
              <span className="eyebrow">LIMITED SUPPLY</span>
              <h2 id="drops-title">THE AIRDROP ARENA</h2>
            </div>
            <span className="mock-label">DEMO INVENTORY</span>
          </div>

          <div className="drops-grid">
            {drops.map((drop) => (
              <DropCard key={drop.id} drop={drop} />
            ))}
          </div>
        </section>

        <div className="content-section lower-grid">
          <Leaderboard standings={standings} />

          <section id="killfeed" className="panel" aria-labelledby="feed-title">
            <div className="section-heading">
              <div>
                <span className="eyebrow">BATTLEGROUND ACTIVITY</span>
                <h2 id="feed-title">KILL FEED</h2>
              </div>
            </div>

            <ol className="kill-feed">
              {killFeed.map((event) => (
                <li key={event.id}>
                  <span className="feed-squad">{event.squad}</span>
                  <strong>{event.player}</strong>
                  <span className="feed-action">{event.action}</span>
                  <strong>{event.target}</strong>
                  <small>{event.weapon}</small>
                </li>
              ))}
            </ol>
            <p className="feed-note">Simulated match events for UI demonstration.</p>
          </section>
        </div>
      </main>

      <footer className="arena-footer">
        <strong>PUBG VIETNAM ARENA</strong>
        <span>Unofficial educational demo. Not affiliated with KRAFTON.</span>
      </footer>
    </>
  )
}