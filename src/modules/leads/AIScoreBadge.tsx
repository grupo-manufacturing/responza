import type { ReactElement } from 'react'
import { memo } from 'react'

import { getLeadStatusColor } from '@/utils/statusHelpers'

export interface AIScoreBadgeProps {
  score: number
}

function AIScoreBadgeComponent({ score }: AIScoreBadgeProps): ReactElement {
  const colorClass = getLeadStatusColor(score)
  return (
    <span
      className={`type-small inline-flex min-w-[2.5rem] items-center justify-center rounded-full px-2 py-0.5 tabular-nums ${colorClass}`}
    >
      {score}
    </span>
  )
}

export const AIScoreBadge = memo(AIScoreBadgeComponent)
