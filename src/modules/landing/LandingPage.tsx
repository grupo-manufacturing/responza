import type { ReactElement } from 'react'
import '@/landing.css'
import { LandingNavbar }      from '@/components/landing/LandingNavbar'
import { LandingHero }        from '@/components/landing/LandingHero'
import { LandingUnifiedInbox } from '@/components/landing/LandingUnifiedInbox'
import { LandingTranslations } from '@/components/landing/LandingTranslations'
import { LandingIntegrations } from '@/components/landing/LandingIntegrations'
import { LandingHowItWorks } from '@/components/landing/LandingHowItWorks'
import { LandingFeatures }    from '@/components/landing/LandingFeatures'
import { LandingFAQ }         from '@/components/landing/LandingFAQ'
import { LandingFooterCTA }   from '@/components/landing/LandingFooterCTA'

export function LandingPage(): ReactElement {
  return (
    <div className="landing-page">
      <LandingNavbar />
      <LandingHero />
      <LandingIntegrations />
      <LandingHowItWorks />
      <LandingUnifiedInbox />
      <LandingTranslations />
      <LandingFeatures />
      <LandingFAQ />
      <LandingFooterCTA />
    </div>
  )
}