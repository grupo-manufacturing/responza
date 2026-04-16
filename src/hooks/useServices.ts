import { useContext } from 'react'

import {
  ServicesContext,
  type ServicesContextValue,
} from '@/context/ServicesContext'
import type { ICommunicationsService } from '@/interfaces/ICommunicationsService'

export type Services = Omit<ServicesContextValue, 'communications'> & {
  communications: ICommunicationsService
}

export function useServices(): Services {
  const ctx = useContext(ServicesContext)
  if (ctx === null) {
    throw new Error('useServices must be used within ServicesProvider')
  }
  return ctx
}
