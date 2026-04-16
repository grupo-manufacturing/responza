import type { ID, Timestamps } from '@/types/common.types'

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed'

export type LeadSource = 'whatsapp' | 'instagram' | 'manual'

export type LeadFilterSource = LeadSource | 'all'

export type LeadFilterStatus = LeadStatus | 'all'

export interface LeadFilters {
  source: LeadFilterSource
  status: LeadFilterStatus
  minScore: number | null
  maxScore: number | null
}

interface LeadShared extends Timestamps {
  id: ID
  companyName: string
  contactName: string
  email: string
  phone: string | null
  status: LeadStatus
  aiScore: number
}

export type Lead =
  | (LeadShared & { source: 'manual' })
  | (LeadShared & { source: 'whatsapp' | 'instagram'; message: string })

export type CreateLeadPayload = Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>

export type UpdateLeadPayload = Partial<CreateLeadPayload>
