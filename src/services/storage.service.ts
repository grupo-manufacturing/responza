import { appConfig } from '@/config/app.config'
import { STORAGE_KEYS } from '@/config/storage-keys'
import type { IStorageService } from '@/interfaces/IStorageService'
import type { User } from '@/types/auth.types'
import type { Conversation, Message } from '@/types/communication.types'
import type { Customer } from '@/types/customer.types'
import type {
  IntegrationState,
  IntegrationStateDocument,
} from '@/types/integration.types'
import type { Lead } from '@/types/lead.types'
import type { ID } from '@/types/common.types'
import type { Order } from '@/types/order.types'
import type { Quotation } from '@/types/quotation.types'

import customersSeedRaw from '@/data/customers.json' with { type: 'json' }
import integrationsSeedRaw from '@/data/integrations.json' with { type: 'json' }
import leadsSeedRaw from '@/data/leads.json' with { type: 'json' }
import conversationsSeedRaw from '@/data/conversations.json' with { type: 'json' }
import messagesSeedRaw from '@/data/messages.json' with { type: 'json' }
import ordersSeedRaw from '@/data/orders.json' with { type: 'json' }
import quotationsSeedRaw from '@/data/quotations.json' with { type: 'json' }
import usersSeedRaw from '@/data/users.json' with { type: 'json' }

const usersSeed: User[] = [...(usersSeedRaw as readonly User[])]
const leadsSeed: Lead[] = [...(leadsSeedRaw as readonly Lead[])]
const conversationsSeed: Conversation[] = [
  ...(conversationsSeedRaw as readonly Conversation[]),
]
const messagesSeed: Message[] = [...(messagesSeedRaw as readonly Message[])]
const customersSeed: Customer[] = [...(customersSeedRaw as readonly Customer[])]
const quotationsSeed: Quotation[] = [
  ...(quotationsSeedRaw as readonly Quotation[]),
]
const ordersSeed: Order[] = [...(ordersSeedRaw as readonly Order[])]
const integrationsStateSeed = integrationsSeedRaw as IntegrationState
const integrationsSeed: IntegrationStateDocument[] = [
  { id: 'default', state: integrationsStateSeed },
]

interface SeedMeta {
  readonly seedVersion: number
}

/** Bump when bundled JSON seeds change so dev browsers reload mock data from files. */
const CURRENT_SEED_VERSION = 5

function readStoredSeedVersion(): number {
  if (typeof localStorage === 'undefined') {
    return 0
  }
  const raw = localStorage.getItem(STORAGE_KEYS.meta)
  if (raw === null) {
    return 0
  }
  try {
    const parsed: unknown = JSON.parse(raw)
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'seedVersion' in parsed &&
      typeof (parsed as SeedMeta).seedVersion === 'number'
    ) {
      return (parsed as SeedMeta).seedVersion
    }
  } catch {
    return 0
  }
  return 0
}

function sleep(ms: number): Promise<void> {
  if (ms <= 0) {
    return Promise.resolve()
  }
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export class StorageService implements IStorageService {
  init(): void {
    if (typeof localStorage === 'undefined') {
      return
    }

    const storedVersion = readStoredSeedVersion()
    if (storedVersion >= CURRENT_SEED_VERSION) {
      return
    }

    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(usersSeed))
    localStorage.setItem(STORAGE_KEYS.leads, JSON.stringify(leadsSeed))
    localStorage.setItem(
      STORAGE_KEYS.conversations,
      JSON.stringify(conversationsSeed),
    )
    localStorage.setItem(STORAGE_KEYS.messages, JSON.stringify(messagesSeed))
    localStorage.setItem(STORAGE_KEYS.customers, JSON.stringify(customersSeed))
    localStorage.setItem(STORAGE_KEYS.quotations, JSON.stringify(quotationsSeed))
    localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(ordersSeed))
    localStorage.setItem(
      STORAGE_KEYS.integrations,
      JSON.stringify(integrationsSeed),
    )
    localStorage.setItem(
      STORAGE_KEYS.meta,
      JSON.stringify({ seedVersion: CURRENT_SEED_VERSION } satisfies SeedMeta),
    )
  }

  snapshotAll<T>(key: string): T[] {
    if (typeof localStorage === 'undefined') {
      return []
    }
    const raw = localStorage.getItem(key)
    if (raw === null) {
      return []
    }
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return []
    }
    return parsed as T[]
  }

  snapshotById<T extends { id: ID }>(key: string, id: ID): T | null {
    const rows = this.snapshotAll<T>(key)
    return rows.find((row) => row.id === id) ?? null
  }

  async getAll<T>(key: string): Promise<T[]> {
    await sleep(appConfig.storageReadDelayMs)
    return this.snapshotAll<T>(key)
  }

  async getById<T extends { id: ID }>(key: string, id: ID): Promise<T | null> {
    await sleep(appConfig.storageReadDelayMs)
    return this.snapshotById<T>(key, id)
  }

  create<T extends { id: ID }>(key: string, item: T): T {
    const rows = this.snapshotAll<T>(key)
    const next = [...rows, item]
    localStorage.setItem(key, JSON.stringify(next))
    return item
  }

  update<T extends { id: ID }>(
    key: string,
    id: ID,
    payload: Partial<T>,
  ): T {
    const rows = this.snapshotAll<T>(key)
    const index = rows.findIndex((row) => row.id === id)
    if (index === -1) {
      throw new Error(`StorageService.update: missing id "${id}" in "${key}"`)
    }
    const merged = { ...rows[index], ...payload, id } as T
    const next = [...rows]
    next[index] = merged
    localStorage.setItem(key, JSON.stringify(next))
    return merged
  }

  remove(key: string, id: ID): void {
    const rows = this.snapshotAll<{ id: ID }>(key)
    const next = rows.filter((row) => row.id !== id)
    localStorage.setItem(key, JSON.stringify(next))
  }
}
