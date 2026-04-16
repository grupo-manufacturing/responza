import type { ChangeEvent, ReactElement } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Columns3, Filter, Plus, Table, UserPlus } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { ConfirmDialog } from '@/components/shared/ConfirmDialog'
import { Pagination } from '@/components/shared/Pagination'
import { PageHeader } from '@/components/shared/PageHeader'
import { EmptyState } from '@/components/ui/EmptyState'
import { Spinner } from '@/components/ui/Spinner'
import { useLeads } from '@/hooks/useLeads'
import { useToast } from '@/hooks/useToast'
import { LeadCard } from '@/modules/leads/LeadCard'
import { LeadDetailModal } from '@/modules/leads/LeadDetailModal'
import { LeadForm } from '@/modules/leads/LeadForm'
import { LeadsKanbanBoard } from '@/modules/leads/LeadsKanbanBoard'
import { LeadsTable } from '@/modules/leads/LeadsTable'
import type { ID } from '@/types/common.types'
import type {
  CreateLeadPayload,
  LeadFilterSource,
  LeadFilterStatus,
  LeadFilters,
  LeadStatus,
  UpdateLeadPayload,
} from '@/types/lead.types'

interface LeadsUiState {
  isCreateOpen: boolean
  editingId: ID | null
  deletingId: ID | null
  detailLeadId: ID | null
}

const initialUi: LeadsUiState = {
  isCreateOpen: false,
  editingId: null,
  deletingId: null,
  detailLeadId: null,
}

const defaultFilters: LeadFilters = {
  source: 'all',
  status: 'all',
  minScore: null,
  maxScore: null,
}

type LeadsDisplayMode = 'table' | 'kanban'
const LEADS_PAGE_SIZE = 5

