import type { ReactElement, ReactNode } from 'react'
import { memo } from 'react'

export interface PageHeaderProps {
  title: string
  action?: ReactNode
  description?: string
}

function PageHeaderComponent({
  title,
  action,
  description = 'Placeholder workspace for this module.',
}: PageHeaderProps): ReactElement {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-border-muted pb-5">
      <div>
        <h1 className="type-section text-text-primary">{title}</h1>
        <p className="type-body-small mt-1 text-slate-600">{description}</p>
      </div>
      {action !== undefined ? <div className="shrink-0">{action}</div> : null}
    </header>
  )
}

export const PageHeader = memo(PageHeaderComponent)
