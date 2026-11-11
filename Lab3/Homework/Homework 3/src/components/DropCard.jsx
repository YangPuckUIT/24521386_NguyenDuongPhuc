const vndFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
})

export default function DropCard({ drop }) {
  const isTicket = drop.type === 'ticket'

  return (
    <article className={`drop-card ${isTicket ? 'ticket-card' : 'crate-card'}`}>
      <div className="drop-art" aria-hidden="true">
        <span className="drop-art-symbol">
          {isTicket ? 'VIP' : 'G'}
        </span>
      </div>

      <div className="drop-content">
        <span className="drop-category">
          {isTicket ? 'CHAMPIONSHIP ACCESS' : 'CONTRABAND SUPPLY'}
        </span>

        <h3>{drop.title}</h3>
        <p>{drop.subtitle}</p>

        <div className="drop-details">
          <div>
            <small>PRICE</small>
            <strong>{vndFormatter.format(drop.priceVnd)}</strong>
          </div>
          <div>
            <small>STOCK</small>
            <strong>{drop.remainingStock} LEFT</strong>
          </div>
        </div>

        <button className="claim-button" type="button" disabled>
          CLAIM UNAVAILABLE
        </button>

        <small className="feature-note">
          Claim system unlocks in Phase 4
        </small>
      </div>
    </article>
  )
}