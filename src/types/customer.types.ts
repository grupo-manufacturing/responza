import type { ID, Timestamps } from '@/types/common.types'

export interface Customer extends Timestamps {
  id: ID
  companyName: string
  contactName: string
  email: string
  phone: string | null
  address: string | null
  notes: string | null
}

export type CreateCustomerPayload = Omit<
  Customer,
  'id' | 'createdAt' | 'updatedAt'
>

export type UpdateCustomerPayload = Partial<CreateCustomerPayload>
