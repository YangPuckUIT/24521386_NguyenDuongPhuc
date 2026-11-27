import { useAppDispatch } from "../context/useAppContext";

export default function ThemeToggle() {
  const dispatch = useAppDispatch();

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={() => dispatch({ type: "TOGGLE_THEME" })}
      aria-label="Toggle theme"
    >
      <span className="theme-toggle-indicator" />
      <span>Switch theme</span>
    </button>
  );
}
