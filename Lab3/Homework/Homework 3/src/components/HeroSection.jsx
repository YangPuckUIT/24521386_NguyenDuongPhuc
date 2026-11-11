export default function HeroSection() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-content">
        <span className="eyebrow">KRAFTON × PUBG VIETNAM</span>

        <h1 id="hero-title">
          THE FINAL
          <span> CIRCLE.</span>
        </h1>

        <p>
          The battleground is calling. Secure your finals pass,
          claim exclusive G-Coin loot, and follow Vietnam's elite squads.
        </p>

        <div className="hero-actions">
          <a href="#drops" className="primary-button">
            EXPLORE AIRDROPS
          </a>
          <a href="#leaderboard" className="secondary-button">
            VIEW STANDINGS
          </a>
        </div>
      </div>

      <div className="hero-stamp" aria-hidden="true">
        <strong>WINNER WINNER</strong>
        <span>CHICKEN DINNER</span>
      </div>
    </section>
  )
}