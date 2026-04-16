import type { ID, Timestamps } from '@/types/common.types'

export type QuotationStatus =
  | 'draft'
  | 'sent'
  | 'accepted'
  | 'rejected'
  | 'expired'

export interface LineItem {
  id: ID
  description: string
  quantity: number
  unitPrice: number
  lineTotal: number
}

export interface Quotation extends Timestamps {
  id: ID
  customerId: ID
  quoteNumber: string
  status: QuotationStatus
  lineItems: LineItem[]
  subtotal: number
  tax: number
  total: number
  validUntil: string | null
  notes: string | null
  convertedToOrderId: ID | null
}

export type CreateQuotationPayload = Omit<
  Quotation,
  'id' | 'createdAt' | 'updatedAt'
>

export type UpdateQuotationPayload = Partial<CreateQuotationPayload>
