import type { ReactElement } from 'react'
import '@/landing.css'
import { LandingNavbar }      from '@/components/landing/LandingNavbar'
import { LandingHero }        from '@/components/landing/LandingHero'
import { LandingUnifiedInbox } from '@/components/landing/LandingUnifiedInbox'
import { LandingTranslations } from '@/components/landing/LandingTranslations'
import { LandingInsights }    from '@/components/landing/LandingInsights'
import { LandingFeatures }    from '@/components/landing/LandingFeatures'
import { LandingFAQ }         from '@/components/landing/LandingFAQ'
import { LandingFooterCTA }   from '@/components/landing/LandingFooterCTA'

export function LandingPage(): ReactElement {
  return (
    <div className="landing-page">
      <LandingNavbar />
      <LandingHero />
      <LandingUnifiedInbox />
      <LandingTranslations />
      <LandingInsights />
      <LandingFeatures />
      <LandingFAQ />
      <LandingFooterCTA />
    </div>
  )
}