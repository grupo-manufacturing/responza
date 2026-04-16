import type { ChangeEvent, ReactElement } from 'react'
import { memo } from 'react'
import { Camera, Eye, Filter, MessageCircle, Pencil, PenLine, Trash2 } from 'lucide-react'

import { EmptyState } from '@/components/ui/EmptyState'
import { Select } from '@/components/ui/Select'
import { Table, TableContainer } from '@/components/ui/Table'
import { AIScoreBadge } from '@/modules/leads/AIScoreBadge'
import type { ID } from '@/types/common.types'
import type { Lead, LeadSource, LeadStatus } from '@/types/lead.types'

export interface LeadsTableProps {
  leads: Lead[]
  onView: (id: ID) => void
  onEdit: (id: ID) => void
  onDelete: (id: ID) => void
  onStatusChange: (id: ID, status: LeadStatus) => void
}

function SourceCellComponent({ source }: { source: LeadSource }): ReactElement {
  if (source === 'whatsapp') {
    return (
      <span className="inline-flex items-center gap-1.5 text-brand-primary" title="WhatsApp">
        <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
        <span className="hidden lg:inline">WhatsApp</span>
      </span>
    )
  }
  if (source === 'instagram') {
    return (
      <span className="inline-flex items-center gap-1.5 text-link-secondary" title="Instagram">
        <Camera className="h-4 w-4 shrink-0" aria-hidden />
        <span className="hidden lg:inline">Instagram</span>
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-slate-600" title="Manual">
      <PenLine className="h-4 w-4 shrink-0" aria-hidden />
      <span className="hidden lg:inline">Manual</span>
    </span>
  )
}

const SourceCell = memo(SourceCellComponent)

function LeadsTableComponent({
  leads,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
}: LeadsTableProps): ReactElement {
  if (leads.length === 0) {
    return (
      <EmptyState
        title="Nothing to show here"
        description="No leads are listed for this page. Adjust filters or add a new lead."
        icon={<Filter className="h-10 w-10" aria-hidden />}
      />
    )
  }

  return (
    <TableContainer className="rounded-lg">
      <Table className="min-w-full divide-y divide-border-muted text-left text-sm">
        <thead className="bg-surface-secondary text-xs font-semibold uppercase tracking-wide text-slate-600">
          <tr>
            <th scope="col" className="px-4 py-3">
              Company
            </th>
            <th scope="col" className="px-4 py-3">
              Contact
            </th>
            <th scope="col" className="px-4 py-3">
              Source
            </th>
            <th scope="col" className="px-4 py-3">
              AI
            </th>
            <th scope="col" className="px-4 py-3">
              Status
            </th>
            <th scope="col" className="px-4 py-3 text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-muted text-slate-700">
          {leads.map((lead) => (
            <tr key={lead.id} className="transition hover:bg-surface-secondary">
              <td className="px-4 py-3 font-medium text-text-primary">{lead.companyName}</td>
              <td className="max-w-[140px] truncate px-4 py-3 text-slate-600">{lead.contactName}</td>
              <td className="px-4 py-3">
                <SourceCell source={lead.source} />
              </td>
              <td className="px-4 py-3">
                <AIScoreBadge score={lead.aiScore} />
              </td>
              <td className="px-4 py-3">
                <Select
                  value={lead.status}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    onStatusChange(lead.id, event.target.value as LeadStatus)
                  }}
                  className="mt-0 w-full min-w-[8rem] max-w-[10rem] px-2 py-1.5 text-xs"
                  aria-label={`Status for ${lead.companyName}`}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="closed">Closed</option>
                </Select>
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-1">
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
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  )
}

export const LeadsTable = memo(LeadsTableComponent)
