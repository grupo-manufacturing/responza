import { ORDER_STATUS_PIPELINE, type OrderStatus } from '@/types/order.types'

export function getNextOrderStatus(status: OrderStatus): OrderStatus {
  const index = ORDER_STATUS_PIPELINE.indexOf(status)
  if (index < 0 || index >= ORDER_STATUS_PIPELINE.length - 1) {
    throw new Error(`No next status after "${status}"`)
  }
  return ORDER_STATUS_PIPELINE[index + 1]!
}

/**
 * Tailwind utility classes for the AI score badge (0–100 scale).
 * Colour rules live here so UI components stay thin.
 */
export function getLeadStatusColor(score: number): string {
  const clamped = Math.min(100, Math.max(0, score))
  if (clamped >= 80) {
    return 'border border-emerald-700/30 bg-emerald-50 text-emerald-700'
  }
  if (clamped >= 55) {
    return 'border border-sky-700/30 bg-sky-50 text-sky-700'
  }
  if (clamped >= 30) {
    return 'border border-amber-700/30 bg-amber-50 text-amber-700'
  }
  return 'border border-border-muted bg-surface-secondary text-slate-700'
}
