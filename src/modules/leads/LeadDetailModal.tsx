import type { ChangeEvent, ReactNode } from 'react'
import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { useServices } from '@/hooks/useServices'
import { useLeads } from '@/hooks/useLeads'
import { useToast } from '@/hooks/useToast'
import { AIScoreBadge } from '@/modules/leads/AIScoreBadge'
import type { ID } from '@/types/common.types'
import type { LeadStatus } from '@/types/lead.types'

export interface LeadDetailModalProps {
  leadId: ID | null
  onClose: () => void
}

export function LeadDetailModal({ leadId, onClose }: LeadDetailModalProps): ReactNode {
  const { leads, updateLeadStatus } = useLeads()
  const { communications } = useServices()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const lead = useMemo(() => {
    if (leadId === null) {
      return null
    }
    return leads.find((row) => row.id === leadId) ?? null
  }, [leads, leadId])

  const linkedConversationId = useMemo((): ID | null => {
    if (lead === null) {
      return null
    }
    const match =
      communications
        .getConversations()
        .find((conversation) => conversation.leadId === lead.id) ?? null
    return match?.id ?? null
  }, [communications, lead])

  const handleStatusChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>): void => {
      if (leadId === null) {
        return
      }
      const ok = updateLeadStatus(leadId, event.target.value as LeadStatus)
      if (ok) {
        showToast({ message: 'Lead status updated' })
      } else {
        showToast({ message: 'Could not update lead status', type: 'error' })
      }
    },
    [leadId, showToast, updateLeadStatus],
  )

  const handleViewConversation = useCallback((): void => {
    if (linkedConversationId === null) {
      return
    }
    onClose()
    navigate('/communications', {
      state: { openConversationId: linkedConversationId },
    })
  }, [linkedConversationId, navigate, onClose])

  if (leadId === null) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[45] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-text-primary/50 backdrop-blur-sm"
        aria-label="Close lead details"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-detail-title"
        className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-border-muted bg-surface-base p-6 shadow-2xl"
      >
        {lead === null ? (
          <p className="type-body-small text-slate-600" role="status">
            Lead not found. It may have been deleted.
          </p>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 id="lead-detail-title" className="type-feature text-text-primary">
                  {lead.companyName}
                </h2>
                <p className="type-body-small mt-1 text-slate-600">{lead.contactName}</p>
              </div>
              <AIScoreBadge score={lead.aiScore} />
            </div>

            <dl className="mt-6 space-y-3 text-sm">
              <div>
                <dt className="type-caption uppercase tracking-wide text-slate-600">
                  Email
                </dt>
                <dd className="type-body-small mt-0.5 text-text-primary">{lead.email}</dd>
              </div>
              <div>
                <dt className="type-caption uppercase tracking-wide text-slate-600">
                  Phone
                </dt>
                <dd className="type-body-small mt-0.5 text-text-primary">{lead.phone ?? '—'}</dd>
              </div>
              <div>
                <dt className="type-caption uppercase tracking-wide text-slate-600">
                  Source
                </dt>
                <dd className="type-body-small mt-0.5 capitalize text-text-primary">{lead.source}</dd>
              </div>
              <div>
                <dt className="type-caption uppercase tracking-wide text-slate-600">
                  Status
                </dt>
                <dd className="mt-0.5">
                  <Select
                    value={lead.status}
                    onChange={handleStatusChange}
                    className="mt-0"
                    aria-label="Lead status"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="closed">Closed</option>
                  </Select>
                </dd>
              </div>
            </dl>

            {lead.source !== 'manual' ? (
              <div className="mt-6 border-t border-border-muted pt-4">
                <h3 className="type-caption uppercase tracking-wide text-slate-600">
                  Inbound message
                </h3>
                <p className="type-body-small mt-2 whitespace-pre-wrap rounded-mdToken border border-border-muted bg-surface-secondary p-3 text-text-primary">
                  {lead.message}
                </p>
              </div>
            ) : null}

            {linkedConversationId !== null ? (
              <div className="mt-4">
                <Button
                  type="button"
                  onClick={handleViewConversation}
                  className="w-full"
                  variant="blueBordered"
                  size="sm"
                >
                  View Conversation
                </Button>
              </div>
            ) : null}

            <div className="mt-6 flex justify-end">
              <Button
                type="button"
                onClick={onClose}
                variant="blueBordered"
                size="sm"
              >
                Close
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
