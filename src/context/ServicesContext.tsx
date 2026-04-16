import { createContext, useMemo, type ReactElement, type ReactNode } from 'react'

import type { IAuthService } from '@/interfaces/IAuthService'
import type { ICommunicationsService } from '@/interfaces/ICommunicationsService'
import type { ICustomersService } from '@/interfaces/ICustomersService'
import type { ILeadsService } from '@/interfaces/ILeadsService'
import type { IOrdersService } from '@/interfaces/IOrdersService'
import type { IQuotationsService } from '@/interfaces/IQuotationsService'
import type { IStorageService } from '@/interfaces/IStorageService'
import { AuthService } from '@/services/auth.service'
import { CommunicationsService } from '@/services/communications.service'
import { CustomersService } from '@/services/customers.service'
import { LeadsService } from '@/services/leads.service'
import { OrdersService } from '@/services/orders.service'
import { QuotationsService } from '@/services/quotations.service'
import { StorageService } from '@/services/storage.service'

export interface ServicesContextValue {
  storage: IStorageService
  auth: IAuthService
  leads: ILeadsService
  communications: ICommunicationsService
  customers: ICustomersService
  quotations: IQuotationsService
  orders: IOrdersService
}

export const ServicesContext = createContext<ServicesContextValue | null>(null)

export function ServicesProvider({
  children,
}: {
  children: ReactNode
}): ReactElement {
  const value = useMemo((): ServicesContextValue => {
    const storage: IStorageService = new StorageService()
    storage.init()
    const auth = new AuthService(storage)
    const communications = new CommunicationsService(storage)
    const customers = new CustomersService(storage)
    const leads = new LeadsService(storage)
    const orders = new OrdersService(storage)
    const quotations = new QuotationsService(storage)
    return {
      storage,
      auth,
      leads,
      communications,
      customers,
      quotations,
      orders,
    }
  }, [])

  return (
    <ServicesContext.Provider value={value}>{children}</ServicesContext.Provider>
  )
}
