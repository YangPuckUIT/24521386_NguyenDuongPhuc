import { useState } from 'react'
import AirdropCountdown from './AirdropCountdown'
import { usePubgAirdropTimer } from '../hooks/usePubgAirdropTimer'
import { useOptimisticClaim } from '../hooks/useOptimisticClaim'
import { getDropPhase } from '../utils/dropPhase'

const vndFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
})

export default function DropCard({ drop }) {
  const isTicket = drop.type === 'ticket'

  const [scenario, setScenario] = useState('success')

const { nowEpochMs } = usePubgAirdropTimer(
  drop.dropEpochMs
)

  const {
    stock,
    isClaiming,
    claimStatus,
    message,
    claim,
  } = useOptimisticClaim(drop.remainingStock)

const phase = getDropPhase({
  dropEpochMs: drop.dropEpochMs,
  expiresEpochMs: drop.expiresEpochMs,
  remainingStock: stock,
  nowEpochMs: Date.now(),
})

  const canClaim =
    phase === 'AIRDROP_LIVE' && !isClaiming

  const handleClaim = () => {
    if (!canClaim) return

    void claim(drop.id, scenario)
  }

  return (
    <article
      className={`drop-card ${
        isTicket ? 'ticket-card' : 'crate-card'
      }`}
    >
      <div className="drop-art" aria-hidden="true">
        <span className="drop-art-symbol">
          {isTicket ? 'VIP' : 'G'}
        </span>
      </div>

      <div className="drop-content">
        <span className="drop-category">
          {isTicket
            ? 'CHAMPIONSHIP ACCESS'
            : 'CONTRABAND SUPPLY'}
        </span>

        <h3>{drop.title}</h3>
        <p>{drop.subtitle}</p>

<AirdropCountdown
  targetEpochMs={drop.dropEpochMs}
  phase={phase}
/>

        <div className="drop-details">
          <div>
            <small>PRICE</small>
            <strong>
              {vndFormatter.format(drop.priceVnd)}
            </strong>
          </div>

          <div>
            <small>STOCK</small>
            <strong aria-live="polite">
              {stock} LEFT
            </strong>
          </div>
        </div>

        <div className="claim-controls">
          <label htmlFor={`scenario-${drop.id}`}>
            MOCK API RESPONSE
          </label>

          <select
            id={`scenario-${drop.id}`}
            value={scenario}
            onChange={(event) =>
              setScenario(event.target.value)
            }
            disabled={isClaiming}
          >
            <option value="success">
              200 Success
            </option>
            <option value="conflict">
              409 Conflict
            </option>
            <option value="network">
              Network Error
            </option>
          </select>
        </div>

        <button
          className="claim-button"
          type="button"
          onClick={handleClaim}
          disabled={!canClaim}
        >
          {isClaiming
            ? 'SECURING LOOT...'
            : phase === 'WARMUP'
              ? 'WAITING FOR DROP'
              : phase === 'LOOTED_OUT'
                ? 'LOOTED OUT'
                : 'CLAIM NOW'}
        </button>

        <p
          className={`claim-message claim-${claimStatus}`}
          role={claimStatus === 'error' ? 'alert' : 'status'}
        >
          {message || `DROP PHASE: ${phase}`}
        </p>
      </div>
    </article>
  )
}