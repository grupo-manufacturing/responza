import type { HTMLAttributes, ReactElement } from 'react'
import { forwardRef } from 'react'

type CardVariant = 'light' | 'dark'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
}

function joinClassNames(...values: Array<string | undefined>): string {
  return values.filter((value) => value !== undefined && value !== '').join(' ')
}

const variantClassName: Record<CardVariant, string> = {
  light: 'section-light border-border-muted bg-surface-lightTint',
  dark: 'section-dark border-border-muted bg-surface-darkCard',
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = 'light', className, ...rest },
  ref,
): ReactElement {
  return (
    <div
      ref={ref}
      className={joinClassNames(
        'rounded-mdToken border p-px16',
        variantClassName[variant],
        className,
      )}
      {...rest}
    />
  )
})
