import type { ReactElement } from 'react'
import { LandingCta } from '@/components/landing/LandingCta'
import { LandingFeatures } from '@/components/landing/LandingFeatures'
import { LandingFooter } from '@/components/landing/LandingFooter'
import { LandingHero } from '@/components/landing/LandingHero'
import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { LandingTestimonials } from '@/components/landing/LandingTestimonials'

export function LandingPage(): ReactElement {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-surface-base text-text-primary">
      <section className="relative mx-auto w-full max-w-6xl px-6 py-6 md:px-10 md:py-8">
        <LandingNavbar />
        <LandingHero />
      </section>
      <LandingFeatures />
      <LandingTestimonials />
      <LandingCta />
      <LandingFooter />
    </main>
  )
}