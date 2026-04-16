import type { ID } from '@/types/common.types'
import type {
  CreateCustomerPayload,
  Customer,
  UpdateCustomerPayload,
} from '@/types/customer.types'

export interface ICustomersService {
  getAll(): Promise<Customer[]>

  /** Rows from storage without read delay (refresh after mutations). */
  listFromStore(): Customer[]

  getById(id: ID): Customer | null

  create(payload: CreateCustomerPayload): Customer

  update(id: ID, payload: UpdateCustomerPayload): Customer

  remove(id: ID): void
}
