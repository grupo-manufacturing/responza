import { useCallback, useEffect, useMemo, useState } from 'react'

import { useCommunicationsContext } from '@/hooks/useCommunicationsContext'
import { useServices } from '@/hooks/useServices'
import type {
  Conversation,
  ConversationFilters,
  Message,
  SendMessagePayload,
} from '@/types/communication.types'
import type { ID } from '@/types/common.types'

const DEFAULT_FILTERS: ConversationFilters = {
  platform: 'all',
  search: '',
}

function toTimestamp(value: string): number {
  return new Date(value).getTime()
}

export interface UseCommunicationsReturn {
  conversations: Conversation[]
  isLoading: boolean
  filters: ConversationFilters
  setFilters: (filters: Partial<ConversationFilters>) => void
  totalUnread: number
  activeConversationId: ID | null
  activeConversation: Conversation | null
  messages: Message[]
  openConversation: (id: ID) => void
  closeConversation: () => void
  sendMessage: (body: string) => void
}

export function useCommunications(): UseCommunicationsReturn {
  const { communications: communicationsService } = useServices()
  const { refreshTotalUnread } = useCommunicationsContext()

  const [rawConversations, setRawConversations] = useState<Conversation[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [filters, setFiltersState] = useState<ConversationFilters>(DEFAULT_FILTERS)
  const [activeConversationId, setActiveConversationId] = useState<ID | null>(null)
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const rows = communicationsService.getConversations()
    setRawConversations(rows)
    setIsLoading(false)
    refreshTotalUnread()
  }, [communicationsService, refreshTotalUnread])

  const conversations = useMemo((): Conversation[] => {
    const search = filters.search.trim().toLowerCase()
    return rawConversations
      .filter((conversation) => {
        if (
          filters.platform !== 'all' &&
          conversation.platform !== filters.platform
        ) {
          return false
        }
        if (search === '') {
          return true
        }
        return (
          conversation.contactName.toLowerCase().includes(search) ||
          conversation.lastMessagePreview.toLowerCase().includes(search)
        )
      })
      .sort((a, b) => toTimestamp(b.lastMessageAt) - toTimestamp(a.lastMessageAt))
  }, [rawConversations, filters])

  const totalUnread = useMemo((): number => {
    return rawConversations.reduce(
      (sum, conversation) => sum + conversation.unreadCount,
      0,
    )
  }, [rawConversations])

  const activeConversation = useMemo((): Conversation | null => {
    if (activeConversationId === null) {
      return null
    }
    return (
      rawConversations.find((conversation) => conversation.id === activeConversationId) ??
      null
    )
  }, [activeConversationId, rawConversations])

  const setFilters = useCallback((next: Partial<ConversationFilters>): void => {
    setFiltersState((prev) => ({
      ...prev,
      ...next,
    }))
  }, [])

  const openConversation = useCallback(
    (id: ID): void => {
      const thread = communicationsService.getMessages(id)
      setActiveConversationId(id)
      setMessages(thread)
      setRawConversations((prev) =>
        prev.map((conversation) =>
          conversation.id === id ? { ...conversation, unreadCount: 0 } : conversation,
        ),
      )
      communicationsService.markAsRead(id)
      refreshTotalUnread()
      setMessages((prev) =>
        prev.map((message) =>
          message.direction === 'inbound' ? { ...message, status: 'read' } : message,
        ),
      )
    },
    [communicationsService, refreshTotalUnread],
  )

  const closeConversation = useCallback((): void => {
    setActiveConversationId(null)
    setMessages([])
  }, [])

  const sendMessage = useCallback(
    (body: string): void => {
      if (activeConversationId === null) {
        return
      }
      const payload: SendMessagePayload = {
        conversationId: activeConversationId,
        body,
      }
      const created = communicationsService.sendMessage(payload)
      setMessages((prev) => [...prev, created])
      setRawConversations((prev) =>
        prev.map((conversation) =>
          conversation.id === activeConversationId
            ? {
                ...conversation,
                lastMessagePreview: body.slice(0, 60),
                lastMessageAt: created.createdAt,
                updatedAt: created.updatedAt,
              }
            : conversation,
        ),
      )
      refreshTotalUnread()
    },
    [activeConversationId, communicationsService, refreshTotalUnread],
  )

  return {
    conversations,
    isLoading,
    filters,
    setFilters,
    totalUnread,
    activeConversationId,
    activeConversation,
    messages,
    openConversation,
    closeConversation,
    sendMessage,
  }
}
