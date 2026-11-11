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

const PHASE_LABELS = {
  WARMUP: 'WARMUP',
  AIRDROP_LIVE: 'AIRDROP LIVE',
  LOOTED_OUT: 'LOOTED OUT',
  EXPIRED: 'DROP EXPIRED',
}

export default function AirdropCountdown({
  targetEpochMs,
  phase,
}) {
  const { remainingMs } = usePubgAirdropTimer(targetEpochMs)
  const time = formatTime(remainingMs)

  return (
    <section className="countdown" aria-label="Airdrop countdown">
      <div className="countdown-heading">
        <span>DROP STATUS</span>

        <strong
          className={
            phase === 'AIRDROP_LIVE'
              ? 'status-live'
              : 'status-warmup'
          }
        >
          {PHASE_LABELS[phase] ?? 'UNKNOWN'}
        </strong>
      </div>

      {phase === 'WARMUP' ? (
        <div
          className="countdown-units"
          role="timer"
          aria-label={`${time.days} days, ${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds remaining`}
        >
          {Object.entries(time).map(([unit, value]) => (
            <div className="time-unit" key={unit}>
              <strong>{value}</strong>
              <small>{unit.toUpperCase()}</small>
            </div>
          ))}
        </div>
      ) : (
        <p className="countdown-live">
          {PHASE_LABELS[phase]}
        </p>
      )}
    </section>
  )
}