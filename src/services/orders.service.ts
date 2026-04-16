import { STORAGE_KEYS } from '@/config/storage-keys'
import type { IOrdersService } from '@/interfaces/IOrdersService'
import type { IStorageService } from '@/interfaces/IStorageService'
import type { ID } from '@/types/common.types'
import type {
  CreateOrderPayload,
  Order,
  UpdateOrderPayload,
} from '@/types/order.types'
import { generateId } from '@/utils/idGenerator'
import { getNextOrderStatus } from '@/utils/statusHelpers'

export class OrdersService implements IOrdersService {
  private readonly storage: IStorageService

  constructor(storage: IStorageService) {
    this.storage = storage
  }

  async getAll(): Promise<Order[]> {
    return this.storage.getAll<Order>(STORAGE_KEYS.orders)
  }

  listFromStore(): Order[] {
    return this.storage.snapshotAll<Order>(STORAGE_KEYS.orders)
  }

  getById(id: ID): Order | null {
    return this.storage.snapshotById<Order>(STORAGE_KEYS.orders, id)
  }

  create(payload: CreateOrderPayload): Order {
    const now = new Date().toISOString()
    const order: Order = {
      ...payload,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    }
    return this.storage.create(STORAGE_KEYS.orders, order)
  }

  update(id: ID, payload: UpdateOrderPayload): Order {
    const updatedAt = new Date().toISOString()
    return this.storage.update<Order>(STORAGE_KEYS.orders, id, {
      ...payload,
      updatedAt,
    })
  }

  remove(id: ID): void {
    this.storage.remove(STORAGE_KEYS.orders, id)
  }

  advanceStatus(id: ID): Order {
    const current = this.getById(id)
    if (current === null) {
      throw new Error(`OrdersService.advanceStatus: unknown order "${id}"`)
    }
    const nextStatus = getNextOrderStatus(current.status)
    return this.update(id, { status: nextStatus })
  }
}
