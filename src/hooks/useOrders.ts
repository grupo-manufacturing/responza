import { useCallback, useEffect, useMemo, useState } from 'react'

import { useServices } from '@/hooks/useServices'
import type { ID } from '@/types/common.types'
import type {
  CreateOrderPayload,
  Order,
  UpdateOrderPayload,
} from '@/types/order.types'

export interface UseOrdersResult {
  orders: Order[]
  isLoading: boolean
  error: string | null
  createOrder: (payload: CreateOrderPayload) => boolean
  updateOrder: (id: ID, payload: UpdateOrderPayload) => boolean
  deleteOrder: (id: ID) => boolean
  advanceStatus: (id: ID) => Order
  ordersByCustomer: (customerId: ID) => Order[]
}

export function useOrders(): UseOrdersResult {
  const { orders: ordersService } = useServices()

  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Loads every order from storage into local state. Runs once on mount.
  useEffect(() => {
    let cancelled = false
    async function load(): Promise<void> {
      try {
        const rows = await ordersService.getAll()
        if (!cancelled) {
          setOrders(rows)
          setError(null)
        }
      } catch (caught: unknown) {
        const message =
          caught instanceof Error ? caught.message : 'Failed to load orders'
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
  }, [ordersService])

  const createOrder = useCallback(
    (payload: CreateOrderPayload): boolean => {
      try {
        ordersService.create(payload)
        setOrders(ordersService.listFromStore())
        setError(null)
        return true
      } catch (caught: unknown) {
        const message =
          caught instanceof Error ? caught.message : 'Failed to create order'
        setError(message)
        return false
      }
    },
    [ordersService],
  )

  const updateOrder = useCallback(
    (id: ID, payload: UpdateOrderPayload): boolean => {
      try {
        ordersService.update(id, payload)
        setOrders(ordersService.listFromStore())
        setError(null)
        return true
      } catch (caught: unknown) {
        const message =
          caught instanceof Error ? caught.message : 'Failed to update order'
        setError(message)
        return false
      }
    },
    [ordersService],
  )

  const deleteOrder = useCallback(
    (id: ID): boolean => {
      try {
        ordersService.remove(id)
        setOrders(ordersService.listFromStore())
        setError(null)
        return true
      } catch (caught: unknown) {
        const message =
          caught instanceof Error ? caught.message : 'Failed to delete order'
        setError(message)
        return false
      }
    },
    [ordersService],
  )

  const advanceStatus = useCallback(
    (id: ID): Order => {
      try {
        const updated = ordersService.advanceStatus(id)
        setOrders(ordersService.listFromStore())
        setError(null)
        return updated
      } catch (caught: unknown) {
        const message =
          caught instanceof Error ? caught.message : 'Failed to advance order status'
        setError(message)
        throw caught instanceof Error ? caught : new Error(message)
      }
    },
    [ordersService],
  )

  const ordersByCustomer = useMemo((): ((customerId: ID) => Order[]) => {
    return (customerId: ID) =>
      orders.filter((row) => row.customerId === customerId)
  }, [orders])

  return {
    orders,
    isLoading,
    error,
    createOrder,
    updateOrder,
    deleteOrder,
    advanceStatus,
    ordersByCustomer,
  }
}
