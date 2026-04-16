import type { ReactElement } from 'react'
import { Factory } from 'lucide-react'
import { Link } from 'react-router-dom'

import { appConfig } from '@/config/app.config'

export function LandingFooter(): ReactElement {
  return (
    <footer className="border-t border-border-muted bg-surface-base px-6 py-8 md:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="inline-flex items-center gap-2.5 font-sans text-lg font-semibold text-brand-primary">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-primary">
            <Factory className="h-3 w-3 text-text-inverse" aria-hidden />
          </span>
          {appConfig.name}
        </div>

        <div className="flex items-center gap-6">
          <Link to="/privacy-policy" className="text-sm text-slate-500 transition-colors hover:text-slate-800">
            Privacy Policy
          </Link>
          <Link to="/terms-conditions" className="text-sm text-slate-500 transition-colors hover:text-slate-800">
            Terms & Conditions
          </Link>
        </div>

        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} {appConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}