export function LeadsPage(): ReactElement {
  const location = useLocation()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const {
    leads,
    filteredLeads,
    filters,
    setFilters,
    isLoading,
    error,
    createLead,
    updateLead,
    deleteLead,
    updateLeadStatus,
  } = useLeads()

  const [ui, setUi] = useState<LeadsUiState>(initialUi)
  const [displayMode, setDisplayMode] = useState<LeadsDisplayMode>('table')
  const [tablePage, setTablePage] = useState<number>(1)
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false)
  const filterToolbarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTablePage(1)
  }, [filters.source, filters.status, filters.minScore, filters.maxScore])

  useEffect(() => {
    const state = location.state as { openLeadId?: ID } | null
    const leadId = state?.openLeadId
    if (leadId === undefined) {
      return
    }
    setUi((previous) => ({ ...previous, detailLeadId: leadId }))
    navigate(location.pathname, { replace: true, state: null })
  }, [location.pathname, location.state, navigate])

  const leadsTableTotalPages = useMemo((): number => {
    if (filteredLeads.length <= 0) {
      return 1
    }
    return Math.ceil(filteredLeads.length / LEADS_PAGE_SIZE)
  }, [filteredLeads.length])

  useEffect(() => {
    if (tablePage > leadsTableTotalPages) {
      setTablePage(leadsTableTotalPages)
    }
  }, [leadsTableTotalPages, tablePage])

  const paginatedTableLeads = useMemo(() => {
    const start = (tablePage - 1) * LEADS_PAGE_SIZE
    return filteredLeads.slice(start, start + LEADS_PAGE_SIZE)
  }, [filteredLeads, tablePage])

  useEffect(() => {
    if (!isFiltersOpen) {
      return
    }
    function handlePointerDown(event: MouseEvent): void {
      if (
        filterToolbarRef.current !== null &&
        !filterToolbarRef.current.contains(event.target as Node)
      ) {
        setIsFiltersOpen(false)
      }
    }
    document.addEventListener('mousedown', handlePointerDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
    }
  }, [isFiltersOpen])

  const editingLead = useMemo(() => {
    if (ui.editingId === null) {
      return undefined
    }
    return leads.find((row) => row.id === ui.editingId)
  }, [leads, ui.editingId])

  const deletingLead = useMemo(() => {
    if (ui.deletingId === null) {
      return null
    }
    return leads.find((row) => row.id === ui.deletingId) ?? null
  }, [leads, ui.deletingId])

  const closeFormModal = useCallback((): void => {
    setUi((previous) => ({
      ...previous,
      isCreateOpen: false,
      editingId: null,
    }))
  }, [])

  const handleView = useCallback((id: ID) => {
    setUi((previous) => ({ ...previous, detailLeadId: id }))
  }, [])

  const handleEdit = useCallback((id: ID) => {
    setUi((previous) => ({
      ...previous,
      isCreateOpen: false,
      editingId: id,
    }))
  }, [])

  const handleDeleteRequest = useCallback((id: ID) => {
    setUi((previous) => ({ ...previous, deletingId: id }))
  }, [])

  const handleConfirmDelete = useCallback((): void => {
    if (deletingLead === null) {
      return
    }
    const ok = deleteLead(deletingLead.id)
    setUi((previous) => ({
      ...previous,
      deletingId: null,
      detailLeadId:
        previous.detailLeadId === deletingLead.id ? null : previous.detailLeadId,
    }))
    if (ok) {
      showToast({ message: 'Lead removed' })
    } else {
      showToast({ message: 'Could not remove lead', type: 'error' })
    }
  }, [deleteLead, deletingLead, showToast])

  const handleCancelDelete = useCallback((): void => {
    setUi((previous) => ({ ...previous, deletingId: null }))
  }, [])

  const handleOpenCreate = useCallback((): void => {
    setUi((previous) => ({
      ...previous,
      isCreateOpen: true,
      editingId: null,
    }))
  }, [])

  const handleCloseDetail = useCallback((): void => {
    setUi((previous) => ({ ...previous, detailLeadId: null }))
  }, [])

  const handleFormSubmit = useCallback(
    (payload: CreateLeadPayload | UpdateLeadPayload): void => {
      if (ui.isCreateOpen) {
        const ok = createLead(payload as CreateLeadPayload)
        if (ok) {
          showToast({ message: 'Lead created' })
          closeFormModal()
        } else {
          showToast({ message: 'Could not create lead', type: 'error' })
        }
        return
      }
      if (ui.editingId !== null) {
        const ok = updateLead(ui.editingId, payload as UpdateLeadPayload)
        if (ok) {
          showToast({ message: 'Lead updated' })
          closeFormModal()
        } else {
          showToast({ message: 'Could not update lead', type: 'error' })
        }
      }
    },
    [
      closeFormModal,
      createLead,
      showToast,
      ui.editingId,
      ui.isCreateOpen,
      updateLead,
    ],
  )

  const handleStatusChange = useCallback(
    (id: ID, status: LeadStatus) => {
      const ok = updateLeadStatus(id, status)
      if (ok) {
        showToast({ message: 'Lead status updated' })
      } else {
        showToast({ message: 'Could not update lead status', type: 'error' })
      }
    },
    [showToast, updateLeadStatus],
  )

  const handleSourceFilter = useCallback(
    (event: ChangeEvent<HTMLSelectElement>): void => {
      const value = event.target.value as LeadFilterSource
      setFilters((previous) => ({ ...previous, source: value }))
    },
    [setFilters],
  )

  const handleStatusFilter = useCallback(
    (event: ChangeEvent<HTMLSelectElement>): void => {
      const value = event.target.value as LeadFilterStatus
      setFilters((previous) => ({ ...previous, status: value }))
    },
    [setFilters],
  )

  const handleMinScoreChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const raw = event.target.value
      setFilters((previous) => ({
        ...previous,
        minScore: raw === '' ? null : Number(raw),
      }))
    },
    [setFilters],
  )

  const handleMaxScoreChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const raw = event.target.value
      setFilters((previous) => ({
        ...previous,
        maxScore: raw === '' ? null : Number(raw),
      }))
    },
    [setFilters],
  )

  const handleResetFilters = useCallback((): void => {
    setFilters(defaultFilters)
  }, [setFilters])

  const handleLeadsTablePageChange = useCallback((nextPage: number): void => {
    setTablePage(nextPage)
  }, [])

  const isFormOpen = ui.isCreateOpen || ui.editingId !== null
  const formMode = ui.isCreateOpen ? 'create' : 'edit'

  const hasActiveFilters =
    filters.source !== 'all' ||
    filters.status !== 'all' ||
    filters.minScore !== null ||
    filters.maxScore !== null

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="shrink-0 space-y-4">
        <PageHeader
          title="Leads"
          description="Filter the pipeline and manage inbound opportunities."
          action={
            <div ref={filterToolbarRef} className="relative flex shrink-0 flex-wrap items-center justify-end gap-2">
              <div
                className="inline-flex rounded-pill border border-border-muted bg-surface-secondary p-0.5"
                role="group"
                aria-label="Leads view mode"
              >
                <button
                  type="button"
                  onClick={() => {
                    setDisplayMode('table')
                  }}
                  className={`type-button inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-xs transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary sm:text-sm ${
                    displayMode === 'table'
                      ? 'border border-brand-primary bg-brand-primary text-text-inverse'
                      : 'text-slate-600 hover:text-text-primary'
                  }`}
                >
                  <Table className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
                  Table
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDisplayMode('kanban')
                  }}
                  className={`type-button inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-xs transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary sm:text-sm ${
                    displayMode === 'kanban'
                      ? 'border border-brand-primary bg-brand-primary text-text-inverse'
                      : 'text-slate-600 hover:text-text-primary'
                  }`}
                >
                  <Columns3 className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
                  Kanban
                </button>
              </div>
              <Button
                type="button"
                onClick={() => {
                  setIsFiltersOpen((open) => !open)
                }}
                className={`min-h-10 px-4 ${
                  hasActiveFilters
                    ? 'border-brand-primary bg-brand-primary text-text-inverse'
                    : 'text-brand-primary'
                }`}
                variant={hasActiveFilters ? 'darkPill' : 'blueBordered'}
                size="sm"
                aria-expanded={isFiltersOpen}
                aria-controls="leads-filters-panel"
                aria-label="Lead filters"
              >
                <Filter className="h-4 w-4" aria-hidden />
                <span>Filters</span>
              </Button>
              <Button
                type="button"
                onClick={handleOpenCreate}
                variant="primaryPill"
                size="sm"
              >
                <Plus className="h-4 w-4" aria-hidden />
                New Lead
              </Button>

              {isFiltersOpen ? (
                <div
                  id="leads-filters-panel"
                  role="region"
                  aria-label="Filter leads"
                  className="absolute right-0 top-full z-50 mt-2 w-[min(100vw-2rem,22rem)] rounded-lg border border-border-muted bg-surface-base p-4 shadow-xl"
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <h2 className="type-feature text-text-primary">Filters</h2>
                    <Button
                      type="button"
                      onClick={handleResetFilters}
                      variant="blueBordered"
                      size="sm"
                    >
                      Reset
                    </Button>
                  </div>
                  <div className="grid gap-3">
                    <label className="type-caption block uppercase tracking-wide text-slate-600">
                      Source
                      <Select
                        value={filters.source}
                        onChange={handleSourceFilter}
                      >
                        <option value="all">All sources</option>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="instagram">Instagram</option>
                        <option value="manual">Manual</option>
                      </Select>
                    </label>
                    <label className="type-caption block uppercase tracking-wide text-slate-600">
                      Status
                      <Select
                        value={filters.status}
                        onChange={handleStatusFilter}
                      >
                        <option value="all">All statuses</option>
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="closed">Closed</option>
                      </Select>
                    </label>
                    <label className="type-caption block uppercase tracking-wide text-slate-600">
                      Min AI score
                      <input
                        type="number"
                        min={0}
                        max={100}
                        placeholder="Any"
                        value={filters.minScore ?? ''}
                        onChange={handleMinScoreChange}
                        className="type-body-small mt-1.5 w-full rounded-mdToken border border-border-muted bg-surface-base px-3 py-2 text-text-primary outline-none focus-visible:border-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
                      />
                    </label>
                    <label className="type-caption block uppercase tracking-wide text-slate-600">
                      Max AI score
                      <input
                        type="number"
                        min={0}
                        max={100}
                        placeholder="Any"
                        value={filters.maxScore ?? ''}
                        onChange={handleMaxScoreChange}
                        className="type-body-small mt-1.5 w-full rounded-mdToken border border-border-muted bg-surface-base px-3 py-2 text-text-primary outline-none focus-visible:border-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
                      />
                    </label>
                  </div>
                </div>
              ) : null}
            </div>
          }
        />

        {error !== null ? (
          <p className="type-body-small rounded-mdToken border border-red-700/30 bg-red-50 px-4 py-3 text-red-700" role="alert">
            {error}
          </p>
        ) : null}
      </div>

      <div className="scrollbar-none min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain pb-2">
        {isLoading ? (
          <Spinner label="Loading leads" />
        ) : filteredLeads.length === 0 ? (
          leads.length === 0 ? (
            <EmptyState
              title="No leads yet"
              description="Capture opportunities from integrations or add a lead manually to populate your pipeline."
              icon={<UserPlus className="h-10 w-10" aria-hidden />}
            />
          ) : (
            <EmptyState
              title="No leads match your filters"
              description="Adjust or reset filters to see leads in your pipeline."
              icon={<Filter className="h-10 w-10" aria-hidden />}
            />
          )
        ) : displayMode === 'kanban' ? (
          <div className="min-w-0 overflow-x-hidden">
            <LeadsKanbanBoard
              leads={filteredLeads}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDeleteRequest}
              onMoveToStatus={handleStatusChange}
            />
          </div>
        ) : (
          <>
            <div className="hidden md:block">
              <LeadsTable
                leads={paginatedTableLeads}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDeleteRequest}
                onStatusChange={handleStatusChange}
              />
            </div>
            <div className="space-y-3 md:hidden">
              {paginatedTableLeads.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDeleteRequest}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
            <Pagination
              page={tablePage}
              pageSize={LEADS_PAGE_SIZE}
              totalItems={filteredLeads.length}
              onPageChange={handleLeadsTablePageChange}
              ariaLabel="Leads table pagination"
            />
          </>
        )}
      </div>

      {isFormOpen ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-text-primary/50 backdrop-blur-sm"
            aria-label="Close form"
            onClick={closeFormModal}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-form-title"
            className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-slate-300 bg-surface-base p-6 shadow-2xl"
          >
            {formMode === 'edit' && editingLead === undefined ? (
              <Spinner label="Loading" className="py-8" />
            ) : (
              <LeadForm
                key={ui.isCreateOpen ? 'create' : ui.editingId ?? 'edit'}
                mode={formMode}
                initialData={formMode === 'edit' ? editingLead : undefined}
                onSubmit={handleFormSubmit}
                onCancel={closeFormModal}
              />
            )}
          </div>
        </div>
      ) : null}

      <LeadDetailModal leadId={ui.detailLeadId} onClose={handleCloseDetail} />

      {ui.deletingId !== null && deletingLead !== null ? (
        <ConfirmDialog
          title="Delete lead"
          message={`Permanently remove “${deletingLead.companyName}”? This cannot be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      ) : null}
    </div>
  )
}
