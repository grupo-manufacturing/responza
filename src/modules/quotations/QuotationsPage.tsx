import type { ChangeEvent, ReactElement } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FileText, Filter, Plus, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { ConfirmDialog } from '@/components/shared/ConfirmDialog'
import { LIST_PAGE_SIZE, Pagination } from '@/components/shared/Pagination'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { EmptyState } from '@/components/ui/EmptyState'
import { Spinner } from '@/components/ui/Spinner'
import { useCustomers } from '@/hooks/useCustomers'
import { useToast } from '@/hooks/useToast'
import { useQuotations } from '@/hooks/useQuotations'
import { QuotationForm } from '@/modules/quotations/QuotationForm'
import { QuotationsTable } from '@/modules/quotations/QuotationsTable'
import type { ID } from '@/types/common.types'
import type {
  CreateQuotationPayload,
  Quotation,
  QuotationStatus,
  UpdateQuotationPayload,
} from '@/types/quotation.types'

type QuotationListStatusFilter = 'all' | QuotationStatus

interface QuotationsUiState {
  isCreateOpen: boolean
  editingId: ID | null
  deletingId: ID | null
}

const initialUi: QuotationsUiState = {
  isCreateOpen: false,
  editingId: null,
  deletingId: null,
}

function nextQuoteNumber(quotations: Quotation[]): string {
  const year = new Date().getFullYear()
  let maxSeq = 0
  for (const q of quotations) {
    const match = /-(\d{4})$/.exec(q.quoteNumber)
    if (match !== null) {
      const n = parseInt(match[1]!, 10)
      if (!Number.isNaN(n)) {
        maxSeq = Math.max(maxSeq, n)
      }
    }
  }
  return `Q-${year}-${String(maxSeq + 1).padStart(4, '0')}`
}

