import { useDrumAudio } from "../hooks/useDrumAudio";
import { useCallback, useRef, useState } from "react";
import DrumPad from "./DrumPad";
import { DRUM_PADS, PAD_MAP, PAD_ID_MAP } from "../data/drumPads";
import { useDrumKeyboard } from "../hooks/useDrumKeyboard";
import HitHistory from "./HitHistory";

export default function DrumKit() {
  const [hits, setHits] = useState([]);
  const nextHitId = useRef(0);
  const { playSound } = useDrumAudio();
  const [activePads, setActivePads] = useState([]);



const handleTrigger = useCallback((padId) => {
  playSound(padId);

  setActivePads((previous) =>
    previous.includes(padId)
      ? previous
      : [...previous, padId]
  );

  // Task 6: Save recent drum hits
const pad = PAD_ID_MAP.get(padId);

  if (pad) {
    nextHitId.current += 1;

    const hitId = nextHitId.current;

    setHits((previous) => [
      {
        id: hitId,
        key: pad.key,
        name: pad.name,
      },
      ...previous,
    ].slice(0, 5));
  }

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

    {/* Task 6: Recent Hit History */}
    <HitHistory hits={hits} />
  </section>
);
}
