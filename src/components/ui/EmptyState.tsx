import type { ReactElement, ReactNode } from 'react'
import { memo } from 'react'

export interface EmptyStateProps {
  title: string
  description: string
  icon?: ReactNode
  compact?: boolean
}

function EmptyStateComponent({
  title,
  description,
  icon,
  compact = false,
}: EmptyStateProps): ReactElement {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-mdToken border border-dashed border-border-muted bg-surface-lightTint px-6 text-center ${
        compact ? 'py-8' : 'py-14'
      }`}
    >
      {icon !== undefined ? (
        <div
          className={`flex rounded-mdToken border border-border-muted bg-surface-secondary text-slate-600 ${
            compact ? 'mb-3 p-2' : 'mb-4 p-3'
          }`}
        >
          {icon}
        </div>
      ) : null}
      <h2
        className={`type-feature text-text-primary ${compact ? 'text-sm' : 'text-base'}`}
      >
        {title}
      </h2>
      <p
        className={`type-body-small mt-2 max-w-md text-slate-600 ${
          compact ? 'text-xs' : 'text-sm'
        }`}
      >
        {description}
      </p>
    </div>
  )
}

export const EmptyState = memo(EmptyStateComponent)
