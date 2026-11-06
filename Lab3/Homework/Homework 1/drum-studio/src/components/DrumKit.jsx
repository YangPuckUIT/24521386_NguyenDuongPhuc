import { useDrumAudio } from "../hooks/useDrumAudio";
import { useCallback, useState } from "react";
import DrumPad from "./DrumPad";
import { DRUM_PADS, PAD_MAP } from "../data/drumPads";
import { useDrumKeyboard } from "../hooks/useDrumKeyboard";

export default function DrumKit() {
  const { playSound } = useDrumAudio();
  const [activePads, setActivePads] = useState([]);


const handleTrigger = useCallback((padId) => {
  playSound(padId);

  setActivePads((previous) =>
    previous.includes(padId)
      ? previous
      : [...previous, padId]
  );

  console.log("Key down:", padId);
}, [playSound]);

  const handleRelease = useCallback((padId) => {
    setActivePads((previous) =>
      previous.filter((id) => id !== padId)
    );

    console.log("Key up:", padId);
  }, []);

  useDrumKeyboard(PAD_MAP, handleTrigger, handleRelease);

  return (
    <section aria-labelledby="drum-kit-title">
      <h2 id="drum-kit-title">Drum Pads</h2>

      <div className="drum-grid">
        {DRUM_PADS.map((pad) => (
<DrumPad
  key={pad.id}
  pad={pad}
  isActive={activePads.includes(pad.id)}
  onTrigger={handleTrigger}
  onRelease={handleRelease}
/>
        ))}
      </div>
    </section>
  );
}
