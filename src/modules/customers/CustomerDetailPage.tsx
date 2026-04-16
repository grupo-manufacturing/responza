import type { ReactElement } from 'react'
import { useMemo, useState } from 'react'
import { format } from 'date-fns'
import { ArrowLeft, ChevronRight, FileText, Package } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import { StatusBadge } from '@/components/shared/StatusBadge'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { Spinner } from '@/components/ui/Spinner'
import { useCustomers } from '@/hooks/useCustomers'
import { useOrders } from '@/hooks/useOrders'
import { useQuotations } from '@/hooks/useQuotations'
import { orderStatusConfig } from '@/modules/orders/orderStatusConfig'
import type { ID } from '@/types/common.types'
import type { QuotationStatus } from '@/types/quotation.types'

type CustomerDetailTab = 'quotations' | 'orders'

function quotationStatusLabel(status: QuotationStatus): string {
  const labels: Record<QuotationStatus, string> = {
    draft: 'Draft',
    sent: 'Sent',
    accepted: 'Accepted',
    rejected: 'Rejected',
    expired: 'Expired',
  }
  return labels[status]
}

export function CustomerDetailPage(): ReactElement {
  const { customerId } = useParams<{ customerId: string }>()
  const { customers, isLoading, error } = useCustomers()
  const {
    quotationsByCustomer,
    isLoading: quotationsLoading,
    error: quotationsError,
  } = useQuotations()
  const {
    ordersByCustomer,
    isLoading: ordersLoading,
    error: ordersError,
  } = useOrders()
  const [activeTab, setActiveTab] = useState<CustomerDetailTab>('quotations')

  const customer = useMemo(() => {
    if (customerId === undefined) {
      return null
    }
    return customers.find((row) => row.id === customerId) ?? null
  }, [customers, customerId])

  const idForLists: ID | '' = customerId ?? ''

  const customerQuotations = useMemo(() => {
    if (idForLists === '') {
      return []
    }
    return quotationsByCustomer(idForLists).sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
  }, [idForLists, quotationsByCustomer])

  const customerOrders = useMemo(() => {
    if (idForLists === '') {
      return []
    }
    return ordersByCustomer(idForLists).sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
  }, [idForLists, ordersByCustomer])

  if (customerId === undefined) {
    return (
      <div className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-y-auto">
        <EmptyState
          title="Missing customer"
          description="No customer id was provided in the URL."
          icon={<Package className="h-10 w-10" aria-hidden />}
        />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-y-auto">
        <Spinner label="Loading customer" />
      </div>
    )
  }

  if (error !== null) {
    return (
      <div className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-y-auto">
        <p className="type-body-small rounded-mdToken border border-red-700/30 bg-red-50 px-4 py-3 text-red-700" role="alert">
          {error}
        </p>
      </div>
    )
  }

  if (customer === null) {
    return (
      <div className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-y-auto">
        <PageHeader
          title="Customer not found"
          description="This id is not in your directory."
        />
        <EmptyState
          title="Nothing here"
          description="The customer may have been removed, or the link is incorrect."
          icon={<Package className="h-10 w-10" aria-hidden />}
        />
        <Link
          to="/customers"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-primary transition hover:text-link-secondary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to customers
        </Link>
      </div>
    )
  }

  const salesDataError =
    quotationsError !== null || ordersError !== null ? (
      <div className="mb-4 space-y-2" role="alert">
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
    ) : null

  const createdLabel = format(new Date(customer.createdAt), 'PP')

  return (
    <div className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-y-auto">
      <div className="mb-6">
        <Link
          to="/customers"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-brand-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Customers
        </Link>
      </div>

      <PageHeader
        title={customer.companyName}
        description={`Primary contact: ${customer.contactName} · Added ${createdLabel}`}
      />

      {salesDataError}

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded-lg p-5 lg:col-span-1">
          <h2 className="type-caption uppercase tracking-wide text-slate-600">
            Profile
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="type-small text-slate-600">Email</dt>
              <dd className="mt-0.5 font-medium text-text-primary">{customer.email}</dd>
            </div>
            <div>
              <dt className="type-small text-slate-600">Phone</dt>
              <dd className="mt-0.5 text-text-primary">{customer.phone ?? '—'}</dd>
            </div>
            <div>
              <dt className="type-small text-slate-600">Address</dt>
              <dd className="mt-0.5 text-text-primary">{customer.address ?? '—'}</dd>
            </div>
            <div>
              <dt className="type-small text-slate-600">Notes</dt>
              <dd className="mt-0.5 text-text-primary">{customer.notes ?? '—'}</dd>
            </div>
          </dl>
        </Card>

        <Card className="rounded-lg p-5 lg:col-span-2">
          <div className="flex gap-2 border-b border-border-muted pb-3">
            <Button
              type="button"
              onClick={() => {
                setActiveTab('quotations')
              }}
              variant={activeTab === 'quotations' ? 'darkPill' : 'blueBordered'}
              size="sm"
            >
              Quotations
            </Button>
            <Button
              type="button"
              onClick={() => {
                setActiveTab('orders')
              }}
              variant={activeTab === 'orders' ? 'darkPill' : 'blueBordered'}
              size="sm"
            >
              Orders
            </Button>
          </div>

          <div className="mt-6">
            {activeTab === 'quotations' ? (
              quotationsLoading ? (
                <Spinner label="Loading quotations" className="py-6" />
              ) : customerQuotations.length === 0 ? (
                <EmptyState
                  title="No quotations yet"
                  description="Create a quotation for this customer from the Quotations page."
                  icon={<FileText className="h-10 w-10" aria-hidden />}
                />
              ) : (
                <ul className="divide-y divide-border-muted rounded-lg border border-border-muted bg-surface-base">
                  {customerQuotations.map((q) => (
                    <li key={q.id}>
                      <Link
                        to={`/quotations/${q.id}`}
                        className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 transition hover:bg-surface-secondary"
                      >
                        <div className="min-w-0">
                          <p className="font-mono text-sm font-medium text-text-primary">{q.quoteNumber}</p>
                          <p className="mt-0.5 text-xs text-slate-600">
                            {quotationStatusLabel(q.status)} · ${q.total.toLocaleString()} ·{' '}
                            {format(new Date(q.updatedAt), 'PP')}
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 shrink-0 text-slate-500" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              )
            ) : ordersLoading ? (
              <Spinner label="Loading orders" className="py-6" />
            ) : customerOrders.length === 0 ? (
              <EmptyState
                title="No orders yet"
                description="Orders for this customer appear here after you create them or convert an accepted quotation."
                icon={<Package className="h-10 w-10" aria-hidden />}
              />
            ) : (
              <ul className="divide-y divide-border-muted rounded-lg border border-border-muted bg-surface-base">
                {customerOrders.map((order) => {
                  const badge = orderStatusConfig[order.status]
                  return (
                    <li key={order.id}>
                      <Link
                        to={`/orders/${order.id}`}
                        className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 transition hover:bg-surface-secondary"
                      >
                        <div className="min-w-0">
                          <p className="font-mono text-sm font-medium text-text-primary">{order.orderNumber}</p>
                          <div className="mt-1.5 flex flex-wrap items-center gap-2">
                            <StatusBadge label={badge.label} className={badge.className} />
                            <span className="text-xs tabular-nums text-slate-600">
                              ${order.total.toLocaleString()} · {format(new Date(order.updatedAt), 'PP')}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 shrink-0 text-slate-500" aria-hidden />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
