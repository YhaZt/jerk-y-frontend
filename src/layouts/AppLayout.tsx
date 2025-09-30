import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

const AppLayout = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsMobileNavOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const className = 'lock-scroll'
    if (isMobileNavOpen) {
      document.body.classList.add(className)
    } else {
      document.body.classList.remove(className)
    }

    return () => {
      document.body.classList.remove(className)
    }
  }, [isMobileNavOpen])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileNavOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="layout-shell">
      <header className={`layout-header ${isMobileNavOpen ? 'has-mobile-open' : ''}`}>
        <div className="layout-brand">
          <div className="brand-mark" aria-hidden>
            TRJ
          </div>
          <div>
            <p className="brand-label">TraceSmart Rabbit Jerky</p>
            <span className="brand-sub">Smart drying chamber telemetry</span>
          </div>
        </div>
        <button
          type="button"
          className={`nav-toggle ${isMobileNavOpen ? 'is-open' : ''}`}
          aria-expanded={isMobileNavOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMobileNavOpen((open) => !open)}
        >
          <span className="nav-toggle__bar" aria-hidden />
          <span className="nav-toggle__bar" aria-hidden />
          <span className="nav-toggle__label">Menu</span>
        </button>
        <nav id="primary-navigation" className={`layout-nav ${isMobileNavOpen ? 'is-open' : ''}`}>
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Home
          </NavLink>
          <NavLink to="/dashboard" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Dashboard
          </NavLink>
          <NavLink to="/product-tracker" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Product Tracker
          </NavLink>
          <NavLink to="/batch-history" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Batch history
          </NavLink>
          <NavLink to="/alerts" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Alerts
          </NavLink>
        </nav>
        <button
          type="button"
          aria-hidden={!isMobileNavOpen}
          className={`nav-overlay ${isMobileNavOpen ? 'is-open' : ''}`}
          onClick={() => setIsMobileNavOpen(false)}
        >
          <span className="nav-overlay__label">Close navigation</span>
        </button>
      </header>
      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
