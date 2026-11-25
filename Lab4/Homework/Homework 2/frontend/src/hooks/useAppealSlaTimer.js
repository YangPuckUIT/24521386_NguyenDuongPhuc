import { useEffect, useState } from "react";

const getRemainingTime = (deadline) => {
  const difference = deadline - Date.now();

  return Math.max(0, Math.ceil(difference / 1000));
};

export default function useAppealSlaTimer(deadline) {
  const [remainingSeconds, setRemainingSeconds] = useState(() =>
    getRemainingTime(deadline),
  );

  useEffect(() => {
    if (!deadline) {
      setRemainingSeconds(0);
      return;
    }

    const updateRemainingTime = () => {
      setRemainingSeconds(getRemainingTime(deadline));
    };

    updateRemainingTime();

    const intervalId = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(intervalId);
  }, [deadline]);

  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;

  return {
    remainingSeconds,
    hours,
    minutes,
    seconds,
    isExpired: remainingSeconds === 0,
    formattedTime: [
      String(hours).padStart(2, "0"),
      String(minutes).padStart(2, "0"),
      String(seconds).padStart(2, "0"),
    ].join(":"),
  };
}
