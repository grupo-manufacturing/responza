import { STORAGE_KEYS } from '@/config/storage-keys'
import type { ICustomersService } from '@/interfaces/ICustomersService'
import type { IStorageService } from '@/interfaces/IStorageService'
import type {
  CreateCustomerPayload,
  Customer,
  UpdateCustomerPayload,
} from '@/types/customer.types'
import type { ID } from '@/types/common.types'
import { generateId } from '@/utils/idGenerator'

export class CustomersService implements ICustomersService {
  private readonly storage: IStorageService

  constructor(storage: IStorageService) {
    this.storage = storage
  }

  async getAll(): Promise<Customer[]> {
    return this.storage.getAll<Customer>(STORAGE_KEYS.customers)
  }

  listFromStore(): Customer[] {
    return this.storage.snapshotAll<Customer>(STORAGE_KEYS.customers)
  }

  getById(id: ID): Customer | null {
    return this.storage.snapshotById<Customer>(STORAGE_KEYS.customers, id)
  }

  create(payload: CreateCustomerPayload): Customer {
    const now = new Date().toISOString()
    const customer: Customer = {
      ...payload,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    }
    return this.storage.create(STORAGE_KEYS.customers, customer)
  }

  update(id: ID, payload: UpdateCustomerPayload): Customer {
    const updatedAt = new Date().toISOString()
    return this.storage.update<Customer>(STORAGE_KEYS.customers, id, {
      ...payload,
      updatedAt,
    })
  }

  remove(id: ID): void {
    this.storage.remove(STORAGE_KEYS.customers, id)
  }
}
