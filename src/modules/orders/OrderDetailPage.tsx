import type { ReactElement } from 'react'
import { useCallback, useMemo } from 'react'
import { format } from 'date-fns'
import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { PageHeader } from '@/components/shared/PageHeader'
import { Spinner } from '@/components/ui/Spinner'
import { useCustomers } from '@/hooks/useCustomers'
import { useOrders } from '@/hooks/useOrders'
import { useToast } from '@/hooks/useToast'
import { orderStatusConfig } from '@/modules/orders/orderStatusConfig'
import { OrderStatusProgressBar } from '@/modules/orders/OrderStatusProgressBar'
import { ORDER_STATUS_PIPELINE } from '@/types/order.types'

export function OrderDetailPage(): ReactElement {
  const { orderId } = useParams<{ orderId: string }>()
  const { orders, advanceStatus, isLoading: ordersLoading, error: ordersError } =
    useOrders()
  const { customers, isLoading: customersLoading, error: customersError } =
    useCustomers()
  const { showToast } = useToast()

  const order = useMemo(() => {
    if (orderId === undefined) {
      return null
    }
    return orders.find((o) => o.id === orderId) ?? null
  }, [orders, orderId])

  const customer = useMemo(() => {
    if (order === null) {
      return null
    }
    return customers.find((c) => c.id === order.customerId) ?? null
  }, [customers, order])

  const canAdvance = order !== null && order.status !== 'delivered'

  const handleAdvance = useCallback((): void => {
    if (order === null) {
      return
    }
    try {
      advanceStatus(order.id)
      showToast({ message: 'Status advanced' })
    } catch (caught: unknown) {
      const message =
        caught instanceof Error ? caught.message : 'Could not advance status'
      showToast({ message, type: 'error' })
    }
  }, [advanceStatus, order, showToast])

  if (orderId === undefined) {
    return (
      <div className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-y-auto">
        <p className="type-body-small text-slate-600">Missing order id.</p>
      </div>
    )
  }

  if (ordersLoading || customersLoading) {
    return (
      <div className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-y-auto">
        <Spinner label="Loading order" />
      </div>
    )
  }

  if (ordersError !== null || customersError !== null) {
    return (
      <div className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-y-auto">
        <div className="space-y-2" role="alert">
          {ordersError !== null ? (
            <p className="type-body-small rounded-mdToken border border-red-700/30 bg-red-50 px-4 py-3 text-red-700">
              {ordersError}
            </p>
          ) : null}
          {customersError !== null ? (
            <p className="type-body-small rounded-mdToken border border-red-700/30 bg-red-50 px-4 py-3 text-red-700">
              {customersError}
            </p>
          ) : null}
        </div>
      </div>
    )
  }

  if (order === null) {
    return (
      <div className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-y-auto">
        <PageHeader title="Order not found" />
        <Link
          to="/orders"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-primary transition hover:text-link-secondary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to orders
        </Link>
      </div>
    )
  }

  const statusLabel = orderStatusConfig[order.status].label

  return (
    <div className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-y-auto">
      <div className="mb-6">
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-brand-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Orders
        </Link>
      </div>

      <PageHeader
        title={order.orderNumber}
        description={
          customer !== null
            ? `${customer.companyName} · ${statusLabel}`
            : statusLabel
        }
      />

      <Card className="mt-6 rounded-lg p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="type-caption uppercase tracking-wide text-slate-600">
              Fulfilment progress
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Five stages from pending through delivered.
            </p>
          </div>
          {canAdvance ? (
            <Button
              type="button"
              onClick={handleAdvance}
              className="shrink-0"
              variant="primaryPill"
              size="sm"
            >
              Move to next stage
            </Button>
          ) : (
            <p className="shrink-0 text-sm text-slate-600">Final stage reached.</p>
          )}
        </div>
        <div className="mt-5">
          <OrderStatusProgressBar
            currentStatus={order.status}
            steps={ORDER_STATUS_PIPELINE}
          />
        </div>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="rounded-lg p-5">
          <h2 className="type-caption uppercase tracking-wide text-slate-600">
            Summary
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="type-small text-slate-600">Total</dt>
              <dd className="mt-0.5 font-semibold tabular-nums text-text-primary">
                ${order.total.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="type-small text-slate-600">Updated</dt>
              <dd className="mt-0.5 text-text-primary">
                {format(new Date(order.updatedAt), 'PPp')}
              </dd>
            </div>
            {order.quotationId !== null ? (
              <div>
                <dt className="type-small text-slate-600">Source quotation</dt>
                <dd className="mt-0.5">
                  <Link
                    to={`/quotations/${order.quotationId}`}
                    className="font-medium text-brand-primary underline-offset-2 hover:underline"
                  >
                    View source quotation
                  </Link>
                </dd>
              </div>
            ) : null}
          </dl>
        </Card>

        <Card className="rounded-lg p-5">
          <h2 className="type-caption uppercase tracking-wide text-slate-600">
            Line items
          </h2>
          <ul className="mt-3 divide-y divide-border-muted text-sm">
            {order.lineItems.map((line) => (
              <li key={line.id} className="flex flex-wrap justify-between gap-2 py-2">
                <span className="text-text-primary">{line.description || '—'}</span>
                <span className="tabular-nums text-slate-600">
                  {line.quantity} × ${line.unitPrice.toLocaleString()} = $
                  {line.lineTotal.toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
