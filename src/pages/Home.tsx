import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-wrapper">
      <section className="home-hero">
        <div className="home-copy">
          <p className="home-badge">Rabbit Jerky Lab Control Suite</p>
          <h1>Keep every jerky batch dialed-in from prep to packaging.</h1>
          <p>
            Monitor climate telemetry, respond to alerts, and review production
            history in one place. Jump into the live dashboard to see humidity,
            temperature, and airflow trends in real time.
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
              <div className="card-gauge__fill" style={{ width: "58%" }} />
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
              <span className="flex items-center gap-1">
                Powered by 
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16" // you can adjust
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="m18.05 21l-2.73-4.74c0-1.73-1.07-2.84-2.37-2.84c-.9 0-1.68.5-2.08 1.24c.33-.19.72-.29 1.13-.29c1.3 0 2.36 1.06 2.36 2.36c0 1.31-1.05 2.38-2.36 2.38h3.3V21H6.79c-.24 0-.49-.09-.67-.28a.95.95 0 0 1 0-1.34l.5-.5c-.34-.15-.62-.38-.9-.62c-.22.5-.72.85-1.3.85a1.425 1.425 0 0 1 0-2.85l.47.08v-1.97a4.73 4.73 0 0 1 4.74-4.74h.02c2.12.01 3.77.84 3.77-.47c0-.93.2-1.3.54-1.82c-.73-.34-1.56-.55-2.43-.55c-.53 0-.95-.42-.95-.95c0-.43.28-.79.67-.91l-.67-.04c-.52 0-.95-.42-.95-.94c0-.53.43-.95.95-.95h.95c2.1 0 3.94 1.15 4.93 2.85l.28-.01c.71 0 1.37.23 1.91.61l.45.38c2.17 1.95 1.9 3.27 1.9 3.28c0 1.28-1.06 2.33-2.35 2.33l-.49-.05v.08c0 1.11-.48 2.1-1.23 2.8L20.24 21zm.11-13.26c-.53 0-.95.42-.95.94c0 .53.42.95.95.95c.52 0 .95-.42.95-.95c0-.52-.43-.94-.95-.94" />
                </svg>
              </span>
            </footer>
          </div>
        </div>
      </section>

      <section className="home-panels">
        <article className="panel">
          <h2>Live telemetry</h2>
          <p>
            Granular sensor readings every five seconds. Keep chamber climate
            inside USDA compliant ranges with instant trend indicators.
          </p>
          <Link to="/dashboard" className="panel-link">
            View real-time dashboard →
          </Link>
        </article>
        <article className="panel">
          <h2>Batch insights</h2>
          <p>
            Compare batches by drying profile, smoke density, and moisture
            endpoints. Spot drifts early and fine-tune your SOP.
          </p>
          <Link to="/batch-history" className="panel-link">
            Explore the history →
          </Link>
        </article>
        <article className="panel">
          <h2>Alert automation</h2>
          <p>
            Build guardrails that message operators when conditions slip.
            Capture acknowledgement trails for compliance.
          </p>
          <Link to="/alerts" className="panel-link">
            Configure alerts →
          </Link>
        </article>
      </section>
    </div>
  );
};

export default Home;
