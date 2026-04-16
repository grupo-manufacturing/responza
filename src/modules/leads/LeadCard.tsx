import type { ChangeEvent, ReactElement } from 'react'
import { memo } from 'react'
import { Camera, Eye, MessageCircle, Pencil, PenLine, Trash2 } from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { Select } from '@/components/ui/Select'
import { AIScoreBadge } from '@/modules/leads/AIScoreBadge'
import type { ID } from '@/types/common.types'
import type { Lead, LeadSource, LeadStatus } from '@/types/lead.types'

export interface LeadCardProps {
  lead: Lead
  onView: (id: ID) => void
  onEdit: (id: ID) => void
  onDelete: (id: ID) => void
  onStatusChange: (id: ID, status: LeadStatus) => void
}

function sourceIcon(source: LeadSource): ReactElement {
  if (source === 'whatsapp') {
    return <MessageCircle className="h-4 w-4 text-brand-primary" aria-hidden />
  }
  if (source === 'instagram') {
    return <Camera className="h-4 w-4 text-link-secondary" aria-hidden />
  }
  return <PenLine className="h-4 w-4 text-slate-500" aria-hidden />
}

function sourceLabel(source: LeadSource): string {
  if (source === 'whatsapp') {
    return 'WhatsApp'
  }
  if (source === 'instagram') {
    return 'Instagram'
  }
  return 'Manual'
}

function LeadCardComponent({
  lead,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
}: LeadCardProps): ReactElement {
  function handleStatusChange(event: ChangeEvent<HTMLSelectElement>): void {
    onStatusChange(lead.id, event.target.value as LeadStatus)
  }

  return (
    <Card className="rounded-lg p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 text-slate-600" title={sourceLabel(lead.source)}>
              {sourceIcon(lead.source)}
              <span className="sr-only">{sourceLabel(lead.source)}</span>
            </span>
            <h3 className="truncate text-base font-semibold text-text-primary">{lead.companyName}</h3>
          </div>
          <p className="mt-1 truncate text-sm text-slate-600">{lead.contactName}</p>
          <p className="mt-0.5 truncate text-xs text-slate-500">{lead.email}</p>
        </div>
        <AIScoreBadge score={lead.aiScore} />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border-muted pt-3">
        <label className="flex items-center gap-2 text-xs text-slate-500">
          <span className="font-medium uppercase tracking-wide">Status</span>
          <Select
            value={lead.status}
            onChange={handleStatusChange}
            className="mt-0 min-w-[8rem] px-2 py-1 text-sm"
            aria-label={`Status for ${lead.companyName}`}
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="closed">Closed</option>
          </Select>
        </label>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => {
              onView(lead.id)
            }}
            className="rounded-mdToken p-2 text-slate-500 transition hover:bg-surface-secondary hover:text-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
            aria-label={`View ${lead.companyName}`}
          >
            <Eye className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => {
              onEdit(lead.id)
            }}
            className="rounded-mdToken p-2 text-slate-500 transition hover:bg-surface-secondary hover:text-link-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
            aria-label={`Edit ${lead.companyName}`}
          >
            <Pencil className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => {
              onDelete(lead.id)
            }}
            className="rounded-mdToken p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
            aria-label={`Delete ${lead.companyName}`}
          >
            <Trash2 className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </Card>
  )
}

export const LeadCard = memo(LeadCardComponent)
