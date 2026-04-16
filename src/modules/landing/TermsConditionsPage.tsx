import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import { appConfig } from '@/config/app.config'

export function TermsConditionsPage(): ReactElement {
  return (
    <main className="bg-surface-base px-6 py-14 text-text-primary md:px-10 md:py-16">
      <div className="mx-auto w-full max-w-4xl">
        <Link to="/" className="text-sm text-link-secondary hover:underline">
          Back to home
        </Link>
        <h1 className="mt-4 font-display text-4xl font-normal tracking-tight md:text-5xl">
          Terms &amp; Conditions
        </h1>
        <p className="mt-3 text-sm text-slate-500">Last updated: April 16, 2026</p>

        <section className="mt-10 space-y-6 text-slate-700">
          <p>
            These sample terms and conditions govern use of {appConfig.name}. This placeholder
            content will be replaced with final legal language.
          </p>
          <p>
            By accessing or using the platform, users agree to use the service lawfully and in a
            manner consistent with product intent. Unauthorized access attempts and misuse are not
            permitted.
          </p>
          <p>
            Service availability, features, and pricing may change over time. We may update these
            terms as product capabilities evolve, with revised versions posted on this page.
          </p>
          <p>
            For account, billing, or contractual questions, contact our support team for official
            assistance and documentation.
          </p>
        </section>
      </div>
    </main>
  )
}
