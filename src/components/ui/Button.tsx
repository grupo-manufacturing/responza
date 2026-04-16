import type { ButtonHTMLAttributes, ReactElement } from 'react'
import { forwardRef } from 'react'

type ButtonVariant = 'primaryPill' | 'darkPill' | 'blueBordered' | 'fullPill'
type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
}

function joinClassNames(...values: Array<string | undefined>): string {
  return values.filter((value) => value !== undefined && value !== '').join(' ')
}

const baseClassName =
  'type-button inline-flex items-center justify-center gap-2 border transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary disabled:cursor-not-allowed disabled:opacity-50'

const variantClassName: Record<ButtonVariant, string> = {
  primaryPill:
    'radius-pill border-surface-secondary bg-surface-secondary text-text-primary hover:border-brand-hover hover:bg-brand-hover hover:text-text-inverse',
  darkPill:
    'radius-pill border-surface-darkCard bg-surface-darkCard text-text-inverse hover:border-brand-hover hover:bg-brand-hover',
  blueBordered:
    'radius-pill border-brand-primary bg-transparent text-brand-primary hover:bg-brand-primary hover:text-text-inverse',
  fullPill:
    'radius-full-pill border-surface-secondary bg-surface-secondary text-text-primary hover:border-brand-hover hover:bg-brand-hover hover:text-text-inverse',
}

const sizeClassName: Record<ButtonSize, string> = {
  sm: 'min-h-9 px-4 py-1.5 text-[14px]',
  md: 'min-h-11 px-5 py-2',
  lg: 'min-h-12 px-6 py-2.5',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primaryPill',
    size = 'md',
    className,
    loading = false,
    disabled,
    children,
    ...rest
  },
  ref,
): ReactElement {
  return (
    <button
      ref={ref}
      className={joinClassNames(
        baseClassName,
        variantClassName[variant],
        sizeClassName[size],
        className,
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? 'Loading…' : children}
    </button>
  )
})
