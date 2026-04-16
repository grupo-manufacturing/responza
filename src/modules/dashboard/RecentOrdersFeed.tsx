import type { ReactElement } from 'react'
import { memo } from 'react'
import { format } from 'date-fns'
import { ChevronRight, Package } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { orderStatusConfig } from '@/modules/orders/orderStatusConfig'
import type { Order } from '@/types/order.types'

export interface RecentOrdersFeedProps {
  orders: Order[]
}

function RecentOrdersFeedComponent({ orders }: RecentOrdersFeedProps): ReactElement {
  if (orders.length === 0) {
    return (
      <EmptyState
        title="No orders to show"
        description="Create an order or convert an accepted quotation to populate this feed."
        icon={<Package className="h-10 w-10" aria-hidden />}
      />
    )
  }

  return (
    <Card className="h-full w-full overflow-hidden rounded-lg p-0">
      <ul className="h-full divide-y divide-border-muted">
      {orders.map((order) => {
        const statusLabel = orderStatusConfig[order.status].label
        return (
          <li key={order.id}>
            <Link
              to={`/orders/${order.id}`}
              className="flex min-h-[84px] items-start gap-3 px-4 py-3 transition hover:bg-surface-secondary"
            >
              <span
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-mdToken border border-border-muted bg-surface-secondary text-slate-600"
                aria-hidden
              >
                <Package className="h-4 w-4 text-brand-primary" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-sm font-medium text-text-primary">
                  {order.orderNumber}
                </span>
                <span className="type-small mt-0.5 block text-slate-600">
                  {statusLabel} · ${order.total.toLocaleString()}
                </span>
                <time
                  className="type-small mt-1 block text-slate-500"
                  dateTime={order.updatedAt}
                >
                  {format(new Date(order.updatedAt), 'PPp')}
                </time>
              </span>
              <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-slate-500" aria-hidden />
            </Link>
          </li>
        )
      })}
      </ul>
    </Card>
  )
}

export const RecentOrdersFeed = memo(RecentOrdersFeedComponent)
