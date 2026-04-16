import type { ID } from '@/types/common.types'
import type {
  CreateOrderPayload,
  Order,
  UpdateOrderPayload,
} from '@/types/order.types'

export interface IOrdersService {
  getAll(): Promise<Order[]>

  listFromStore(): Order[]

  getById(id: ID): Order | null

  create(payload: CreateOrderPayload): Order

  update(id: ID, payload: UpdateOrderPayload): Order

  remove(id: ID): void

  advanceStatus(id: ID): Order
}
