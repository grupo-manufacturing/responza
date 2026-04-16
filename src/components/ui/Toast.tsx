import type { ReactElement } from 'react'
import { memo } from 'react'
import { X } from 'lucide-react'

import type { ID } from '@/types/common.types'
import type { ToastMessage } from '@/types/common.types'

export interface ToastStackProps {
  toasts: ToastMessage[]
  onDismiss: (id: ID) => void
}

function toastStyles(type: ToastMessage['type']): string {
  if (type === 'error') {
    return 'border-red-700/30 bg-red-50 text-red-700'
  }
  if (type === 'info') {
    return 'border-border-muted bg-surface-secondary text-text-primary'
  }
  return 'border-emerald-700/30 bg-emerald-50 text-emerald-700'
}

interface ToastItemProps {
  toast: ToastMessage
  onDismiss: (id: ID) => void
}

function ToastItemComponent({ toast, onDismiss }: ToastItemProps): ReactElement {
  return (
    <div
      className={`pointer-events-auto flex items-start gap-2 rounded-mdToken border px-3 py-2.5 type-body-small shadow-lg ${toastStyles(toast.type)}`}
      role="status"
    >
      <p className="min-w-0 flex-1 leading-snug">{toast.message}</p>
      <button
        type="button"
        onClick={() => {
          onDismiss(toast.id)
        }}
        className="shrink-0 rounded-sm p-0.5 text-current opacity-70 transition hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-text-primary"
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" aria-hidden />
      </button>
    </div>
  )
}

const ToastItem = memo(ToastItemComponent)

function ToastStackComponent({ toasts, onDismiss }: ToastStackProps): ReactElement {
  if (toasts.length === 0) {
    return <></>
  }

  return (
    <div
      className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2 px-2 sm:px-0"
      aria-live="polite"
      aria-relevant="additions text"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  )
}

export const ToastStack = memo(ToastStackComponent)
