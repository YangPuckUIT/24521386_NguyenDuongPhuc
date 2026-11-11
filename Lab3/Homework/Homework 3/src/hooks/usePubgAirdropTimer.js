import { useEffect, useState } from 'react'

export function usePubgAirdropTimer(
  targetEpochMs,
  serverOffsetMs = 0
) {
  const [nowEpochMs, setNowEpochMs] = useState(
    () => Date.now() + serverOffsetMs
  )

  useEffect(() => {
    const syncClock = () => {
      setNowEpochMs(Date.now() + serverOffsetMs)
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

  const remainingMs = Math.max(
    0,
    targetEpochMs - nowEpochMs
  )

  return {
    remainingMs,
    isLive: remainingMs === 0,
    nowEpochMs,
  }
}