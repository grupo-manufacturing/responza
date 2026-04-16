import type { ReactElement, ReactNode } from 'react'

import { Button } from '@/components/ui/Button'

export interface DialogProps {
  title: string
  description?: string
  onClose: () => void
  children: ReactNode
  footer?: ReactNode
}

export function Dialog({
  title,
  description,
  onClose,
  children,
  footer,
}: DialogProps): ReactElement {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-text-primary/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-xl rounded-lg border border-border-muted bg-surface-base p-6 shadow-2xl">
        <header className="mb-4">
          <h2 className="type-feature text-text-primary">{title}</h2>
          {description !== undefined ? (
            <p className="type-body-small mt-1 text-slate-600">{description}</p>
          ) : null}
        </header>
        <div>{children}</div>
        <footer className="mt-6 flex flex-wrap justify-end gap-2">
          {footer ?? (
            <Button type="button" variant="blueBordered" size="sm" onClick={onClose}>
              Close
            </Button>
          )}
        </footer>
      </div>
    </div>
  )
}
