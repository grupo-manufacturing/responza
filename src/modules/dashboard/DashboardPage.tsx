import type { ReactElement } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ChevronRight,
  CircleDollarSign,
  FolderPlus,
  FileText,
  LayoutDashboard,
  Package,
  UserPlus,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { PageHeader } from '@/components/shared/PageHeader'
import { Spinner } from '@/components/ui/Spinner'
import { useCustomers } from '@/hooks/useCustomers'
import { useLeads } from '@/hooks/useLeads'
import { useOrders } from '@/hooks/useOrders'
import { useQuotations } from '@/hooks/useQuotations'
import { useToast } from '@/hooks/useToast'
import { RecentActivityFeed } from '@/modules/dashboard/RecentActivityFeed'
import { RecentOrdersFeed } from '@/modules/dashboard/RecentOrdersFeed'
import { StatsCard } from '@/modules/dashboard/StatsCard'
import { CustomerForm } from '@/modules/customers/CustomerForm'
import { LeadForm } from '@/modules/leads/LeadForm'
import { OrderForm } from '@/modules/orders/OrderForm'
import { QuotationForm } from '@/modules/quotations/QuotationForm'
import type {
  CreateCustomerPayload,
  UpdateCustomerPayload,
} from '@/types/customer.types'
import type { CreateLeadPayload, UpdateLeadPayload } from '@/types/lead.types'
import type {
  CreateOrderPayload,
  Order,
  UpdateOrderPayload,
} from '@/types/order.types'
import type {
  CreateQuotationPayload,
  Quotation,
  UpdateQuotationPayload,
} from '@/types/quotation.types'

const FEED_ITEMS_LIMIT = 3

type DashboardModal =
  | 'closed'
  | 'lead-create'
  | 'customer-create'
  | 'quotation-create'
  | 'order-create'

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

