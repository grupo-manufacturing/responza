import type { HTMLAttributes, ReactElement, TableHTMLAttributes } from 'react'
import { forwardRef } from 'react'

function joinClassNames(...values: Array<string | undefined>): string {
  return values.filter((value) => value !== undefined && value !== '').join(' ')
}

export const TableContainer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function TableContainer({ className, ...rest }, ref): ReactElement {
    return (
      <div
        ref={ref}
        className={joinClassNames(
          'overflow-x-auto rounded-mdToken border border-border-muted bg-surface-base',
          className,
        )}
        {...rest}
      />
    )
  },
)

export const Table = forwardRef<HTMLTableElement, TableHTMLAttributes<HTMLTableElement>>(
  function Table({ className, ...rest }, ref): ReactElement {
    return (
      <table
        ref={ref}
        className={joinClassNames('w-full border-collapse type-body-small', className)}
        {...rest}
      />
    )
  },
)
