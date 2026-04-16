import type { ReactElement } from 'react'
import { memo } from 'react'
import { format } from 'date-fns'
import { ChevronRight, UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import type { Lead } from '@/types/lead.types'

export interface RecentActivityFeedProps {
  leads: Lead[]
}

function RecentActivityFeedComponent({ leads }: RecentActivityFeedProps): ReactElement {
  if (leads.length === 0) {
    return (
      <EmptyState
        title="No recent leads"
        description="Create a lead to keep the team updated with the latest pipeline entries."
        icon={<UserPlus className="h-10 w-10" aria-hidden />}
      />
    )
  }

  return (
    <Card className="h-full w-full overflow-hidden rounded-lg p-0">
      <ul className="h-full divide-y divide-border-muted">
      {leads.map((lead) => (
        <li key={lead.id}>
          <Link
            to="/leads"
            className="flex min-h-[84px] items-start gap-3 px-4 py-3 transition hover:bg-surface-secondary"
          >
            <span
              className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-mdToken border border-border-muted bg-surface-secondary text-slate-600"
              aria-hidden
            >
              <UserPlus className="h-4 w-4 text-brand-primary" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="type-body-small block truncate font-semibold text-text-primary">
                {lead.companyName}
              </span>
              <span className="type-small mt-0.5 block text-slate-600">
                Lead · {lead.status} · {lead.source}
              </span>
              <time
                className="type-small mt-1 block text-slate-500"
                dateTime={lead.updatedAt}
              >
                {format(new Date(lead.updatedAt), 'PPp')}
              </time>
            </span>
            <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-slate-500" aria-hidden />
          </Link>
        </li>
      ))}
      </ul>
    </Card>
  )
}

export const RecentActivityFeed = memo(RecentActivityFeedComponent)
