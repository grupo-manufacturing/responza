import type { ID, Timestamps } from '@/types/common.types'
import type { PlatformKey } from '@/types/integration.types'

export type MessageDirection = 'inbound' | 'outbound'

export type MessageStatus = 'sent' | 'delivered' | 'read'

export interface Message extends Timestamps {
  id: ID
  conversationId: ID
  direction: MessageDirection
  body: string
  status: MessageStatus
  senderName: string | null
}

export interface Conversation extends Timestamps {
  id: ID
  platform: PlatformKey
  leadId: ID
  contactName: string
  contactHandle: string
  avatarInitials: string
  lastMessagePreview: string
  lastMessageAt: string
  unreadCount: number
  isArchived: boolean
}

export interface ConversationFilters {
  platform: PlatformKey | 'all'
  search: string
}

export type SendMessagePayload = {
  conversationId: ID
  body: string
}
