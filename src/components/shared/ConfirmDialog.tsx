import type { ReactElement } from 'react'
import { memo, useId } from 'react'

import { Button } from '@/components/ui/Button'

export interface ConfirmDialogProps {
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

function ConfirmDialogComponent({
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps): ReactElement {
  const titleId = useId()
  const messageId = useId()

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-text-primary/50 backdrop-blur-sm"
        aria-label="Close dialog"
        onClick={onCancel}
      />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={messageId}
        className="relative z-10 w-full max-w-md rounded-mdToken border border-border-muted bg-surface-base p-6 shadow-2xl"
      >
        <h2 id={titleId} className="type-feature text-text-primary">
          {title}
        </h2>
        <p id={messageId} className="type-body-small mt-2 text-slate-600">
          {message}
        </p>
        <div className="mt-6 flex flex-wrap justify-end gap-2">
          <Button
            type="button"
            onClick={onCancel}
            variant="blueBordered"
            size="sm"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            variant="darkPill"
            size="sm"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  )
}

export const ConfirmDialog = memo(ConfirmDialogComponent)
