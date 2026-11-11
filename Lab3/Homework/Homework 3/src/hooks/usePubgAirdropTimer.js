import { useEffect, useState } from 'react'

function calculateRemaining(targetEpochMs, serverOffsetMs) {
  return Math.max(
    0,
    targetEpochMs - (Date.now() + serverOffsetMs)
  )
}

export function usePubgAirdropTimer(
  targetEpochMs,
  serverOffsetMs = 0
) {
  const [remainingMs, setRemainingMs] = useState(() =>
    calculateRemaining(targetEpochMs, serverOffsetMs)
  )

  useEffect(() => {
    const syncClock = () => {
      setRemainingMs(
        calculateRemaining(targetEpochMs, serverOffsetMs)
      )
    }

    syncClock()

    const timerId = window.setInterval(syncClock, 200)

    const onWake = () => {
      if (document.visibilityState === 'visible') {
        syncClock()
      }
    }

    document.addEventListener('visibilitychange', onWake)

    return () => {
      window.clearInterval(timerId)
      document.removeEventListener('visibilitychange', onWake)
    }
  }, [targetEpochMs, serverOffsetMs])

  return {
    remainingMs,
    isLive: remainingMs === 0,
  }
}