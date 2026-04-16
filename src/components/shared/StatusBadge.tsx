import type { ReactElement } from 'react'
import { memo } from 'react'

import { Badge } from '@/components/ui/Badge'

export interface StatusBadgeProps {
  label: string
  className: string
}

function StatusBadgeComponent({ label, className }: StatusBadgeProps): ReactElement {
  return (
    <Badge className={`shrink-0 tabular-nums ${className}`}>
      {label}
    </Badge>
  )
}

export const StatusBadge = memo(StatusBadgeComponent)
