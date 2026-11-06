import "./App.css";
import DrumKit from "./components/DrumKit";

export default function App() {
  return (
    <main>
      <h1>Production Studio Drum Kit</h1>
      <p>Play the drums using your keyboard or mouse.</p>

      {/* Temporary input for keyboard isolation testing */}
      <input
        type="text"
        aria-label="Keyboard isolation test"
        placeholder="Type W, A, S, D, J, K, L here..."
      />

      <DrumKit />
    </main>
  );
}
