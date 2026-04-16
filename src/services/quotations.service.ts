import { STORAGE_KEYS } from '@/config/storage-keys'
import type { IQuotationsService } from '@/interfaces/IQuotationsService'
import type { IStorageService } from '@/interfaces/IStorageService'
import type { ID } from '@/types/common.types'
import type { Order } from '@/types/order.types'
import type {
  CreateQuotationPayload,
  Quotation,
  UpdateQuotationPayload,
} from '@/types/quotation.types'
import { generateId } from '@/utils/idGenerator'

export class QuotationsService implements IQuotationsService {
  private readonly storage: IStorageService

  constructor(storage: IStorageService) {
    this.storage = storage
  }

  async getAll(): Promise<Quotation[]> {
    return this.storage.getAll<Quotation>(STORAGE_KEYS.quotations)
  }

  listFromStore(): Quotation[] {
    return this.storage.snapshotAll<Quotation>(STORAGE_KEYS.quotations)
  }

  getById(id: ID): Quotation | null {
    return this.storage.snapshotById<Quotation>(STORAGE_KEYS.quotations, id)
  }

  create(payload: CreateQuotationPayload): Quotation {
    const now = new Date().toISOString()
    const quotation: Quotation = {
      ...payload,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    }
    return this.storage.create(STORAGE_KEYS.quotations, quotation)
  }

  update(id: ID, payload: UpdateQuotationPayload): Quotation {
    const updatedAt = new Date().toISOString()
    return this.storage.update<Quotation>(STORAGE_KEYS.quotations, id, {
      ...payload,
      updatedAt,
    })
  }

  remove(id: ID): void {
    this.storage.remove(STORAGE_KEYS.quotations, id)
  }

  convertToOrder(quotationId: ID): Order {
    const quotation = this.getById(quotationId)
    if (quotation === null) {
      throw new Error(`QuotationsService.convertToOrder: unknown quotation "${quotationId}"`)
    }
    if (quotation.status !== 'accepted' || quotation.convertedToOrderId !== null) {
      throw new Error(
        'QuotationsService.convertToOrder: quotation must be accepted and not already converted.',
      )
    }

    const now = new Date().toISOString()
    const orders = this.storage.snapshotAll<Order>(STORAGE_KEYS.orders)
    const year = new Date().getFullYear()
    let maxSeq = 0
    for (const o of orders) {
      const match = /-(\d{4})$/.exec(o.orderNumber)
      if (match !== null) {
        const n = parseInt(match[1]!, 10)
        if (!Number.isNaN(n)) {
          maxSeq = Math.max(maxSeq, n)
        }
      }
    }
    const orderNumber = `SO-${year}-${String(maxSeq + 1).padStart(4, '0')}`
    const orderId = generateId()

    const lineItems = quotation.lineItems.map((item) => ({
      ...item,
      id: generateId(),
    }))

    const order: Order = {
      id: orderId,
      customerId: quotation.customerId,
      quotationId: quotation.id,
      orderNumber,
      status: 'pending',
      lineItems,
      subtotal: quotation.subtotal,
      tax: quotation.tax,
      total: quotation.total,
      notes: quotation.notes,
      createdAt: now,
      updatedAt: now,
    }

    const created = this.storage.create(STORAGE_KEYS.orders, order)
    this.storage.update<Quotation>(STORAGE_KEYS.quotations, quotation.id, {
      convertedToOrderId: created.id,
      updatedAt: now,
    })
    return created
  }
}
