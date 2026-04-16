import type { ID } from '@/types/common.types'
import type {
  CreateLeadPayload,
  Lead,
  LeadFilters,
  UpdateLeadPayload,
} from '@/types/lead.types'

export interface ILeadsService {
  getAll(filters?: LeadFilters): Promise<Lead[]>

  /** All leads from storage without read delay (refresh after mutations). */
  listFromStore(): Lead[]

  getById(id: ID): Lead | null

  create(payload: CreateLeadPayload): Lead

  update(id: ID, payload: UpdateLeadPayload): Lead

  remove(id: ID): void
}
