import type { ReactElement } from 'react'
import { memo } from 'react'
import { Eye, Package, Pencil, Trash2 } from 'lucide-react'

import { StatusBadge } from '@/components/shared/StatusBadge'
import { EmptyState } from '@/components/ui/EmptyState'
import { Table, TableContainer } from '@/components/ui/Table'
import { orderStatusConfig } from '@/modules/orders/orderStatusConfig'
import type { Customer } from '@/types/customer.types'
import type { ID } from '@/types/common.types'
import type { Order } from '@/types/order.types'

export interface OrdersTableProps {
  orders: Order[]
  customers: Customer[]
  onView: (id: ID) => void
  onEdit: (id: ID) => void
  onDelete: (id: ID) => void
}

function companyForCustomer(customers: Customer[], customerId: ID): string {
  const row = customers.find((c) => c.id === customerId)
  return row?.companyName ?? customerId
}

function OrdersTableComponent({
  orders,
  customers,
  onView,
  onEdit,
  onDelete,
}: OrdersTableProps): ReactElement {
  if (orders.length === 0) {
    return (
      <EmptyState
        title="No orders on this page"
        description="Try another page or create a new order from the header."
        icon={<Package className="h-10 w-10" aria-hidden />}
      />
    )
  }

  return (
    <TableContainer className="rounded-lg">
      <div className="overflow-x-auto">
        <Table className="min-w-full divide-y divide-border-muted text-left text-sm">
          <thead className="bg-surface-secondary text-xs font-semibold uppercase tracking-wide text-slate-600">
            <tr>
              <th scope="col" className="px-4 py-3">
                Order #
              </th>
              <th scope="col" className="px-4 py-3">
                Customer
              </th>
              <th scope="col" className="px-4 py-3">
                Status
              </th>
              <th scope="col" className="hidden px-4 py-3 sm:table-cell">
                Total
              </th>
              <th scope="col" className="px-4 py-3 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-muted text-slate-700">
            {orders.map((order) => {
              const badge = orderStatusConfig[order.status]
              return (
                <tr key={order.id} className="transition hover:bg-surface-secondary">
                  <td className="px-4 py-3 font-mono text-xs font-medium text-text-primary sm:text-sm">
                    {order.orderNumber}
                  </td>
                  <td className="max-w-[200px] truncate px-4 py-3 text-slate-600">
                    {companyForCustomer(customers, order.customerId)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge label={badge.label} className={badge.className} />
                  </td>
                  <td className="hidden px-4 py-3 font-medium tabular-nums text-text-primary sm:table-cell">
                    ${order.total.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          onView(order.id)
                        }}
                        className="rounded-mdToken p-2 text-slate-500 transition hover:bg-surface-secondary hover:text-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
                        aria-label={`View ${order.orderNumber}`}
                      >
                        <Eye className="h-4 w-4" aria-hidden />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onEdit(order.id)
                        }}
                        className="rounded-mdToken p-2 text-slate-500 transition hover:bg-surface-secondary hover:text-link-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
                        aria-label={`Edit ${order.orderNumber}`}
                      >
                        <Pencil className="h-4 w-4" aria-hidden />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onDelete(order.id)
                        }}
                        className="rounded-mdToken p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
                        aria-label={`Delete ${order.orderNumber}`}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </TableContainer>
  )
}

export const OrdersTable = memo(OrdersTableComponent)
