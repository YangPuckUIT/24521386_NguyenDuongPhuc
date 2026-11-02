
import { useState } from 'react';
import { PUBG_VN_SQUADS } from './data/pubgSquads';
import { PubgMatchTelemetry } from './components/PubgMatchTelemetry';
import './App.css';

function App() {
  const [selectedSquad, setSelectedSquad] = useState('te');

  return (
    <main className="app">
      <header>
        <p>PUBG VIETNAM SERIES</p>
        <h1>KRAFTON Live Telemetry Radar</h1>
        <p>Simulated squad telemetry dashboard</p>
      </header>

      <nav className="squad-selector" aria-label="Select PUBG squad">
        {PUBG_VN_SQUADS.map((squad) => (
          <button
            key={squad.id}
            type="button"
            className={selectedSquad === squad.id ? 'active' : ''}
            aria-pressed={selectedSquad === squad.id}
            onClick={() => setSelectedSquad(squad.id)}
          >
            {squad.name}
          </button>
        ))}
      </nav>

      <PubgMatchTelemetry squadId={selectedSquad} />
    </main>
  );
}

export default App;
