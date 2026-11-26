import { useState, useEffect } from "react";

export default function useAppealSlaTimer(deadline) {
  const calculateRemaining = () =>
    Math.max(0, new Date(deadline).getTime() - Date.now());

  const [remaining, setRemaining] = useState(calculateRemaining);

  useEffect(() => {
    const syncTimer = () => {
      setRemaining(calculateRemaining());
    };

    const interval = setInterval(syncTimer, 1000);

    document.addEventListener("visibilitychange", syncTimer);

    syncTimer();

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", syncTimer);
    };
  }, [deadline]);

  const totalSeconds = Math.floor(remaining / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    remaining,
    formatted: `${days}d ${hours}h ${minutes}m ${seconds}s`,
    expired: remaining <= 0,
  };
}
