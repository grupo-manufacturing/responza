import type { ReactElement } from 'react'
import { memo } from 'react'

import { orderStatusConfig } from '@/modules/orders/orderStatusConfig'
import type { OrderStatus } from '@/types/order.types'

export interface OrderStatusProgressBarProps {
  currentStatus: OrderStatus
  steps: readonly OrderStatus[]
}

function OrderStatusProgressBarComponent({
  currentStatus,
  steps,
}: OrderStatusProgressBarProps): ReactElement {
  const currentIndex = steps.indexOf(currentStatus)

  return (
    <ol className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
      {steps.map((step, index) => {
        const isComplete = currentIndex > index
        const isCurrent = currentIndex === index
        const { label } = orderStatusConfig[step]
        return (
          <li key={step} className="flex items-center gap-2 sm:contents">
            <span
              className={`type-small inline-flex min-h-[2rem] min-w-[2rem] items-center justify-center rounded-full border px-3 py-1 text-center transition ${
                isComplete
                  ? 'border-brand-primary/40 bg-brand-primary/15 text-brand-primary'
                  : isCurrent
                    ? 'border-brand-primary bg-brand-primary text-text-inverse ring-2 ring-brand-primary/30'
                    : 'border-border-muted bg-surface-secondary text-slate-600'
              }`}
            >
              {index + 1}. {label}
            </span>
            {index < steps.length - 1 ? (
              <span
                className="hidden text-slate-500 sm:inline"
                aria-hidden
              >
                →
              </span>
            ) : null}
          </li>
        )
      })}
    </ol>
  )
}

export const OrderStatusProgressBar = memo(OrderStatusProgressBarComponent)
