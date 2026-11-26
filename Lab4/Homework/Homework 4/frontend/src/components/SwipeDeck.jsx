import { useState, useRef } from "react";

const profiles = [
  { id: 1, name: "Minh Anh", age: 21, bio: "Coffee and sunsets." },
  { id: 2, name: "Thu Hà", age: 22, bio: "Music lover and traveler." },
  { id: 3, name: "Ngọc", age: 20, bio: "Looking for good conversations." },
  { id: 4, name: "Linh", age: 23, bio: "Books, food, and weekend trips." },
];

const SCORE_MAP = {
  LIKE: 10,
  PASS: -5,
  SUPERLIKE: 15,
};

export default function SwipeDeck() {
  const [history, setHistory] = useState([]);
  const startPos = useRef(null);

  const currentIndex = history.length;
  const currentProfile = profiles[currentIndex];

  // Derived state: score is calculated from history
  const score = history.reduce(
    (total, action) => total + SCORE_MAP[action.type],
    0,
  );

  const swipe = (type) => {
    if (!currentProfile) return;

    setHistory((prev) => [
      ...prev,
      {
        profileId: currentProfile.id,
        type,
      },
    ]);
  };

  // LIFO undo: remove the most recent action
  const undoLastSwipe = () => {
    setHistory((prev) => prev.slice(0, -1));
  };

  const handleKeyDown = (e) => {
    if (e.target.tagName === "BUTTON") return;

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        swipe("PASS");
        break;

      case "ArrowRight":
        e.preventDefault();
        swipe("LIKE");
        break;

      case "ArrowUp":
        e.preventDefault();
        swipe("SUPERLIKE");
        break;

      case "Backspace":
        e.preventDefault();
        undoLastSwipe();
        break;

      default:
        break;
    }
  };

  const handlePointerDown = (e) => {
    startPos.current = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  const handlePointerUp = (e) => {
    if (!startPos.current) return;

    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;

    startPos.current = null;

    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      swipe(dx > 0 ? "LIKE" : "PASS");
    } else if (dy < -50) {
      swipe("SUPERLIKE");
    }
  };

  return (
    <main className="deck" onKeyDown={handleKeyDown} tabIndex={0}>
      <header className="deck-header">
        <h1>Hen Ho Nhung Khong Yeu</h1>
        <p>Find your next connection.</p>
      </header>

      <div className="score-panel">
        <span>Current Score</span>
        <strong>{score}</strong>
      </div>

      {currentProfile ? (
        <article
          className="profile-card"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          <div className="avatar">{currentProfile.name.charAt(0)}</div>

          <div className="profile-info">
            <h2>
              {currentProfile.name}, {currentProfile.age}
            </h2>
            <p>{currentProfile.bio}</p>
          </div>

          <div className="actions">
            <button className="pass" onClick={() => swipe("PASS")}>
              Pass
            </button>

            <button className="superlike" onClick={() => swipe("SUPERLIKE")}>
              Super Like
            </button>

            <button className="like" onClick={() => swipe("LIKE")}>
              Like
            </button>
          </div>
        </article>
      ) : (
        <section className="finished">
          <h2>All profiles reviewed!</h2>
          <p>Your final score: {score}</p>

          <button onClick={() => setHistory([])}>Start Again</button>
        </section>
      )}

      <button
        className="undo-button"
        disabled={history.length === 0}
        onClick={undoLastSwipe}
      >
        Undo Last Swipe
      </button>

      <footer className="keyboard-help">
        ← Pass &nbsp; · &nbsp; → Like &nbsp; · &nbsp; ↑ Super Like &nbsp; ·
        &nbsp; Backspace Undo
      </footer>
    </main>
  );
}
