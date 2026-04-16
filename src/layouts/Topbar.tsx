import type { ReactElement } from 'react'
import { memo } from 'react'

export interface TopbarUser {
  readonly name: string
  readonly email: string
}

export interface TopbarProps {
  /** When empty, the bar stays a height-aligned strip with no left label. */
  readonly title?: string
}

function TopbarComponent({ title = '' }: TopbarProps): ReactElement {
  const hasTitle = title.trim().length > 0

  return (
    <header className="section-light flex h-[3.75rem] shrink-0 items-center gap-4 border-b border-border-muted bg-surface-base px-px16 lg:px-px24">
      {hasTitle ? (
        <span className="type-caption truncate tracking-wide text-slate-600">
          {title}
        </span>
      ) : (
        <span className="min-w-0 flex-1" aria-hidden />
      )}
    </header>
  )
}

export const Topbar = memo(TopbarComponent)
