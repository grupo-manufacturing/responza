import { useCallback, useEffect, useMemo, useState } from 'react'

import { useServices } from '@/hooks/useServices'
import type { ID } from '@/types/common.types'
import type { Order } from '@/types/order.types'
import type {
  CreateQuotationPayload,
  Quotation,
  UpdateQuotationPayload,
} from '@/types/quotation.types'

export interface UseQuotationsResult {
  quotations: Quotation[]
  isLoading: boolean
  error: string | null
  createQuotation: (payload: CreateQuotationPayload) => boolean
  updateQuotation: (id: ID, payload: UpdateQuotationPayload) => boolean
  deleteQuotation: (id: ID) => boolean
  convertToOrder: (quotationId: ID) => Order
  quotationsByCustomer: (customerId: ID) => Quotation[]
}

export function useQuotations(): UseQuotationsResult {
  const { quotations: quotationsService } = useServices()

  const [quotations, setQuotations] = useState<Quotation[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Loads every quotation from storage into local state. Runs once on mount.
  useEffect(() => {
    let cancelled = false
    async function load(): Promise<void> {
      try {
        const rows = await quotationsService.getAll()
        if (!cancelled) {
          setQuotations(rows)
          setError(null)
        }
      } catch (caught: unknown) {
        const message =
          caught instanceof Error ? caught.message : 'Failed to load quotations'
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
  }, [quotationsService])

  const createQuotation = useCallback(
    (payload: CreateQuotationPayload): boolean => {
      try {
        quotationsService.create(payload)
        setQuotations(quotationsService.listFromStore())
        setError(null)
        return true
      } catch (caught: unknown) {
        const message =
          caught instanceof Error ? caught.message : 'Failed to create quotation'
        setError(message)
        return false
      }
    },
    [quotationsService],
  )

  const updateQuotation = useCallback(
    (id: ID, payload: UpdateQuotationPayload): boolean => {
      try {
        quotationsService.update(id, payload)
        setQuotations(quotationsService.listFromStore())
        setError(null)
        return true
      } catch (caught: unknown) {
        const message =
          caught instanceof Error ? caught.message : 'Failed to update quotation'
        setError(message)
        return false
      }
    },
    [quotationsService],
  )

  const deleteQuotation = useCallback(
    (id: ID): boolean => {
      try {
        quotationsService.remove(id)
        setQuotations(quotationsService.listFromStore())
        setError(null)
        return true
      } catch (caught: unknown) {
        const message =
          caught instanceof Error ? caught.message : 'Failed to delete quotation'
        setError(message)
        return false
      }
    },
    [quotationsService],
  )

  const convertToOrder = useCallback(
    (quotationId: ID): Order => {
      try {
        const order = quotationsService.convertToOrder(quotationId)
        setQuotations(quotationsService.listFromStore())
        setError(null)
        return order
      } catch (caught: unknown) {
        const message =
          caught instanceof Error ? caught.message : 'Failed to convert quotation'
        setError(message)
        throw caught instanceof Error ? caught : new Error(message)
      }
    },
    [quotationsService],
  )

  const quotationsByCustomer = useMemo((): ((customerId: ID) => Quotation[]) => {
    return (customerId: ID) =>
      quotations.filter((row) => row.customerId === customerId)
  }, [quotations])

  return {
    quotations,
    isLoading,
    error,
    createQuotation,
    updateQuotation,
    deleteQuotation,
    convertToOrder,
    quotationsByCustomer,
  }
}
