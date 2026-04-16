import type { InputHTMLAttributes, ReactElement } from 'react'
import { forwardRef } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

function joinClassNames(...values: Array<string | undefined>): string {
  return values.filter((value) => value !== undefined && value !== '').join(' ')
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...rest },
  ref,
): ReactElement {
  return (
    <input
      ref={ref}
      className={joinClassNames(
        'type-body-small mt-1.5 w-full rounded-mdToken border border-border-muted bg-surface-base px-3 py-2.5 text-text-primary outline-none transition placeholder:text-slate-500 focus-visible:border-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary disabled:cursor-not-allowed disabled:opacity-60',
        className,
      )}
      {...rest}
    />
  )
})