export function QuotationsPage(): ReactElement {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const {
    quotations,
    isLoading,
    error,
    createQuotation,
    updateQuotation,
    deleteQuotation,
  } = useQuotations()
  const { customers, isLoading: customersLoading } = useCustomers()

  const [ui, setUi] = useState<QuotationsUiState>(initialUi)
  const [page, setPage] = useState<number>(1)
  const [statusFilter, setStatusFilter] =
    useState<QuotationListStatusFilter>('all')
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false)
  const filterToolbarRef = useRef<HTMLDivElement>(null)

  const filteredQuotations = useMemo((): Quotation[] => {
    if (statusFilter === 'all') {
      return quotations
    }
    return quotations.filter((row) => row.status === statusFilter)
  }, [quotations, statusFilter])

  useEffect(() => {
    setPage(1)
  }, [statusFilter])

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

  const hasActiveFilters = statusFilter !== 'all'

  const handleResetFilters = useCallback((): void => {
    setStatusFilter('all')
  }, [])

  const handleStatusFilterChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>): void => {
      setStatusFilter(event.target.value as QuotationListStatusFilter)
    },
    [],
  )

  const draftQuoteNumber = useMemo(
    () => nextQuoteNumber(quotations),
    [quotations],
  )

  const totalPages = useMemo((): number => {
    if (filteredQuotations.length <= 0) {
      return 1
    }
    return Math.ceil(filteredQuotations.length / LIST_PAGE_SIZE)
  }, [filteredQuotations.length])

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages)
    }
  }, [page, totalPages])

  const paginatedQuotations = useMemo(() => {
    const start = (page - 1) * LIST_PAGE_SIZE
    return filteredQuotations.slice(start, start + LIST_PAGE_SIZE)
  }, [filteredQuotations, page])

  const editingQuotation = useMemo(() => {
    if (ui.editingId === null) {
      return undefined
    }
    return quotations.find((row) => row.id === ui.editingId)
  }, [quotations, ui.editingId])

  const deletingQuotation = useMemo(() => {
    if (ui.deletingId === null) {
      return null
    }
    return quotations.find((row) => row.id === ui.deletingId) ?? null
  }, [quotations, ui.deletingId])

  const closeModal = useCallback((): void => {
    setUi((previous) => ({
      ...previous,
      isCreateOpen: false,
      editingId: null,
    }))
  }, [])

  const handleView = useCallback(
    (id: ID) => {
      navigate(`/quotations/${id}`)
    },
    [navigate],
  )

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
    if (deletingQuotation === null) {
      return
    }
    const ok = deleteQuotation(deletingQuotation.id)
    setUi((previous) => ({ ...previous, deletingId: null }))
    if (ok) {
      showToast({ message: 'Quotation removed' })
    } else {
      showToast({ message: 'Could not remove quotation', type: 'error' })
    }
  }, [deleteQuotation, deletingQuotation, showToast])

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

  const handleFormSubmit = useCallback(
    (payload: CreateQuotationPayload | UpdateQuotationPayload): void => {
      if (ui.isCreateOpen) {
        const ok = createQuotation(payload as CreateQuotationPayload)
        if (ok) {
          showToast({ message: 'Quotation created' })
          closeModal()
        } else {
          showToast({ message: 'Could not create quotation', type: 'error' })
        }
        return
      }
      if (ui.editingId !== null) {
        const ok = updateQuotation(ui.editingId, payload as UpdateQuotationPayload)
        if (ok) {
          showToast({ message: 'Quotation updated' })
          closeModal()
        } else {
          showToast({ message: 'Could not update quotation', type: 'error' })
        }
      }
    },
    [
      closeModal,
      createQuotation,
      showToast,
      ui.editingId,
      ui.isCreateOpen,
      updateQuotation,
    ],
  )

  const handleQuotationsPageChange = useCallback((nextPage: number): void => {
    setPage(nextPage)
  }, [])

  const isFormOpen = ui.isCreateOpen || ui.editingId !== null
  const formMode = ui.isCreateOpen ? 'create' : 'edit'

  return (
    <div className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-y-auto">
      <PageHeader
        title="Quotations"
        description="Build quotes, export PDFs, and convert accepted quotes to orders."
        action={
          <div ref={filterToolbarRef} className="relative flex shrink-0 items-center gap-2">
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
              aria-controls="quotations-filters-panel"
              aria-label="Filter quotations by status"
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
              New Quotation
            </Button>

            {isFiltersOpen ? (
              <div
                id="quotations-filters-panel"
                role="region"
                aria-label="Filter quotations"
                className="absolute right-0 top-full z-50 mt-2 w-[min(100vw-2rem,20rem)] rounded-lg border border-border-muted bg-surface-base p-4 shadow-xl"
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
                <label className="type-caption block uppercase tracking-wide text-slate-600">
                  Status
                  <Select
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                  >
                    <option value="all">All statuses</option>
                    <option value="draft">Draft</option>
                    <option value="sent">Sent</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                    <option value="expired">Expired</option>
                  </Select>
                </label>
              </div>
            ) : null}
          </div>
        }
      />

      {error !== null ? (
        <p className="type-body-small mb-4 rounded-mdToken border border-red-700/30 bg-red-50 px-4 py-3 text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      {isLoading || customersLoading ? (
        <Spinner label="Loading quotations" />
      ) : customers.length === 0 ? (
        <EmptyState
          title="Add a customer first"
          description="Quotations are always tied to a customer. Create a company record, then you can build quotes."
          icon={<Users className="h-10 w-10 text-amber-200/90" aria-hidden />}
        />
      ) : quotations.length === 0 ? (
        <EmptyState
          title="No quotations yet"
          description="Draft a quote for a customer from this page. Accepted quotes can be converted into orders."
          icon={<FileText className="h-10 w-10" aria-hidden />}
        />
      ) : filteredQuotations.length === 0 ? (
        <EmptyState
          title="No quotations match this status"
          description="Pick another status filter or reset filters to see all quotations."
          icon={<Filter className="h-10 w-10" aria-hidden />}
        />
      ) : (
        <>
          <QuotationsTable
            quotations={paginatedQuotations}
            customers={customers}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDeleteRequest}
          />
          <Pagination
            page={page}
            pageSize={LIST_PAGE_SIZE}
            totalItems={filteredQuotations.length}
            onPageChange={handleQuotationsPageChange}
            ariaLabel="Quotations pagination"
          />
        </>
      )}

      {isFormOpen ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-text-primary/50 backdrop-blur-sm"
            aria-label="Close form"
            onClick={closeModal}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quotation-form-title"
            className="scrollbar-none relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-slate-300 bg-surface-base p-6 shadow-2xl"
          >
            {formMode === 'edit' && editingQuotation === undefined ? (
              <Spinner label="Loading" className="py-8" />
            ) : (
              <QuotationForm
                key={ui.isCreateOpen ? 'create' : ui.editingId ?? 'edit'}
                mode={formMode}
                initialData={formMode === 'edit' ? editingQuotation : undefined}
                customers={customers}
                draftQuoteNumber={formMode === 'create' ? draftQuoteNumber : undefined}
                onSubmit={handleFormSubmit}
                onCancel={closeModal}
              />
            )}
          </div>
        </div>
      ) : null}

      {ui.deletingId !== null && deletingQuotation !== null ? (
        <ConfirmDialog
          title="Delete quotation"
          message={`Permanently remove “${deletingQuotation.quoteNumber}”? This cannot be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      ) : null}
    </div>
  )
}
