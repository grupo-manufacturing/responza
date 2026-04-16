import type { HTMLAttributes, ReactElement } from 'react'
import { forwardRef } from 'react'

type BadgeVariant = 'neutral' | 'brand' | 'success' | 'danger'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

function joinClassNames(...values: Array<string | undefined>): string {
  return values.filter((value) => value !== undefined && value !== '').join(' ')
}

const variantClassName: Record<BadgeVariant, string> = {
  neutral: 'border-border-muted bg-surface-secondary text-text-primary',
  brand: 'border-brand-primary/30 bg-brand-primary/10 text-brand-primary',
  success: 'border-emerald-700/30 bg-emerald-50 text-emerald-700',
  danger: 'border-red-700/30 bg-red-50 text-red-700',
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = 'neutral', className, ...rest },
  ref,
): ReactElement {
  return (
    <span
      ref={ref}
      className={joinClassNames(
        'type-small inline-flex items-center rounded-full border px-3 py-1',
        variantClassName[variant],
        className,
      )}
      {...rest}
    />
  )
})
