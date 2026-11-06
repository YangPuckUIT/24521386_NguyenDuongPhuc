
import { useCallback, useState } from "react";
import DrumPad from "./DrumPad";
import { DRUM_PADS, PAD_MAP } from "../data/drumPads";
import { useDrumKeyboard } from "../hooks/useDrumKeyboard";

export default function DrumKit() {
  const [activePads, setActivePads] = useState([]);

  const handleTrigger = useCallback((padId) => {
    setActivePads((previous) =>
      previous.includes(padId)
        ? previous
        : [...previous, padId]
    );

    console.log("Key down:", padId);
  }, []);

  const handleRelease = useCallback((padId) => {
    setActivePads((previous) =>
      previous.filter((id) => id !== padId)
    );

    console.log("Key up:", padId);
  }, []);

  useDrumKeyboard(PAD_MAP, handleTrigger, handleRelease);

  const handlePadClick = (padId) => {
    handleTrigger(padId);
    handleRelease(padId);
  };

  return (
    <section aria-labelledby="drum-kit-title">
      <h2 id="drum-kit-title">Drum Pads</h2>

      <div className="drum-grid">
        {DRUM_PADS.map((pad) => (
          <DrumPad
            key={pad.id}
            pad={pad}
            isActive={activePads.includes(pad.id)}
            onTrigger={handlePadClick}
          />
        ))}
      </div>
    </section>
  );
}
