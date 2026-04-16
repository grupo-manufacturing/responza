import type { ReactElement } from 'react'
import { memo } from 'react'

export interface SpinnerProps {
  label?: string
  className?: string
}

function SpinnerComponent({
  label = 'Loading',
  className = '',
}: SpinnerProps): ReactElement {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className={`flex flex-col items-center justify-center gap-3 py-10 ${className}`}
    >
      <span
        className="h-9 w-9 animate-spin rounded-full border-2 border-border-muted border-t-brand-primary"
        aria-hidden
      />
      <span className="type-caption text-slate-600">{label}</span>
    </div>
  )
}

export const Spinner = memo(SpinnerComponent)
