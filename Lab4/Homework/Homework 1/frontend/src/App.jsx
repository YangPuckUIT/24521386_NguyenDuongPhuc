import { useEffect, useState } from "react";
import "./App.css";
import ProfileCard from "./components/ProfileCard";
import { getProfiles } from "./services/api";
import useSwipe from "./hooks/useSwipe";

function App() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const data = await getProfiles();
        setProfiles(data);
      } catch (err) {
        setLoadError(err.message || "Unable to load profiles");
      } finally {
        setLoading(false);
      }
    };

    loadProfiles();
  }, []);

  const {
    currentProfile,
    currentIndex,
    stats,
    busy,
    error,
    swipe,
    undo,
    reset,
    canUndo,
  } = useSwipe(profiles);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event) => {
      const target = event.target;

      const isTyping =
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

      if (isTyping || busy || loading || loadError) return;

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          swipe("reject");
          break;

        case "ArrowRight":
          event.preventDefault();
          swipe("like");
          break;

        case "ArrowUp":
          event.preventDefault();
          swipe("superlike");
          break;

        case "Backspace":
          event.preventDefault();
          undo();
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [swipe, undo, busy, loading, loadError]);

  // Derived score
  const score = stats.liked * 10 + stats.superLiked * 20 - stats.rejected * 5;

  const totalProfiles = profiles.length;
  const totalSwipes = stats.liked + stats.rejected + stats.superLiked;

  const handleReset = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset the game? All swipe history will be deleted.",
    );

    if (confirmed) {
      await reset();
    }
  };

  return (
    <main className="app">
      <header className="app-header">
        <div>
          <p className="eyebrow">A LITTLE GAME OF CHOICES</p>
          <h1>Hẹn Hò Nhưng Không Yêu</h1>
          <p className="subtitle">Swipe through profiles. Make your choices.</p>
        </div>

        <div className="round-badge">
          ROUND {String(currentIndex + 1).padStart(2, "0")}
        </div>
      </header>

      <section className="game-layout">
        <aside className="stats-panel">
          <h2>Your stats</h2>

          <div className="stat-item">
            <span>Liked</span>
            <strong>{stats.liked}</strong>
          </div>

          <div className="stat-item">
            <span>Rejected</span>
            <strong>{stats.rejected}</strong>
          </div>

          <div className="stat-item">
            <span>Super liked</span>
            <strong>{stats.superLiked}</strong>
          </div>

          <div className="stat-item">
            <span>Remaining</span>
            <strong>{stats.remaining}</strong>
          </div>
        </aside>

        <section className="deck-section">
          <div className="deck-heading">
            <span>YOUR NEXT POSSIBILITY</span>
            <span>
              {String(Math.min(currentIndex + 1, totalProfiles)).padStart(
                2,
                "0",
              )}
              {" / "}
              {String(totalProfiles).padStart(2, "0")}
            </span>
          </div>

          {loading ? (
            <div className="deck-message">
              <p>Finding your next possibility...</p>
            </div>
          ) : loadError ? (
            <div className="deck-message error-message">
              <h2>Unable to load profiles</h2>
              <p>{loadError}</p>
              <button onClick={() => window.location.reload()}>
                Try again
              </button>
            </div>
          ) : totalProfiles === 0 ? (
            <div className="deck-message">
              <h2>No profiles available</h2>
              <p>Add some profiles to start playing.</p>
            </div>
          ) : currentProfile ? (
            <ProfileCard
              profile={currentProfile}
              onSwipe={swipe}
              disabled={busy}
            />
          ) : (
            <div className="deck-message">
              <h2>That's everyone!</h2>
              <p>You have gone through all {totalProfiles} profiles.</p>

              <button
                className="reset-button"
                type="button"
                onClick={handleReset}
                disabled={busy || totalSwipes === 0}
              >
                Start Over
              </button>
            </div>
          )}

          {error && <p className="action-error">{error}</p>}

          <div className="swipe-controls">
            <button
              className="swipe-button reject"
              type="button"
              disabled={!currentProfile || busy}
              onClick={() => swipe("reject")}
            >
              ✕<span>Reject</span>
            </button>

            <button
              className="swipe-button undo"
              type="button"
              disabled={!canUndo || busy}
              onClick={undo}
            >
              ↶<span>Undo</span>
            </button>

            <button
              className="swipe-button superlike"
              type="button"
              disabled={!currentProfile || busy}
              onClick={() => swipe("superlike")}
            >
              ★<span>Super Like</span>
            </button>

            <button
              className="swipe-button like"
              type="button"
              disabled={!currentProfile || busy}
              onClick={() => swipe("like")}
            >
              ♥<span>Like</span>
            </button>
          </div>

          <p className="keyboard-hint">
            ← Reject · → Like · ↑ Super Like · Backspace Undo
          </p>
        </section>

        <aside className="score-panel">
          <h2>Your score</h2>
          <strong className="score-value">{score}</strong>
          <p>Points earned</p>
          <div className="score-divider" />
          <p className="score-description">
            Likes +10 · Super Likes +20 · Rejects -5
          </p>
        </aside>
      </section>
    </main>
  );
}

export default App;
