import type { DragEvent, ReactElement } from 'react'
import { memo, useCallback, useState } from 'react'
import { Camera, Eye, MessageCircle, Pencil, PenLine, Trash2 } from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { AIScoreBadge } from '@/modules/leads/AIScoreBadge'
import type { ID } from '@/types/common.types'
import type { Lead, LeadSource, LeadStatus } from '@/types/lead.types'

const COLUMN_ORDER: readonly LeadStatus[] = [
  'new',
  'contacted',
  'qualified',
  'closed',
] as const

const COLUMN_TITLE: Record<LeadStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  closed: 'Closed',
}

const DRAG_MIME = 'application/x-factoriz-lead-id'

export interface LeadsKanbanBoardProps {
  leads: Lead[]
  onView: (id: ID) => void
  onEdit: (id: ID) => void
  onDelete: (id: ID) => void
  onMoveToStatus: (id: ID, status: LeadStatus) => void
}

function sourceGlyph(source: LeadSource): ReactElement {
  if (source === 'whatsapp') {
    return <MessageCircle className="h-3.5 w-3.5 shrink-0 text-brand-primary" aria-hidden />
  }
  if (source === 'instagram') {
    return <Camera className="h-3.5 w-3.5 shrink-0 text-link-secondary" aria-hidden />
  }
  return <PenLine className="h-3.5 w-3.5 shrink-0 text-slate-500" aria-hidden />
}

interface KanbanCardProps {
  lead: Lead
  isDragging: boolean
  onView: (id: ID) => void
  onEdit: (id: ID) => void
  onDelete: (id: ID) => void
  onLeadDragStart: (event: DragEvent<HTMLElement>, id: ID) => void
  onLeadDragEnd: () => void
}

function KanbanCardComponent({
  lead,
  isDragging,
  onView,
  onEdit,
  onDelete,
  onLeadDragStart,
  onLeadDragEnd,
}: KanbanCardProps): ReactElement {
  return (
    <Card
      draggable
      onDragStart={(event) => {
        onLeadDragStart(event, lead.id)
      }}
      onDragEnd={onLeadDragEnd}
      className={`cursor-grab rounded-mdToken p-3 active:cursor-grabbing ${
        isDragging ? 'opacity-40 ring-2 ring-brand-primary/40' : 'hover:border-brand-primary/35'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            {sourceGlyph(lead.source)}
            <h4 className="truncate text-sm font-semibold text-text-primary">{lead.companyName}</h4>
          </div>
          <p className="mt-0.5 truncate text-xs text-slate-600">{lead.contactName}</p>
        </div>
        <AIScoreBadge score={lead.aiScore} />
      </div>
      <div
        className="mt-2 flex justify-end gap-0.5 border-t border-border-muted pt-2"
        onMouseDown={(event) => {
          event.stopPropagation()
        }}
      >
        <button
          type="button"
          onClick={() => {
            onView(lead.id)
          }}
          className="rounded p-1.5 text-slate-500 transition hover:bg-surface-secondary hover:text-brand-primary"
          aria-label={`View ${lead.companyName}`}
        >
          <Eye className="h-3.5 w-3.5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => {
            onEdit(lead.id)
          }}
          className="rounded p-1.5 text-slate-500 transition hover:bg-surface-secondary hover:text-link-secondary"
          aria-label={`Edit ${lead.companyName}`}
        >
          <Pencil className="h-3.5 w-3.5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => {
            onDelete(lead.id)
          }}
          className="rounded p-1.5 text-slate-500 transition hover:bg-red-50 hover:text-red-700"
          aria-label={`Delete ${lead.companyName}`}
        >
          <Trash2 className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>
    </Card>
  )
}

const KanbanCard = memo(KanbanCardComponent)

function LeadsKanbanBoardComponent({
  leads,
  onView,
  onEdit,
  onDelete,
  onMoveToStatus,
}: LeadsKanbanBoardProps): ReactElement {
  const [draggingId, setDraggingId] = useState<ID | null>(null)
  const [dropTarget, setDropTarget] = useState<LeadStatus | null>(null)

  const handleDragStart = useCallback((event: DragEvent<HTMLElement>, id: ID) => {
    event.dataTransfer.setData(DRAG_MIME, id)
    event.dataTransfer.effectAllowed = 'move'
    setDraggingId(id)
  }, [])

  const handleDragEnd = useCallback((): void => {
    setDraggingId(null)
    setDropTarget(null)
  }, [])

  const handleColumnDragOver = useCallback(
    (event: DragEvent<HTMLElement>, status: LeadStatus): void => {
      event.preventDefault()
      event.dataTransfer.dropEffect = 'move'
      setDropTarget(status)
    },
    [],
  )

  const handleColumnDrop = useCallback(
    (event: DragEvent<HTMLElement>, status: LeadStatus): void => {
      event.preventDefault()
      const raw = event.dataTransfer.getData(DRAG_MIME)
      if (raw === '') {
        setDropTarget(null)
        return
      }
      const current = leads.find((lead) => lead.id === raw)
      if (current !== undefined && current.status === status) {
        setDraggingId(null)
        setDropTarget(null)
        return
      }
      onMoveToStatus(raw, status)
      setDraggingId(null)
      setDropTarget(null)
    },
    [leads, onMoveToStatus],
  )

  const handleColumnDragLeave = useCallback((event: DragEvent<HTMLElement>): void => {
    const next = event.relatedTarget as Node | null
    if (next !== null && event.currentTarget.contains(next)) {
      return
    }
    setDropTarget(null)
  }, [])

  return (
    <div className="flex min-h-0 w-full min-w-0 gap-2 overflow-x-hidden pb-2 sm:gap-3 md:gap-4">
      {COLUMN_ORDER.map((status) => {
        const columnLeads = leads.filter((lead) => lead.status === status)
        const isActiveDrop = dropTarget === status && draggingId !== null

        return (
          <section
            key={status}
            className={`flex min-h-0 min-w-0 flex-1 basis-0 flex-col rounded-lg border bg-surface-lightTint transition ${
              isActiveDrop
                ? 'border-brand-primary/50 ring-2 ring-brand-primary/25'
                : 'border-border-muted'
            }`}
            onDragOver={(event) => {
              handleColumnDragOver(event, status)
            }}
            onDrop={(event) => {
              handleColumnDrop(event, status)
            }}
            onDragLeave={handleColumnDragLeave}
          >
            <header className="border-b border-border-muted px-3 py-2.5">
              <h3 className="type-caption uppercase tracking-wide text-slate-600">
                {COLUMN_TITLE[status]}
                <span className="ml-2 font-mono text-slate-500">({columnLeads.length})</span>
              </h3>
            </header>
            <div className="flex min-h-[10rem] flex-1 flex-col gap-2 p-2">
              {columnLeads.map((lead) => (
                <KanbanCard
                  key={lead.id}
                  lead={lead}
                  isDragging={draggingId === lead.id}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onLeadDragStart={handleDragStart}
                  onLeadDragEnd={handleDragEnd}
                />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}

export const LeadsKanbanBoard = memo(LeadsKanbanBoardComponent)
