import type { ReactElement, SelectHTMLAttributes } from 'react'
import { forwardRef } from 'react'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

function joinClassNames(...values: Array<string | undefined>): string {
  return values.filter((value) => value !== undefined && value !== '').join(' ')
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, children, ...rest },
  ref,
): ReactElement {
  return (
    <select
      ref={ref}
      className={joinClassNames(
        'type-body-small mt-1.5 w-full rounded-mdToken border border-border-muted bg-surface-base px-3 py-2.5 text-text-primary outline-none transition focus-visible:border-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary disabled:cursor-not-allowed disabled:opacity-60',
        className,
      )}
      {...rest}
    >
      {children}
    </select>
  )
})
