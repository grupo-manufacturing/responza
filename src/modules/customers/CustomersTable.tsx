import type { ReactElement } from 'react'
import { memo } from 'react'
import { Eye, Pencil, Trash2, Users } from 'lucide-react'

import { EmptyState } from '@/components/ui/EmptyState'
import { Table, TableContainer } from '@/components/ui/Table'
import type { Customer } from '@/types/customer.types'
import type { ID } from '@/types/common.types'

export interface CustomersTableProps {
  customers: Customer[]
  onEdit: (id: ID) => void
  onDelete: (id: ID) => void
  onView: (id: ID) => void
}

function CustomersTableComponent({
  customers,
  onEdit,
  onDelete,
  onView,
}: CustomersTableProps): ReactElement {
  if (customers.length === 0) {
    return (
      <EmptyState
        title="No customers on this page"
        description="Try another page or add a new customer from the header."
        icon={<Users className="h-10 w-10" aria-hidden />}
      />
    )
  }

  return (
    <TableContainer className="rounded-lg">
      <Table className="min-w-full divide-y divide-border-muted text-left text-sm">
        <thead className="bg-surface-secondary text-xs font-semibold uppercase tracking-wide text-slate-600">
          <tr>
            <th scope="col" className="px-4 py-3">
              Company
            </th>
            <th scope="col" className="px-4 py-3">
              Contact
            </th>
            <th scope="col" className="px-4 py-3">
              Email
            </th>
            <th scope="col" className="hidden px-4 py-3 sm:table-cell">
              Phone
            </th>
            <th scope="col" className="px-4 py-3 text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-muted text-slate-700">
          {customers.map((customer) => (
            <tr key={customer.id} className="transition hover:bg-surface-secondary">
              <td className="px-4 py-3 font-medium text-text-primary">{customer.companyName}</td>
              <td className="px-4 py-3 text-slate-600">{customer.contactName}</td>
              <td className="max-w-[200px] truncate px-4 py-3 text-slate-600">{customer.email}</td>
              <td className="hidden px-4 py-3 text-slate-600 sm:table-cell">
                {customer.phone ?? '—'}
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      onView(customer.id)
                    }}
                    className="rounded-mdToken p-2 text-slate-500 transition hover:bg-surface-secondary hover:text-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
                    aria-label={`View ${customer.companyName}`}
                  >
                    <Eye className="h-4 w-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onEdit(customer.id)
                    }}
                    className="rounded-mdToken p-2 text-slate-500 transition hover:bg-surface-secondary hover:text-link-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
                    aria-label={`Edit ${customer.companyName}`}
                  >
                    <Pencil className="h-4 w-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onDelete(customer.id)
                    }}
                    className="rounded-mdToken p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
                    aria-label={`Delete ${customer.companyName}`}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  )
}

export const CustomersTable = memo(CustomersTableComponent)
