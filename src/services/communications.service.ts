import { STORAGE_KEYS } from '@/config/storage-keys'
import type { ICommunicationsService } from '@/interfaces/ICommunicationsService'
import type { IStorageService } from '@/interfaces/IStorageService'
import type { ID } from '@/types/common.types'
import type {
  Conversation,
  ConversationFilters,
  Message,
  SendMessagePayload,
} from '@/types/communication.types'
import { generateId } from '@/utils/idGenerator'

function toTimestamp(value: string): number {
  return new Date(value).getTime()
}

export class CommunicationsService implements ICommunicationsService {
  private readonly storage: IStorageService

  constructor(storage: IStorageService) {
    this.storage = storage
  }

  getConversations(filters?: Partial<ConversationFilters>): Conversation[] {
    const rows = this.storage.snapshotAll<Conversation>(STORAGE_KEYS.conversations)
    const platform = filters?.platform
    const search = filters?.search?.trim().toLowerCase() ?? ''

    return rows
      .filter((conversation) => {
        if (platform !== undefined && platform !== 'all') {
          if (conversation.platform !== platform) {
            return false
          }
        }
        if (search.length === 0) {
          return true
        }
        return (
          conversation.contactName.toLowerCase().includes(search) ||
          conversation.lastMessagePreview.toLowerCase().includes(search)
        )
      })
      .sort((a, b) => toTimestamp(b.lastMessageAt) - toTimestamp(a.lastMessageAt))
  }

  getConversationById(id: ID): Conversation | null {
    return this.storage.snapshotById<Conversation>(STORAGE_KEYS.conversations, id)
  }

  getMessages(conversationId: ID): Message[] {
    return this.storage
      .snapshotAll<Message>(STORAGE_KEYS.messages)
      .filter((message) => message.conversationId === conversationId)
      .sort((a, b) => toTimestamp(a.createdAt) - toTimestamp(b.createdAt))
  }

  sendMessage(payload: SendMessagePayload): Message {
    const conversation = this.getConversationById(payload.conversationId)
    if (conversation === null) {
      throw new Error(
        `CommunicationsService.sendMessage: conversation "${payload.conversationId}" not found`,
      )
    }

    const now = new Date().toISOString()
    const message: Message = {
      id: generateId(),
      conversationId: payload.conversationId,
      direction: 'outbound',
      body: payload.body,
      status: 'sent',
      senderName: null,
      createdAt: now,
      updatedAt: now,
    }

    const created = this.storage.create<Message>(STORAGE_KEYS.messages, message)
    this.storage.update<Conversation>(STORAGE_KEYS.conversations, conversation.id, {
      lastMessagePreview: payload.body.slice(0, 60),
      lastMessageAt: now,
      updatedAt: now,
    })
    return created
  }

  markAsRead(conversationId: ID): void {
    const now = new Date().toISOString()
    this.storage.update<Conversation>(STORAGE_KEYS.conversations, conversationId, {
      unreadCount: 0,
      updatedAt: now,
    })

    const messages = this.getMessages(conversationId)
    messages
      .filter((message) => message.direction === 'inbound')
      .forEach((message) => {
        this.storage.update<Message>(STORAGE_KEYS.messages, message.id, {
          status: 'read',
          updatedAt: now,
        })
      })
  }
}
