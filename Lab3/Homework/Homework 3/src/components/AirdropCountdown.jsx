import { usePubgAirdropTimer } from '../hooks/usePubgAirdropTimer'

function formatTime(remainingMs) {
  const totalSeconds = Math.ceil(remainingMs / 1000)

  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const pad = (value) => String(value).padStart(2, '0')

  return {
    days: pad(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
  }
}

export default function AirdropCountdown({
  targetEpochMs,
  serverOffsetMs = 0,
}) {
  const { remainingMs, isLive } = usePubgAirdropTimer(
    targetEpochMs,
    serverOffsetMs
  )

  const time = formatTime(remainingMs)

  return (
    <section className="countdown" aria-label="Airdrop countdown">
      <div className="countdown-heading">
        <span>DROP STATUS</span>
        <strong className={isLive ? 'status-live' : 'status-warmup'}>
          {isLive ? 'AIRDROP LIVE' : 'WARMUP'}
        </strong>
      </div>

      {isLive ? (
        <p className="countdown-live">DROP IS LIVE</p>
      ) : (
        <div className="countdown-units" role="timer" aria-label={`${time.days} days, ${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds remaining`}>
          {Object.entries(time).map(([unit, value]) => (
            <div className="time-unit" key={unit}>
              <strong>{value}</strong>
              <small>{unit.toUpperCase()}</small>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}