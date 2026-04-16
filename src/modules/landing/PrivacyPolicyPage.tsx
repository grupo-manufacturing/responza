import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import { appConfig } from '@/config/app.config'

export function PrivacyPolicyPage(): ReactElement {
  return (
    <main className="bg-surface-base px-6 py-14 text-text-primary md:px-10 md:py-16">
      <div className="mx-auto w-full max-w-4xl">
        <Link to="/" className="text-sm text-link-secondary hover:underline">
          Back to home
        </Link>
        <h1 className="mt-4 font-display text-4xl font-normal tracking-tight md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-slate-500">Last updated: April 16, 2026</p>

        <section className="mt-10 space-y-6 text-slate-700">
          <p>
            This is a sample privacy policy for {appConfig.name}. We will replace this with final
            legal content before production launch.
          </p>
          <p>
            We may collect account details, usage activity, and communication metadata to provide
            platform functionality. We use this information to operate, maintain, and improve the
            service experience.
          </p>
          <p>
            We do not intentionally collect more data than required for product operations. Access
            to data is controlled by role-based permissions and internal security practices.
          </p>
          <p>
            If you have questions about data handling, retention, or deletion requests, contact our
            support team and we will respond with the relevant process details.
          </p>
        </section>
      </div>
    </main>
  )
}
