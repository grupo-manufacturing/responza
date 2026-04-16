import type { ReactElement } from 'react'
import { memo, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/Button'

/** Default page size for list/table views across CRM modules. */
export const LIST_PAGE_SIZE = 6

export interface PaginationProps {
  /** Current page (1-based). */
  page: number
  pageSize: number
  totalItems: number
  onPageChange: (page: number) => void
  /** Accessible name for the navigation landmark. */
  ariaLabel?: string
}

function clampPage(page: number, totalPages: number): number {
  if (totalPages < 1) {
    return 1
  }
  return Math.min(Math.max(1, page), totalPages)
}

function PaginationComponent({
  page,
  pageSize,
  totalItems,
  onPageChange,
  ariaLabel = 'Pagination',
}: PaginationProps): ReactElement | null {
  const totalPages = useMemo((): number => {
    if (totalItems <= 0) {
      return 1
    }
    return Math.ceil(totalItems / pageSize)
  }, [pageSize, totalItems])

  const { start, end } = useMemo(() => {
    if (totalItems <= 0) {
      return { start: 0, end: 0 }
    }
    const safePage = clampPage(page, totalPages)
    const s = (safePage - 1) * pageSize + 1
    const e = Math.min(safePage * pageSize, totalItems)
    return { start: s, end: e }
  }, [page, pageSize, totalItems, totalPages])

  if (totalItems <= 0) {
    return null
  }

  const safePage = clampPage(page, totalPages)
  const canPrev = safePage > 1
  const canNext = safePage < totalPages

  return (
    <nav
      className="mt-4 flex flex-col items-stretch justify-between gap-3 rounded-mdToken border border-border-muted bg-surface-lightTint px-4 py-3 sm:flex-row sm:items-center"
      aria-label={ariaLabel}
    >
      <p className="type-body-small text-center text-slate-600 sm:text-left">
        <span className="tabular-nums text-text-primary">
          {start}–{end}
        </span>
        <span className="text-slate-600"> of </span>
        <span className="tabular-nums text-text-primary">{totalItems}</span>
        <span className="hidden sm:inline text-slate-600"> · </span>
        <span className="block text-xs text-slate-600 sm:inline">
          Page {safePage} of {totalPages}
        </span>
      </p>
      <div className="flex items-center justify-center gap-2 sm:justify-end">
        <Button
          type="button"
          disabled={!canPrev}
          onClick={() => {
            onPageChange(safePage - 1)
          }}
          variant="blueBordered"
          size="sm"
          className="px-3"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
          Previous
        </Button>
        <Button
          type="button"
          disabled={!canNext}
          onClick={() => {
            onPageChange(safePage + 1)
          }}
          variant="blueBordered"
          size="sm"
          className="px-3"
        >
          Next
          <ChevronRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>
    </nav>
  )
}

export const Pagination = memo(PaginationComponent)
