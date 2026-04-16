import type { ReactElement } from 'react'
import { Factory } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { appConfig } from '@/config/app.config'

export function LandingNavbar(): ReactElement {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between rounded-lg border border-border-muted bg-surface-base/95 px-5 py-4 backdrop-blur-sm">
      <div className="inline-flex items-center gap-2.5 font-sans text-xl font-semibold tracking-tight text-brand-primary">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-primary">
          <Factory className="h-3.5 w-3.5 text-text-inverse" aria-hidden />
        </span>
        {appConfig.name}
      </div>

      <Link to="/login">
        <Button
          variant="blueBordered"
          size="sm"
          className="rounded-full border-brand-primary px-5 text-brand-primary hover:bg-brand-primary hover:!text-text-inverse"
        >
          Sign in
        </Button>
      </Link>
    </header>
  )
}