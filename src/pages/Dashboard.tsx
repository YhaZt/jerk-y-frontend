import {
  calculateStatus,
  formatRange,
  getGaugeFillPercent,
  useTelemetry,
} from '../hooks/useTelemetry'

const Dashboard = () => {
  const { metrics, lastUpdated, batchProgress, stages, chamberStatus } = useTelemetry()

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-copy">
          <p className="facility-badge">Rabbit Jerky Lab • Batch A-42</p>
          <h1>Rabbit Jerky Production Environment</h1>
          <p className="header-subtitle">
            Live climate telemetry from the drying chamber ensures food safety and consistent texture.
          </p>
          <div className={`chamber-status status-${chamberStatus.tone}`}>
            {chamberStatus.label}
          </div>
        </div>
        <div className="header-panel">
          <div className="primary-progress">
            <div className="progress-label">Batch progress</div>
            <div className="progress-value">{Math.round(batchProgress)}%</div>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${Math.min(Math.round(batchProgress), 100)}%` }}
              />
            </div>
          </div>
          <div className="timestamp">
            Last updated{' '}
            <span>
              {lastUpdated.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </span>
          </div>
        </div>
      </header>

      <main className="main-layout">
        <section className="metric-section">
          <div className="section-heading">
            <h2>Critical sensors</h2>
            <p>Target ranges tuned for USDA-compliant jerky production.</p>
          </div>
          <div className="metric-grid">
            {metrics.map((metric) => {
              const status = calculateStatus(metric.value, metric.targetRange)
              const gaugePercent = getGaugeFillPercent(metric.value, metric.targetRange)

              return (
                <article key={metric.id} className={`metric-card status-${status}`}>
                  <div className="metric-card__heading">
                    <h3>{metric.label}</h3>
                    <div className="metric-value">
                      {metric.value.toFixed(1)}
                      <span>{metric.unit}</span>
                    </div>
                  </div>
                  <div className="metric-card__body">
                    <div className="metric-target">Target: {formatRange(metric.targetRange, metric.unit)}</div>
                    <div className="metric-trend" data-trend={metric.trend}>
                      {metric.trend === 'up' && '▲ Trending up'}
                      {metric.trend === 'down' && '▼ Trending down'}
                      {metric.trend === 'steady' && '■ Stable'}
                    </div>
                    <div className="metric-gauge" aria-hidden>
                      <div className="metric-gauge__fill" style={{ width: `${gaugePercent}%` }} />
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <aside className="side-column">
          <section className="process-section">
            <div className="section-heading">
              <h2>Process timeline</h2>
              <p>Track each phase to match your production SOP.</p>
            </div>
            <ol className="stage-list">
              {stages.map((stage) => (
                <li key={stage.id} className={`stage-item stage-${stage.status}`}>
                  <div className="stage-indicator" aria-hidden />
                  <div>
                    <div className="stage-name">{stage.name}</div>
                    <p className="stage-description">{stage.description}</p>
                  </div>
                  <span className="stage-progress">{stage.completesAt}%</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="setpoint-section">
            <div className="section-heading compact">
              <h2>Operator notes</h2>
            </div>
            <ul className="setpoint-list">
              <li>
                Increase airflow if humidity drifts above 36% for more than 10 minutes.
              </li>
              <li>
                Smoke density above 18&nbsp;ppm can introduce bitterness—reduce wood feed.
              </li>
              <li>Target moisture is 25% before entering the cooling/rest cycle.</li>
            </ul>
          </section>
        </aside>
      </main>
    </div>
  )
}

export default Dashboard
