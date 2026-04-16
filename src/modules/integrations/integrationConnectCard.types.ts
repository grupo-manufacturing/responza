import type { Lead } from '@/types/lead.types'

export interface IntegrationConnectCardProps {
  isConnected: boolean
  accountName: string | null
  connectedAt: string | null
  recentMessages: Lead[]
  onConnect: () => void
  onDisconnect: () => void
}
