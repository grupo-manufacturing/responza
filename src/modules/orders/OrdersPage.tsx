import type { ChangeEvent, ReactElement } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Filter, Package, Plus, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { ConfirmDialog } from '@/components/shared/ConfirmDialog'
import { LIST_PAGE_SIZE, Pagination } from '@/components/shared/Pagination'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { EmptyState } from '@/components/ui/EmptyState'
import { Spinner } from '@/components/ui/Spinner'
import { useCustomers } from '@/hooks/useCustomers'
import { useOrders } from '@/hooks/useOrders'
import { useToast } from '@/hooks/useToast'
import { OrderForm } from '@/modules/orders/OrderForm'
import { OrdersTable } from '@/modules/orders/OrdersTable'
import type { ID } from '@/types/common.types'
import type {
  CreateOrderPayload,
  Order,
  OrderStatus,
  UpdateOrderPayload,
} from '@/types/order.types'

type OrderListStatusFilter = 'all' | OrderStatus

interface OrdersUiState {
  isCreateOpen: boolean
  editingId: ID | null
  deletingId: ID | null
}

const initialUi: OrdersUiState = {
  isCreateOpen: false,
  editingId: null,
  deletingId: null,
}

function nextOrderNumber(orders: Order[]): string {
  const year = new Date().getFullYear()
  let maxSeq = 0
  for (const o of orders) {
    const match = /-(\d{4})$/.exec(o.orderNumber)
    if (match !== null) {
      const n = parseInt(match[1]!, 10)
      if (!Number.isNaN(n)) {
        maxSeq = Math.max(maxSeq, n)
      }
    }
  }
  return `SO-${year}-${String(maxSeq + 1).padStart(4, '0')}`
}

export function OrdersPage(): ReactElement {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const {
    orders,
    isLoading,
    error,
    createOrder,
    updateOrder,
    deleteOrder,
  } = useOrders()
  const { customers, isLoading: customersLoading } = useCustomers()

  const [ui, setUi] = useState<OrdersUiState>(initialUi)
  const [page, setPage] = useState<number>(1)
  const [statusFilter, setStatusFilter] = useState<OrderListStatusFilter>('all')
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false)
  const filterToolbarRef = useRef<HTMLDivElement>(null)

  const filteredOrders = useMemo((): Order[] => {
    if (statusFilter === 'all') {
      return orders
    }
    return orders.filter((row) => row.status === statusFilter)
  }, [orders, statusFilter])

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
      setStatusFilter(event.target.value as OrderListStatusFilter)
    },
    [],
  )

  const draftOrderNumber = useMemo(() => nextOrderNumber(orders), [orders])

  const totalPages = useMemo((): number => {
    if (filteredOrders.length <= 0) {
      return 1
    }
    return Math.ceil(filteredOrders.length / LIST_PAGE_SIZE)
  }, [filteredOrders.length])

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages)
    }
  }, [page, totalPages])

  const paginatedOrders = useMemo(() => {
    const start = (page - 1) * LIST_PAGE_SIZE
    return filteredOrders.slice(start, start + LIST_PAGE_SIZE)
  }, [filteredOrders, page])

  const editingOrder = useMemo(() => {
    if (ui.editingId === null) {
      return undefined
    }
    return orders.find((row) => row.id === ui.editingId)
  }, [orders, ui.editingId])

  const deletingOrder = useMemo(() => {
    if (ui.deletingId === null) {
      return null
    }
    return orders.find((row) => row.id === ui.deletingId) ?? null
  }, [orders, ui.deletingId])

  const closeModal = useCallback((): void => {
    setUi((previous) => ({
      ...previous,
      isCreateOpen: false,
      editingId: null,
    }))
  }, [])

  const handleView = useCallback(
    (id: ID) => {
      navigate(`/orders/${id}`)
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
    if (deletingOrder === null) {
      return
    }
    const ok = deleteOrder(deletingOrder.id)
    setUi((previous) => ({ ...previous, deletingId: null }))
    if (ok) {
      showToast({ message: 'Order removed' })
    } else {
      showToast({ message: 'Could not remove order', type: 'error' })
    }
  }, [deleteOrder, deletingOrder, showToast])

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
    (payload: CreateOrderPayload | UpdateOrderPayload): void => {
      if (ui.isCreateOpen) {
        const ok = createOrder(payload as CreateOrderPayload)
        if (ok) {
          showToast({ message: 'Order created' })
          closeModal()
        } else {
          showToast({ message: 'Could not create order', type: 'error' })
        }
        return
      }
      if (ui.editingId !== null) {
        const ok = updateOrder(ui.editingId, payload as UpdateOrderPayload)
        if (ok) {
          showToast({ message: 'Order updated' })
          closeModal()
        } else {
          showToast({ message: 'Could not update order', type: 'error' })
        }
      }
    },
    [
      closeModal,
      createOrder,
      showToast,
      ui.editingId,
      ui.isCreateOpen,
      updateOrder,
    ],
  )

  const handleOrdersPageChange = useCallback((nextPage: number): void => {
    setPage(nextPage)
  }, [])

  const isFormOpen = ui.isCreateOpen || ui.editingId !== null
  const formMode = ui.isCreateOpen ? 'create' : 'edit'

  return (
    <div className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-y-auto">
      <PageHeader
        title="Orders"
        description="Track fulfilment from confirmation through delivery."
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
              aria-controls="orders-filters-panel"
              aria-label="Filter orders by status"
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
              New Order
            </Button>

            {isFiltersOpen ? (
              <div
                id="orders-filters-panel"
                role="region"
                aria-label="Filter orders"
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
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="in_production">In production</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
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
        <Spinner label="Loading orders" />
      ) : customers.length === 0 ? (
        <EmptyState
          title="Add a customer first"
          description="Orders must be linked to a company record. Create a customer, then you can add sales orders."
          icon={<Users className="h-10 w-10 text-amber-200/90" aria-hidden />}
        />
      ) : orders.length === 0 ? (
        <EmptyState
          title="No orders yet"
          description="Create an order from this page or convert an accepted quotation to see it listed here."
          icon={<Package className="h-10 w-10" aria-hidden />}
        />
      ) : filteredOrders.length === 0 ? (
        <EmptyState
          title="No orders match this status"
          description="Try choosing a different status filter or reset filters to see all orders."
          icon={<Filter className="h-10 w-10" aria-hidden />}
        />
      ) : (
        <>
          <OrdersTable
            orders={paginatedOrders}
            customers={customers}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDeleteRequest}
          />
          <Pagination
            page={page}
            pageSize={LIST_PAGE_SIZE}
            totalItems={filteredOrders.length}
            onPageChange={handleOrdersPageChange}
            ariaLabel="Orders pagination"
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
            aria-labelledby="order-form-title"
            className="scrollbar-none relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-slate-300 bg-surface-base p-6 shadow-2xl"
          >
            {formMode === 'edit' && editingOrder === undefined ? (
              <Spinner label="Loading" className="py-8" />
            ) : (
              <OrderForm
                key={ui.isCreateOpen ? 'create' : ui.editingId ?? 'edit'}
                mode={formMode}
                initialData={formMode === 'edit' ? editingOrder : undefined}
                customers={customers}
                draftOrderNumber={formMode === 'create' ? draftOrderNumber : undefined}
                onSubmit={handleFormSubmit}
                onCancel={closeModal}
              />
            )}
          </div>
        </div>
      ) : null}

      {ui.deletingId !== null && deletingOrder !== null ? (
        <ConfirmDialog
          title="Delete order"
          message={`Permanently remove “${deletingOrder.orderNumber}”? This cannot be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      ) : null}
    </div>
  )
}
