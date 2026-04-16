import type { ReactElement } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Plus, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { ConfirmDialog } from '@/components/shared/ConfirmDialog'
import { LIST_PAGE_SIZE, Pagination } from '@/components/shared/Pagination'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { Spinner } from '@/components/ui/Spinner'
import { useCustomers } from '@/hooks/useCustomers'
import { useToast } from '@/hooks/useToast'
import { CustomerForm } from '@/modules/customers/CustomerForm'
import { CustomersTable } from '@/modules/customers/CustomersTable'
import type { ID } from '@/types/common.types'
import type {
  CreateCustomerPayload,
  UpdateCustomerPayload,
} from '@/types/customer.types'

interface CustomersUiState {
  isCreateOpen: boolean
  editingId: ID | null
  deletingId: ID | null
}

const initialUi: CustomersUiState = {
  isCreateOpen: false,
  editingId: null,
  deletingId: null,
}

export function CustomersPage(): ReactElement {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const {
    customers,
    isLoading,
    error,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  } = useCustomers()

  const [ui, setUi] = useState<CustomersUiState>(initialUi)
  const [page, setPage] = useState<number>(1)

  const customerTotalPages = useMemo((): number => {
    if (customers.length <= 0) {
      return 1
    }
    return Math.ceil(customers.length / LIST_PAGE_SIZE)
  }, [customers.length])

  useEffect(() => {
    if (page > customerTotalPages) {
      setPage(customerTotalPages)
    }
  }, [customerTotalPages, page])

  const paginatedCustomers = useMemo(() => {
    const start = (page - 1) * LIST_PAGE_SIZE
    return customers.slice(start, start + LIST_PAGE_SIZE)
  }, [customers, page])

  const editingCustomer = useMemo(() => {
    if (ui.editingId === null) {
      return undefined
    }
    return customers.find((row) => row.id === ui.editingId)
  }, [customers, ui.editingId])

  const deletingCustomer = useMemo(() => {
    if (ui.deletingId === null) {
      return null
    }
    return customers.find((row) => row.id === ui.deletingId) ?? null
  }, [customers, ui.deletingId])

  const closeModal = useCallback((): void => {
    setUi((previous) => ({
      ...previous,
      isCreateOpen: false,
      editingId: null,
    }))
  }, [])

  const handleView = useCallback(
    (id: ID) => {
      navigate(`/customers/${id}`)
    },
    [navigate],
  )

  const handleEdit = useCallback((id: ID) => {
    setUi((previous) => ({
      ...previous,
      isCreateOpen: false,
      editingId: id,
    }))
  }, [])

  const handleDeleteRequest = useCallback((id: ID) => {
    setUi((previous) => ({ ...previous, deletingId: id }))
  }, [])

  const handleConfirmDelete = useCallback((): void => {
    if (deletingCustomer === null) {
      return
    }
    const ok = deleteCustomer(deletingCustomer.id)
    setUi((previous) => ({ ...previous, deletingId: null }))
    if (ok) {
      showToast({ message: 'Customer removed' })
    } else {
      showToast({ message: 'Could not remove customer', type: 'error' })
    }
  }, [deleteCustomer, deletingCustomer, showToast])

  const handleCancelDelete = useCallback((): void => {
    setUi((previous) => ({ ...previous, deletingId: null }))
  }, [])

  const handleOpenCreate = useCallback((): void => {
    setUi((previous) => ({
      ...previous,
      isCreateOpen: true,
      editingId: null,
    }))
  }, [])

  const handleFormSubmit = useCallback(
    (payload: CreateCustomerPayload | UpdateCustomerPayload): void => {
      if (ui.isCreateOpen) {
        const ok = createCustomer(payload as CreateCustomerPayload)
        if (ok) {
          showToast({ message: 'Customer created' })
          closeModal()
        } else {
          showToast({ message: 'Could not create customer', type: 'error' })
        }
        return
      }
      if (ui.editingId !== null) {
        const ok = updateCustomer(ui.editingId, payload as UpdateCustomerPayload)
        if (ok) {
          showToast({ message: 'Customer updated' })
          closeModal()
        } else {
          showToast({ message: 'Could not update customer', type: 'error' })
        }
      }
    },
    [
      closeModal,
      createCustomer,
      showToast,
      ui.editingId,
      ui.isCreateOpen,
      updateCustomer,
    ],
  )

  const handleCustomersPageChange = useCallback((nextPage: number): void => {
    setPage(nextPage)
  }, [])

  const isFormOpen = ui.isCreateOpen || ui.editingId !== null
  const formMode = ui.isCreateOpen ? 'create' : 'edit'

  return (
    <div className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-y-auto">
      <PageHeader
        title="Customers"
        description="Create and manage company records in your CRM."
        action={
          <Button
            type="button"
            onClick={handleOpenCreate}
            variant="primaryPill"
            size="sm"
          >
            <Plus className="h-4 w-4" aria-hidden />
            New Customer
          </Button>
        }
      />

      {error !== null ? (
        <p className="type-body-small mb-4 rounded-mdToken border border-red-700/30 bg-red-50 px-4 py-3 text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      {isLoading ? (
        <Spinner label="Loading customers" />
      ) : customers.length === 0 ? (
        <EmptyState
          title="No customers yet"
          description="Create your first company record to start building quotations and orders."
          icon={<Users className="h-10 w-10" aria-hidden />}
        />
      ) : (
        <>
          <CustomersTable
            customers={paginatedCustomers}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDeleteRequest}
          />
          <Pagination
            page={page}
            pageSize={LIST_PAGE_SIZE}
            totalItems={customers.length}
            onPageChange={handleCustomersPageChange}
            ariaLabel="Customers pagination"
          />
        </>
      )}

      {isFormOpen ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-text-primary/50 backdrop-blur-sm"
            aria-label="Close form"
            onClick={closeModal}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="customer-form-title"
            className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-slate-300 bg-surface-base p-6 shadow-2xl"
          >
            {formMode === 'edit' && editingCustomer === undefined ? (
              <Spinner label="Loading" className="py-8" />
            ) : (
              <CustomerForm
                key={ui.isCreateOpen ? 'create' : ui.editingId ?? 'edit'}
                mode={formMode}
                initialData={formMode === 'edit' ? editingCustomer : undefined}
                onSubmit={handleFormSubmit}
                onCancel={closeModal}
              />
            )}
          </div>
        </div>
      ) : null}

      {ui.deletingId !== null && deletingCustomer !== null ? (
        <ConfirmDialog
          title="Delete customer"
          message={`Permanently remove “${deletingCustomer.companyName}”? This cannot be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      ) : null}
    </div>
  )
}
