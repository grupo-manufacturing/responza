import { useState, type ReactElement } from 'react'

export function LandingNavbar(): ReactElement {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <div className="landing-top-banner">
        <div className="landing-container landing-top-banner-inner">
          Get early access - 50% off on your first 6 months. Limited spots.
        </div>
      </div>

      <nav className="landing-navbar">
        <div className="landing-container landing-navbar-inner">
          <a className="landing-navbar-brand" href="/">
            Responza
          </a>

          <button
            type="button"
            className="landing-navbar-toggle"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>

          <div className={`landing-navbar-links ${mobileOpen ? 'landing-navbar-links-open' : ''}`} aria-label="Landing navigation">
            <a className="landing-navbar-link" href="/#integrations">
              Integrations
            </a>
            <a className="landing-navbar-link" href="/#translations">
              Translations
            </a>
            <a className="landing-navbar-link" href="/#channels">
              Features
            </a>
            <a className="landing-navbar-link" href="/blogs">
              Blogs
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}