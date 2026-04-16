import { useContext } from 'react'

import {
  CommunicationsContext,
  type CommunicationsContextValue,
} from '@/context/CommunicationsContext'

export function useCommunicationsContext(): CommunicationsContextValue {
  const ctx = useContext(CommunicationsContext)
  if (ctx === null) {
    throw new Error(
      'useCommunicationsContext must be used within CommunicationsProvider',
    )
  }
  return ctx
}
