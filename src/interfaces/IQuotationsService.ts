import type { ID } from '@/types/common.types'
import type { Order } from '@/types/order.types'
import type {
  CreateQuotationPayload,
  Quotation,
  UpdateQuotationPayload,
} from '@/types/quotation.types'

export interface IQuotationsService {
  getAll(): Promise<Quotation[]>

  listFromStore(): Quotation[]

  getById(id: ID): Quotation | null

  create(payload: CreateQuotationPayload): Quotation

  update(id: ID, payload: UpdateQuotationPayload): Quotation

  remove(id: ID): void

  convertToOrder(quotationId: ID): Order
}
