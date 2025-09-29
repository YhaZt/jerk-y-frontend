import { NavLink, Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div className="layout-shell">
      <header className="layout-header">
        <div className="layout-brand">
          <div className="brand-mark" aria-hidden>
            JL
          </div>
          <div>
            <p className="brand-label">Jerky Lab Control</p>
            <span className="brand-sub">Smart drying chamber telemetry</span>
          </div>
        </div>
        <nav className="layout-nav">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Home
          </NavLink>
          <NavLink to="/dashboard" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Dashboard
          </NavLink>
          <NavLink to="/batch-history" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Batch history
          </NavLink>
          <NavLink to="/alerts" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Alerts
          </NavLink>
        </nav>
      </header>
      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
