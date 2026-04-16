import { STORAGE_KEYS } from '@/config/storage-keys'
import type { ILeadsService } from '@/interfaces/ILeadsService'
import type { IStorageService } from '@/interfaces/IStorageService'
import type {
  CreateLeadPayload,
  Lead,
  LeadFilters,
  UpdateLeadPayload,
} from '@/types/lead.types'
import type { ID } from '@/types/common.types'
import { generateId } from '@/utils/idGenerator'

export class LeadsService implements ILeadsService {
  private readonly storage: IStorageService

  constructor(storage: IStorageService) {
    this.storage = storage
  }

  async getAll(filters?: LeadFilters): Promise<Lead[]> {
    const rows = await this.storage.getAll<Lead>(STORAGE_KEYS.leads)
    if (filters === undefined) {
      return rows
    }
    return rows.filter((lead) => {
      if (filters.source !== 'all' && lead.source !== filters.source) {
        return false
      }
      if (filters.status !== 'all' && lead.status !== filters.status) {
        return false
      }
      if (
        filters.minScore !== null &&
        lead.aiScore < filters.minScore
      ) {
        return false
      }
      if (
        filters.maxScore !== null &&
        lead.aiScore > filters.maxScore
      ) {
        return false
      }
      return true
    })
  }

  listFromStore(): Lead[] {
    return this.storage.snapshotAll<Lead>(STORAGE_KEYS.leads)
  }

  getById(id: ID): Lead | null {
    return this.storage.snapshotById<Lead>(STORAGE_KEYS.leads, id)
  }

  create(payload: CreateLeadPayload): Lead {
    const now = new Date().toISOString()
    const lead = {
      ...payload,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    } as Lead
    return this.storage.create(STORAGE_KEYS.leads, lead)
  }

  update(id: ID, payload: UpdateLeadPayload): Lead {
    const updatedAt = new Date().toISOString()
    return this.storage.update<Lead>(STORAGE_KEYS.leads, id, {
      ...payload,
      updatedAt,
    } as Partial<Lead>)
  }

  remove(id: ID): void {
    this.storage.remove(STORAGE_KEYS.leads, id)
  }
}
