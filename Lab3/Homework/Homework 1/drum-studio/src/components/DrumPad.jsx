
export default function DrumPad({ pad, onTrigger, isActive = false }) {
  return (
    <button
      type="button"
      className="drum-pad"
      aria-pressed={isActive}
      aria-label={`${pad.name}, keyboard ${pad.key}`}
      onClick={() => onTrigger(pad.id)}
    >
      <kbd>{pad.key}</kbd>
      <span>{pad.name}</span>
    </button>
  );
}
