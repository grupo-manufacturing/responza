import type { ReactElement } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/Button'

export function LandingCta(): ReactElement {
  return (
    <section id="cta" className="relative overflow-hidden bg-surface-base px-6 py-14 md:px-10 md:py-16">
      <div className="mx-auto w-full max-w-6xl">
        <div className="relative overflow-hidden rounded-2xl border border-border-muted bg-gradient-to-br from-surface-base via-surface-base to-surface-secondary/60 px-6 py-12 text-center shadow-sm md:px-10">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary/10 blur-3xl" />

          <div className="relative z-10">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-link-secondary">
              Ready to close more deals?
            </p>
            <h2 className="mx-auto max-w-3xl font-display text-4xl font-normal leading-tight tracking-tight text-text-primary md:text-5xl">
              Turn every enquiry into revenue with Responza
            </h2>
            <p className="mx-auto mb-10 mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              Bring leads, quotations, orders, and conversations into one focused workflow your
              team can act on every day.
            </p>

            <Link to="/login">
              <Button
                size="lg"
                className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-10 py-4 text-base text-text-inverse hover:bg-brand-hover"
              >
                Start Now
                <ArrowRight className="h-4 w-4 text-text-inverse" aria-hidden />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}