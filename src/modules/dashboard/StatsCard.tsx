import type { ReactElement, ReactNode } from 'react'
import { memo } from 'react'

import { Card } from '@/components/ui/Card'

export interface StatsCardProps {
  label: string
  value: number | string
  icon: ReactNode
}

function StatsCardComponent({ label, value, icon }: StatsCardProps): ReactElement {
  return (
    <Card className="flex items-center gap-px16 rounded-lg p-px20">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-mdToken border border-border-muted bg-surface-secondary text-brand-primary">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="type-caption uppercase tracking-wide text-slate-600">{label}</p>
        <p className="mt-1 text-2xl font-semibold tabular-nums text-text-primary">{value}</p>
      </div>
    </Card>
  )
}

export const StatsCard = memo(StatsCardComponent)
