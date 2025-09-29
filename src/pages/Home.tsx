import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="home-wrapper">
      <section className="home-hero">
        <div className="home-copy">
          <p className="home-badge">Jerky Lab Control Suite</p>
          <h1>Keep every jerky batch dialed-in from prep to packaging.</h1>
          <p>
            Monitor climate telemetry, respond to alerts, and review production history in one place.
            Jump into the live dashboard to see humidity, temperature, and airflow trends in real time.
          </p>
          <div className="home-actions">
            <Link to="/dashboard" className="cta-primary">
              Open live dashboard
            </Link>
            <Link to="/batch-history" className="cta-secondary">
              View batch history
            </Link>
          </div>
          <div className="home-metrics">
            <div className="metric-pill">
              <span>Active batch</span>
              <strong>A-42 · Hickory smoke</strong>
            </div>
            <div className="metric-pill">
              <span>Chamber temp</span>
              <strong>64.2 °C</strong>
            </div>
            <div className="metric-pill">
              <span>Humidity window</span>
              <strong>28 – 35%</strong>
            </div>
          </div>
        </div>
        <div className="home-side">
          <div className="home-card">
            <div className="card-top">
              <span className="card-chip">Live production</span>
              <p className="card-title">Batch progress 58%</p>
            </div>
            <div className="card-gauge">
              <div className="card-gauge__fill" style={{ width: '58%' }} />
            </div>
            <div className="card-stats">
              <div>
                <span>Air velocity</span>
                <strong>1.8 m/s</strong>
              </div>
              <div>
                <span>Smoke density</span>
                <strong>13.9 ppm</strong>
              </div>
            </div>
            <footer className="card-footer">
              <span className="pulse" aria-hidden />
              <span>Powered by MinSU i-BIBES</span>
            </footer>
          </div>
        </div>
      </section>

      <section className="home-panels">
        <article className="panel">
          <h2>Live telemetry</h2>
          <p>
            Granular sensor readings every five seconds. Keep chamber climate inside USDA compliant
            ranges with instant trend indicators.
          </p>
          <Link to="/dashboard" className="panel-link">
            View real-time dashboard →
          </Link>
        </article>
        <article className="panel">
          <h2>Batch insights</h2>
          <p>
            Compare batches by drying profile, smoke density, and moisture endpoints. Spot drifts
            early and fine-tune your SOP.
          </p>
          <Link to="/batch-history" className="panel-link">
            Explore the history →
          </Link>
        </article>
        <article className="panel">
          <h2>Alert automation</h2>
          <p>
            Build guardrails that message operators when conditions slip. Capture acknowledgement
            trails for compliance.
          </p>
          <Link to="/alerts" className="panel-link">
            Configure alerts →
          </Link>
        </article>
      </section>
    </div>
  )
}

export default Home
