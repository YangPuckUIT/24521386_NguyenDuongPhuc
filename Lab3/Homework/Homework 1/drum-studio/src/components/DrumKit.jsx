
import DrumPad from "./DrumPad";
import { DRUM_PADS } from "../data/drumPads";

export default function DrumKit() {
  const handleTrigger = (padId) => {
    console.log("Triggered pad:", padId);
  };

  return (
    <section aria-labelledby="drum-kit-title">
      <h2 id="drum-kit-title">Drum Pads</h2>

      <div className="drum-grid">
        {DRUM_PADS.map((pad) => (
          <DrumPad
            key={pad.id}
            pad={pad}
            onTrigger={handleTrigger}
          />
        ))}
      </div>
    </section>
  );
}
