export type ID = string

export interface Timestamps {
  createdAt: string
  updatedAt: string
}

export type ToastType = 'success' | 'error' | 'info'

export interface ToastMessage {
  id: ID
  type: ToastType
  message: string
}

export type ToastInput = Pick<ToastMessage, 'message'> &
  Partial<Pick<ToastMessage, 'type'>>

export type ActivityItem =
  | {
      kind: 'lead'
      id: ID
      occurredAt: string
      summary: string
      detail: string
    }
  | {
      kind: 'customer'
      id: ID
      occurredAt: string
      summary: string
      detail: string
    }