export function DashboardPage(): ReactElement {
  const { showToast } = useToast()
  const {
    leads,
    isLoading: leadsLoading,
    error: leadsError,
    createLead,
  } = useLeads()
  const {
    customers,
    isLoading: customersLoading,
    error: customersError,
    createCustomer,
  } = useCustomers()
  const {
    quotations,
    isLoading: quotationsLoading,
    error: quotationsError,
    createQuotation,
  } = useQuotations()
  const {
    orders,
    isLoading: ordersLoading,
    error: ordersError,
    createOrder,
  } = useOrders()

  const [modal, setModal] = useState<DashboardModal>('closed')
  const [createMenuOpen, setCreateMenuOpen] = useState<boolean>(false)
  const createMenuRef = useRef<HTMLDivElement>(null)

  const totalLeads = useMemo((): number => leads.length, [leads])
  const totalCustomers = useMemo((): number => customers.length, [customers])

  const totalRevenue = useMemo((): number => {
    const sum = orders.reduce((acc, order) => acc + order.total, 0)
    return Math.round(sum * 100) / 100
  }, [orders])

  const totalRevenueDisplay = useMemo((): string => {
    return `$${totalRevenue.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`
  }, [totalRevenue])

  const ordersSortedByUpdated = useMemo(() => {
    return [...orders].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
  }, [orders])

  const paginatedRecentOrders = useMemo(() => {
    return ordersSortedByUpdated.slice(0, FEED_ITEMS_LIMIT)
  }, [ordersSortedByUpdated])

  const draftQuoteNumber = useMemo(
    () => nextQuoteNumber(quotations),
    [quotations],
  )

  const draftOrderNumber = useMemo(() => nextOrderNumber(orders), [orders])

  const recentLeads = useMemo(() => {
    return [...leads]
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )
      .slice(0, FEED_ITEMS_LIMIT)
  }, [leads])

  useEffect(() => {
    if (!createMenuOpen) {
      return
    }
    function handlePointerDown(event: MouseEvent): void {
      if (
        createMenuRef.current !== null &&
        !createMenuRef.current.contains(event.target as Node)
      ) {
        setCreateMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handlePointerDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
    }
  }, [createMenuOpen])

  const closeModal = useCallback((): void => {
    setModal('closed')
  }, [])

  const handleOpenLeadCreate = useCallback((): void => {
    setCreateMenuOpen(false)
    setModal('lead-create')
  }, [])

  const handleOpenCustomerCreate = useCallback((): void => {
    setCreateMenuOpen(false)
    setModal('customer-create')
  }, [])

  const handleOpenQuotationCreate = useCallback((): void => {
    setCreateMenuOpen(false)
    if (customers.length === 0) {
      showToast({
        message: 'Add at least one customer before creating a quotation.',
        type: 'error',
      })
      return
    }
    setModal('quotation-create')
  }, [customers.length, showToast])

  const handleOpenOrderCreate = useCallback((): void => {
    setCreateMenuOpen(false)
    if (customers.length === 0) {
      showToast({
        message: 'Add at least one customer before creating an order.',
        type: 'error',
      })
      return
    }
    setModal('order-create')
  }, [customers.length, showToast])

  const handleLeadSubmit = useCallback(
    (payload: CreateLeadPayload | UpdateLeadPayload): void => {
      const ok = createLead(payload as CreateLeadPayload)
      if (ok) {
        showToast({ message: 'Lead created' })
        closeModal()
      } else {
        showToast({ message: 'Could not create lead', type: 'error' })
      }
    },
    [closeModal, createLead, showToast],
  )

  const handleCustomerSubmit = useCallback(
    (payload: CreateCustomerPayload | UpdateCustomerPayload): void => {
      const ok = createCustomer(payload as CreateCustomerPayload)
      if (ok) {
        showToast({ message: 'Customer created' })
        closeModal()
      } else {
        showToast({ message: 'Could not create customer', type: 'error' })
      }
    },
    [closeModal, createCustomer, showToast],
  )

  const handleQuotationSubmit = useCallback(
    (payload: CreateQuotationPayload | UpdateQuotationPayload): void => {
      const ok = createQuotation(payload as CreateQuotationPayload)
      if (ok) {
        showToast({ message: 'Quotation created' })
        closeModal()
      } else {
        showToast({ message: 'Could not create quotation', type: 'error' })
      }
    },
    [closeModal, createQuotation, showToast],
  )

  const handleOrderSubmit = useCallback(
    (payload: CreateOrderPayload | UpdateOrderPayload): void => {
      const ok = createOrder(payload as CreateOrderPayload)
      if (ok) {
        showToast({ message: 'Order created' })
        closeModal()
      } else {
        showToast({ message: 'Could not create order', type: 'error' })
      }
    },
    [closeModal, createOrder, showToast],
  )

  const isLoading =
    leadsLoading || customersLoading || ordersLoading || quotationsLoading

  const modalPanelClassName =
    'scrollbar-none relative z-10 max-h-[90vh] w-full overflow-y-auto rounded-lg border border-border-muted bg-surface-base p-6 shadow-2xl'

  return (
    <div className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-y-auto">
      <PageHeader
        title="Dashboard"
        description="Snapshot of pipeline health and recent CRM activity."
        action={
          <div ref={createMenuRef} className="relative flex shrink-0 justify-end">
            <Button
              type="button"
              onClick={() => {
                setCreateMenuOpen((open) => !open)
              }}
              className="min-h-11 border-brand-primary bg-brand-primary px-4 text-text-inverse shadow-sm hover:border-brand-hover hover:bg-brand-hover"
              aria-expanded={createMenuOpen}
              aria-haspopup="menu"
              aria-controls="dashboard-create-menu"
              aria-label="Create lead, customer, quotation, or order"
            >
              <FolderPlus className="h-5 w-5 shrink-0" aria-hidden />
              <span>New</span>
            </Button>
            {createMenuOpen ? (
              <div
                id="dashboard-create-menu"
                role="menu"
                aria-label="Create new record"
                className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-lg border border-border-muted bg-surface-base py-1 shadow-xl"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleOpenLeadCreate}
                  className="type-body-small flex w-full items-center gap-2 px-3 py-2.5 text-left text-text-primary transition hover:bg-surface-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-text-primary"
                >
                  <UserPlus className="h-4 w-4 shrink-0 text-brand-primary" aria-hidden />
                  New lead
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleOpenCustomerCreate}
                  className="type-body-small flex w-full items-center gap-2 px-3 py-2.5 text-left text-text-primary transition hover:bg-surface-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-text-primary"
                >
                  <Users className="h-4 w-4 shrink-0 text-link-secondary" aria-hidden />
                  New customer
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleOpenQuotationCreate}
                  className="type-body-small flex w-full items-center gap-2 px-3 py-2.5 text-left text-text-primary transition hover:bg-surface-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-text-primary"
                >
                  <FileText className="h-4 w-4 shrink-0 text-brand-primary" aria-hidden />
                  New quotation
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleOpenOrderCreate}
                  className="type-body-small flex w-full items-center gap-2 px-3 py-2.5 text-left text-text-primary transition hover:bg-surface-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-text-primary"
                >
                  <Package className="h-4 w-4 shrink-0 text-brand-primary" aria-hidden />
                  New order
                </button>
              </div>
            ) : null}
          </div>
        }
      />

      {leadsError !== null ||
      customersError !== null ||
      ordersError !== null ||
      quotationsError !== null ? (
        <div className="mb-4 space-y-2" role="alert">
          {leadsError !== null ? (
            <p className="type-body-small rounded-mdToken border border-red-700/30 bg-red-50 px-4 py-3 text-red-700">
              {leadsError}
            </p>
          ) : null}
          {customersError !== null ? (
            <p className="type-body-small rounded-mdToken border border-red-700/30 bg-red-50 px-4 py-3 text-red-700">
              {customersError}
            </p>
          ) : null}
          {quotationsError !== null ? (
            <p className="type-body-small rounded-mdToken border border-red-700/30 bg-red-50 px-4 py-3 text-red-700">
              {quotationsError}
            </p>
          ) : null}
          {ordersError !== null ? (
            <p className="type-body-small rounded-mdToken border border-red-700/30 bg-red-50 px-4 py-3 text-red-700">
              {ordersError}
            </p>
          ) : null}
        </div>
      ) : null}

      {isLoading ? (
        <Spinner label="Loading dashboard" />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatsCard
              label="Total leads"
              value={totalLeads}
              icon={<UserPlus className="h-6 w-6" aria-hidden />}
            />
            <StatsCard
              label="Total customers"
              value={totalCustomers}
              icon={<Users className="h-6 w-6" aria-hidden />}
            />
            <StatsCard
              label="Total revenue"
              value={totalRevenueDisplay}
              icon={<CircleDollarSign className="h-6 w-6" aria-hidden />}
            />
          </div>

          <div className="mt-10 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-6">
            <section className="min-w-0 flex h-full flex-col">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="h-5 w-5 shrink-0 text-brand-primary" aria-hidden />
                  <h2 className="type-caption uppercase tracking-wide text-slate-600">
                    Recent leads
                  </h2>
                </div>
                <Link
                  to="/leads"
                  className="type-small inline-flex items-center gap-1 text-brand-primary transition hover:text-brand-hover"
                >
                  View more
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
              <div className="flex min-h-[260px] flex-1">
                <RecentActivityFeed leads={recentLeads} />
              </div>
            </section>

            <section className="min-w-0 flex h-full flex-col">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 shrink-0 text-brand-primary" aria-hidden />
                  <h2 className="type-caption uppercase tracking-wide text-slate-600">
                    Recent orders
                  </h2>
                </div>
                <Link
                  to="/orders"
                  className="type-small inline-flex items-center gap-1 text-brand-primary transition hover:text-brand-hover"
                >
                  View more
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
              <div className="flex min-h-[260px] flex-1">
                <RecentOrdersFeed orders={paginatedRecentOrders} />
              </div>
            </section>
          </div>
        </>
      )}

      {modal === 'lead-create' ? (
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
            aria-labelledby="lead-form-title"
            className={`${modalPanelClassName} max-w-lg`}
          >
            <LeadForm
              key="dashboard-lead-create"
              mode="create"
              onSubmit={handleLeadSubmit}
              onCancel={closeModal}
            />
          </div>
        </div>
      ) : null}

      {modal === 'customer-create' ? (
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
            aria-labelledby="customer-form-title"
            className={`${modalPanelClassName} max-w-lg`}
          >
            <CustomerForm
              key="dashboard-customer-create"
              mode="create"
              onSubmit={handleCustomerSubmit}
              onCancel={closeModal}
            />
          </div>
        </div>
      ) : null}

      {modal === 'quotation-create' ? (
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
            className={`${modalPanelClassName} max-w-2xl`}
          >
            <QuotationForm
              key="dashboard-quotation-create"
              mode="create"
              customers={customers}
              draftQuoteNumber={draftQuoteNumber}
              onSubmit={handleQuotationSubmit}
              onCancel={closeModal}
            />
          </div>
        </div>
      ) : null}

      {modal === 'order-create' ? (
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
            className={`${modalPanelClassName} max-w-2xl`}
          >
            <OrderForm
              key="dashboard-order-create"
              mode="create"
              customers={customers}
              draftOrderNumber={draftOrderNumber}
              onSubmit={handleOrderSubmit}
              onCancel={closeModal}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}
