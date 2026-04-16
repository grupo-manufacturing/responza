import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react'

import { useServices } from '@/hooks/useServices'

export interface CommunicationsContextValue {
  totalUnread: number
  refreshTotalUnread: () => void
}

export const CommunicationsContext = createContext<CommunicationsContextValue | null>(
  null,
)

export function CommunicationsProvider({
  children,
}: {
  children: ReactNode
}): ReactElement {
  const { communications } = useServices()
  const [totalUnread, setTotalUnread] = useState<number>(0)

  const refreshTotalUnread = useCallback((): void => {
    const unread = communications
      .getConversations()
      .reduce((sum, conversation) => sum + conversation.unreadCount, 0)
    setTotalUnread(unread)
  }, [communications])

  useEffect(() => {
    refreshTotalUnread()
  }, [refreshTotalUnread])

  const value = useMemo(
    (): CommunicationsContextValue => ({
      totalUnread,
      refreshTotalUnread,
    }),
    [refreshTotalUnread, totalUnread],
  )

  return (
    <CommunicationsContext.Provider value={value}>
      {children}
    </CommunicationsContext.Provider>
  )
}
