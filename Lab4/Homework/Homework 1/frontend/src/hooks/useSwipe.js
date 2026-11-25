import { useCallback, useEffect, useRef, useState } from "react";
import {
  createSwipe,
  undoSwipe,
  getSwipes,
  resetSwipes,
} from "../services/api";

class UndoStack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    return this.items.pop();
  }

  isEmpty() {
    return this.items.length === 0;
  }

  clear() {
    this.items = [];
  }
}

function useSwipe(profiles) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipes, setSwipes] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [historyLoading, setHistoryLoading] = useState(true);

  const undoStack = useRef(new UndoStack());

  // Restore swipe history from the backend
  useEffect(() => {
    let cancelled = false;

    const restoreHistory = async () => {
      if (profiles.length === 0) {
        setHistoryLoading(false);
        return;
      }

      setHistoryLoading(true);

      try {
        const history = await getSwipes();

        if (cancelled) return;

        const profileIds = new Set(profiles.map((profile) => profile._id));

        const restoredSwipes = history
          .slice()
          .reverse()
          .filter((item) => item.profile && profileIds.has(item.profile._id))
          .map((item) => ({
            profile: item.profile,
            action: item.action,
          }));

        undoStack.current = new UndoStack();

        restoredSwipes.forEach((item) => {
          undoStack.current.push(item);
        });

        setSwipes(restoredSwipes);
        setCurrentIndex(restoredSwipes.length);
      } catch (err) {
        if (!cancelled) {
          setError(`Unable to restore swipe history: ${err.message}`);
        }
      } finally {
        if (!cancelled) {
          setHistoryLoading(false);
        }
      }
    };

    restoreHistory();

    return () => {
      cancelled = true;
    };
  }, [profiles]);

  // Swipe the current profile
  const swipe = useCallback(
    async (action) => {
      const profile = profiles[currentIndex];

      if (!profile || busy || historyLoading) return;

      setBusy(true);
      setError("");

      try {
        await createSwipe(profile._id, action);

        const swipeRecord = {
          profile,
          action,
        };

        undoStack.current.push(swipeRecord);
        setSwipes((previous) => [...previous, swipeRecord]);
        setCurrentIndex((previous) => previous + 1);
      } catch (err) {
        setError(err.message || "Unable to save your swipe");
      } finally {
        setBusy(false);
      }
    },
    [profiles, currentIndex, busy, historyLoading],
  );

  // Undo the latest swipe
  const undo = useCallback(async () => {
    if (undoStack.current.isEmpty() || busy || historyLoading) return;

    setBusy(true);
    setError("");

    try {
      await undoSwipe();

      const lastSwipe = undoStack.current.pop();

      if (lastSwipe) {
        setSwipes((previous) => previous.slice(0, -1));
        setCurrentIndex((previous) => Math.max(0, previous - 1));
      }
    } catch (err) {
      setError(err.message || "Unable to undo your last swipe");
    } finally {
      setBusy(false);
    }
  }, [busy, historyLoading]);

  // Reset all swipe history
  const reset = useCallback(async () => {
    if (busy || historyLoading) return;

    setBusy(true);
    setError("");

    try {
      await resetSwipes();

      undoStack.current.clear();
      setSwipes([]);
      setCurrentIndex(0);
    } catch (err) {
      setError(err.message || "Unable to reset swipe history");
    } finally {
      setBusy(false);
    }
  }, [busy, historyLoading]);

  const currentProfile = profiles[currentIndex] || null;

  // Calculate game statistics from swipe history
  const stats = {
    liked: swipes.filter((item) => item.action === "like").length,
    rejected: swipes.filter((item) => item.action === "reject").length,
    superLiked: swipes.filter((item) => item.action === "superlike").length,
    remaining: Math.max(0, profiles.length - currentIndex),
  };

  return {
    currentProfile,
    currentIndex,
    stats,
    busy: busy || historyLoading,
    error,
    swipe,
    undo,
    reset,
    canUndo: !undoStack.current.isEmpty() && !historyLoading,
  };
}

export default useSwipe;
