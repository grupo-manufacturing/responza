import type { FormEvent, ReactElement } from 'react'
import { memo, useEffect, useState } from 'react'
import { X } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import type { Customer } from '@/types/customer.types'
import type {
  CreateCustomerPayload,
  UpdateCustomerPayload,
} from '@/types/customer.types'
import { isRequiredField, isValidEmail } from '@/utils/validators'

export interface CustomerFormState {
  companyName: string
  contactName: string
  email: string
  phone: string
  address: string
  notes: string
  errors: Partial<Record<'companyName' | 'contactName' | 'email', string>>
}

export interface CustomerFormProps {
  mode: 'create' | 'edit'
  initialData?: Customer
  onSubmit: (payload: CreateCustomerPayload | UpdateCustomerPayload) => void
  onCancel: () => void
}

function emptyFormState(): CustomerFormState {
  return {
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
    errors: {},
  }
}

function fromCustomer(customer: Customer): CustomerFormState {
  return {
    companyName: customer.companyName,
    contactName: customer.contactName,
    email: customer.email,
    phone: customer.phone ?? '',
    address: customer.address ?? '',
    notes: customer.notes ?? '',
    errors: {},
  }
}

function toPayload(form: CustomerFormState): CreateCustomerPayload {
  return {
    companyName: form.companyName.trim(),
    contactName: form.contactName.trim(),
    email: form.email.trim(),
    phone: form.phone.trim() === '' ? null : form.phone.trim(),
    address: form.address.trim() === '' ? null : form.address.trim(),
    notes: form.notes.trim() === '' ? null : form.notes.trim(),
  }
}

function CustomerFormComponent({
  mode,
  initialData,
  onSubmit,
  onCancel,
}: CustomerFormProps): ReactElement {
  const [form, setForm] = useState<CustomerFormState>(() => {
    if (mode === 'edit' && initialData !== undefined) {
      return fromCustomer(initialData)
    }
    return emptyFormState()
  })

  // Resets fields when switching create/edit or when the loaded customer row changes.
  useEffect(() => {
    if (mode === 'edit' && initialData !== undefined) {
      setForm(fromCustomer(initialData))
      return
    }
    setForm(emptyFormState())
  }, [mode, initialData])

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    const nextErrors: CustomerFormState['errors'] = {}
    if (!isRequiredField(form.companyName)) {
      nextErrors.companyName = 'Company name is required'
    }
    if (!isRequiredField(form.contactName)) {
      nextErrors.contactName = 'Contact name is required'
    }
    if (!isRequiredField(form.email)) {
      nextErrors.email = 'Email is required'
    } else if (!isValidEmail(form.email)) {
      nextErrors.email = 'Enter a valid email address'
    }
    if (Object.keys(nextErrors).length > 0) {
      setForm((previous) => ({ ...previous, errors: nextErrors }))
      return
    }
    onSubmit(toPayload({ ...form, errors: {} }))
  }

  const heading = mode === 'create' ? 'New customer' : 'Edit customer'

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex items-start justify-between gap-3 border-b border-border-muted pb-3">
        <div>
          <h2 id="customer-form-title" className="type-feature text-text-primary">
            {heading}
          </h2>
          <p className="type-body-small mt-1 text-slate-600">
            {mode === 'create'
              ? 'Add a company record to your directory.'
              : 'Update details for this account.'}
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-mdToken border border-border-muted bg-surface-base text-slate-600 transition hover:bg-surface-secondary hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
          aria-label="Close customer form"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            className="type-caption block uppercase tracking-wide text-slate-600"
            htmlFor="customer-company"
          >
            Company name
          </label>
          <Input
            id="customer-company"
            name="companyName"
            type="text"
            autoComplete="organization"
            value={form.companyName}
            onChange={(event) => {
              setForm((previous) => ({
                ...previous,
                companyName: event.target.value,
                errors: { ...previous.errors, companyName: undefined },
              }))
            }}
          />
          {form.errors.companyName !== undefined ? (
            <p className="type-small mt-1 text-red-700" role="alert">
              {form.errors.companyName}
            </p>
          ) : null}
        </div>

        <div>
          <label
            className="type-caption block uppercase tracking-wide text-slate-600"
            htmlFor="customer-contact"
          >
            Contact name
          </label>
          <Input
            id="customer-contact"
            name="contactName"
            type="text"
            autoComplete="name"
            value={form.contactName}
            onChange={(event) => {
              setForm((previous) => ({
                ...previous,
                contactName: event.target.value,
                errors: { ...previous.errors, contactName: undefined },
              }))
            }}
          />
          {form.errors.contactName !== undefined ? (
            <p className="type-small mt-1 text-red-700" role="alert">
              {form.errors.contactName}
            </p>
          ) : null}
        </div>

        <div>
          <label
            className="type-caption block uppercase tracking-wide text-slate-600"
            htmlFor="customer-email"
          >
            Email
          </label>
          <Input
            id="customer-email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) => {
              setForm((previous) => ({
                ...previous,
                email: event.target.value,
                errors: { ...previous.errors, email: undefined },
              }))
            }}
          />
          {form.errors.email !== undefined ? (
            <p className="type-small mt-1 text-red-700" role="alert">
              {form.errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label
            className="type-caption block uppercase tracking-wide text-slate-600"
            htmlFor="customer-phone"
          >
            Phone
          </label>
          <Input
            id="customer-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(event) => {
              setForm((previous) => ({ ...previous, phone: event.target.value }))
            }}
          />
        </div>

        <div className="sm:col-span-2">
          <label
            className="type-caption block uppercase tracking-wide text-slate-600"
            htmlFor="customer-address"
          >
            Address
          </label>
          <Input
            id="customer-address"
            name="address"
            type="text"
            autoComplete="street-address"
            value={form.address}
            onChange={(event) => {
              setForm((previous) => ({ ...previous, address: event.target.value }))
            }}
          />
        </div>

        <div className="sm:col-span-2">
          <label
            className="type-caption block uppercase tracking-wide text-slate-600"
            htmlFor="customer-notes"
          >
            Notes
          </label>
          <textarea
            id="customer-notes"
            name="notes"
            rows={3}
            value={form.notes}
            onChange={(event) => {
              setForm((previous) => ({ ...previous, notes: event.target.value }))
            }}
            className="type-body-small mt-1.5 w-full resize-y rounded-mdToken border border-border-muted bg-surface-base px-3 py-2.5 text-text-primary outline-none transition focus-visible:border-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-end gap-2 border-t border-border-muted pt-4">
        <Button
          type="button"
          onClick={onCancel}
          variant="blueBordered"
          size="sm"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primaryPill"
          size="sm"
        >
          {mode === 'create' ? 'Create customer' : 'Save changes'}
        </Button>
      </div>
    </form>
  )
}

export const CustomerForm = memo(CustomerFormComponent)
