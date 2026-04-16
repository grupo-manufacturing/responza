import { useCallback, useEffect, useMemo, useState } from 'react'

import { useServices } from '@/hooks/useServices'
import type { ID } from '@/types/common.types'
import type {
  CreateCustomerPayload,
  Customer,
  UpdateCustomerPayload,
} from '@/types/customer.types'

function customerMatchesQuery(customer: Customer, query: string): boolean {
  const q = query.trim().toLowerCase()
  if (q === '') {
    return true
  }
  const haystack = [
    customer.companyName,
    customer.contactName,
    customer.email,
    customer.phone ?? '',
    customer.address ?? '',
    customer.notes ?? '',
  ]
    .join(' ')
    .toLowerCase()
  return haystack.includes(q)
}

export interface UseCustomersResult {
  customers: Customer[]
  isLoading: boolean
  error: string | null
  createCustomer: (payload: CreateCustomerPayload) => boolean
  updateCustomer: (id: ID, payload: UpdateCustomerPayload) => boolean
  deleteCustomer: (id: ID) => boolean
  searchCustomers: (query: string) => Customer[]
}

export function useCustomers(): UseCustomersResult {
  const { customers: customersService } = useServices()

  const [customers, setCustomers] = useState<Customer[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Loads every customer from storage into local state. Runs once on mount.
  useEffect(() => {
    let cancelled = false
    async function load(): Promise<void> {
      try {
        const rows = await customersService.getAll()
        if (!cancelled) {
          setCustomers(rows)
          setError(null)
        }
      } catch (caught: unknown) {
        const message =
          caught instanceof Error ? caught.message : 'Failed to load customers'
        if (!cancelled) {
          setError(message)
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [customersService])

  const createCustomer = useCallback(
    (payload: CreateCustomerPayload): boolean => {
      try {
        customersService.create(payload)
        setCustomers(customersService.listFromStore())
        setError(null)
        return true
      } catch (caught: unknown) {
        const message =
          caught instanceof Error ? caught.message : 'Failed to create customer'
        setError(message)
        return false
      }
    },
    [customersService],
  )

  const updateCustomer = useCallback(
    (id: ID, payload: UpdateCustomerPayload): boolean => {
      try {
        customersService.update(id, payload)
        setCustomers(customersService.listFromStore())
        setError(null)
        return true
      } catch (caught: unknown) {
        const message =
          caught instanceof Error ? caught.message : 'Failed to update customer'
        setError(message)
        return false
      }
    },
    [customersService],
  )

  const deleteCustomer = useCallback(
    (id: ID): boolean => {
      try {
        customersService.remove(id)
        setCustomers(customersService.listFromStore())
        setError(null)
        return true
      } catch (caught: unknown) {
        const message =
          caught instanceof Error ? caught.message : 'Failed to delete customer'
        setError(message)
        return false
      }
    },
    [customersService],
  )

  const searchCustomers = useMemo((): ((query: string) => Customer[]) => {
    return (query: string) => customers.filter((c) => customerMatchesQuery(c, query))
  }, [customers])

  return {
    customers,
    isLoading,
    error,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    searchCustomers,
  }
}
