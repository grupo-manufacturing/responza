import type { ID, Timestamps } from '@/types/common.types'
import type { LineItem } from '@/types/quotation.types'
export type { LineItem } from '@/types/quotation.types'

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'in_production'
  | 'shipped'
  | 'delivered'

export const ORDER_STATUS_PIPELINE: readonly OrderStatus[] = [
  'pending',
  'confirmed',
  'in_production',
  'shipped',
  'delivered',
] as const

export interface Order extends Timestamps {
  id: ID
  customerId: ID
  quotationId: ID | null
  orderNumber: string
  status: OrderStatus
  lineItems: LineItem[]
  subtotal: number
  tax: number
  total: number
  notes: string | null
}

export type CreateOrderPayload = Omit<Order, 'id' | 'createdAt' | 'updatedAt'>

export type UpdateOrderPayload = Partial<CreateOrderPayload>
