
export default function DrumPad({
  pad,
  onTrigger,
  onRelease,
  isActive = false,
}) {
  return (
    <button
      type="button"
      className="drum-pad"
      aria-label={`${pad.name}, shortcut ${pad.key}`}
      aria-pressed={isActive}
      onPointerDown={(event) => {
        if (event.button !== 0) return;
        onTrigger(pad.id);
      }}
      onPointerUp={() => onRelease(pad.id)}
      onPointerCancel={() => onRelease(pad.id)}
      onPointerLeave={() => onRelease(pad.id)}
      onClick={(event) => {
        // Native button activation from Enter / Space.
        if (event.detail === 0) {
          onTrigger(pad.id);
          onRelease(pad.id);
        }
      }}
    >
      <kbd aria-hidden="true">{pad.key}</kbd>
      <span aria-hidden="true">{pad.name}</span>
    </button>
  );
}
