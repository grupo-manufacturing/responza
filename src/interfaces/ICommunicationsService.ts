import type { ID } from '@/types/common.types'
import type {
  Conversation,
  ConversationFilters,
  Message,
  SendMessagePayload,
} from '@/types/communication.types'

export interface ICommunicationsService {
  getConversations(filters?: Partial<ConversationFilters>): Conversation[]
  getConversationById(id: ID): Conversation | null
  getMessages(conversationId: ID): Message[]
  sendMessage(payload: SendMessagePayload): Message
  markAsRead(conversationId: ID): void
}
