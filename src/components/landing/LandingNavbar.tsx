import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Wordmark } from '@/components/landing/primitives'

export function LandingNavbar(): ReactElement {
  return (
    <nav className="landing-navbar">
      <div className="landing-container landing-navbar-inner">
        <Link to="/" className="landing-navbar-logo">
          <Wordmark size={18} />
        </Link>
        <div className="landing-navbar-cta">
          <Link to="/login" className="landing-btn landing-btn-sm landing-btn-primary">
            Sign in
          </Link>
        </div>
      </div>
    </nav>
  )
}