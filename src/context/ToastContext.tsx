import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react'

import { ToastStack } from '@/components/ui/Toast'
import type { ID, ToastInput, ToastMessage, ToastType } from '@/types/common.types'
import { generateId } from '@/utils/idGenerator'

export interface ToastContextValue {
  showToast: (input: ToastInput) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: ReactNode }): ReactElement {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const dismiss = useCallback((id: ID): void => {
    setToasts((previous) => previous.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback((input: ToastInput): void => {
    const type: ToastType = input.type ?? 'success'
    const id = generateId()
    setToasts((previous) => [...previous, { id, type, message: input.message }])
    window.setTimeout(() => {
      dismiss(id)
    }, 4000)
  }, [dismiss])

  const value = useMemo((): ToastContextValue => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastStack toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  )
}
