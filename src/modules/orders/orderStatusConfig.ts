import type { OrderStatus } from '@/types/order.types'

export interface OrderStatusStyle {
  label: string
  className: string
}

/**
 * Single source of truth for order status labels and badge styles.
 * Add new statuses here only — OrdersTable and StatusBadge stay unchanged.
 */
export const orderStatusConfig: Record<OrderStatus, OrderStatusStyle> = {
  pending: {
    label: 'Pending',
    className:
      'bg-amber-100 text-amber-800 ring-1 ring-amber-300',
  },
  confirmed: {
    label: 'Confirmed',
    className:
      'bg-sky-100 text-sky-800 ring-1 ring-sky-300',
  },
  in_production: {
    label: 'In production',
    className:
      'bg-violet-100 text-violet-800 ring-1 ring-violet-300',
  },
  shipped: {
    label: 'Shipped',
    className:
      'bg-cyan-100 text-cyan-800 ring-1 ring-cyan-300',
  },
  delivered: {
    label: 'Delivered',
    className:
      'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300',
  },
}
