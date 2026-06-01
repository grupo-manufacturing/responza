import type { ReactElement, ReactNode } from 'react'
import '@/landing.css'
import { LandingFooterCTA } from '@/components/landing/LandingFooterCTA'
import { LandingNavbar } from '@/components/landing/LandingNavbar'

type LandingPageLayoutProps = {
  children: ReactNode
}

export function LandingPageLayout({ children }: LandingPageLayoutProps): ReactElement {
  return (
    <div className="landing-page">
      <LandingNavbar />
      {children}
      <LandingFooterCTA />
    </div>
  )
}
