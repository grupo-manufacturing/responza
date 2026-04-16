import type { ID } from '@/types/common.types'

export type PlatformKey = 'whatsapp' | 'instagram'

export interface PlatformConfig {
  connected: boolean
  accountName: string | null
  connectedAt: string | null
}

export type IntegrationState = Record<PlatformKey, PlatformConfig>

export interface IntegrationStateDocument {
  id: ID
  state: IntegrationState
}

export type CreateIntegrationStatePayload = IntegrationState

export type UpdateIntegrationStatePayload = Partial<
  Record<PlatformKey, Partial<PlatformConfig>>
>
