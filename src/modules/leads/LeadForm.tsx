import type { FormEvent, ReactElement } from 'react'
import { memo, useEffect, useState } from 'react'
import { X } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import type { Lead, LeadSource, LeadStatus } from '@/types/lead.types'
import type { CreateLeadPayload, UpdateLeadPayload } from '@/types/lead.types'
import { isRequiredField, isValidEmail } from '@/utils/validators'

export interface LeadFormState {
  source: LeadSource
  companyName: string
  contactName: string
  email: string
  phone: string
  status: LeadStatus
  message: string
  errors: Partial<Record<'companyName' | 'contactName' | 'email' | 'message', string>>
}

export interface LeadFormProps {
  mode: 'create' | 'edit'
  initialData?: Lead
  onSubmit: (payload: CreateLeadPayload | UpdateLeadPayload) => void
  onCancel: () => void
}

function emptyFormState(): LeadFormState {
  return {
    source: 'manual',
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    status: 'new',
    message: '',
    errors: {},
  }
}

function fromLead(lead: Lead): LeadFormState {
  return {
    source: lead.source,
    companyName: lead.companyName,
    contactName: lead.contactName,
    email: lead.email,
    phone: lead.phone ?? '',
    status: lead.status,
    message: lead.source === 'manual' ? '' : lead.message,
    errors: {},
  }
}

function buildCreatePayload(form: LeadFormState, aiScore: number): CreateLeadPayload {
  const base = {
    companyName: form.companyName.trim(),
    contactName: form.contactName.trim(),
    email: form.email.trim(),
    phone: form.phone.trim() === '' ? null : form.phone.trim(),
    status: form.status,
    aiScore,
  }
  if (form.source === 'manual') {
    return { ...base, source: 'manual' as const }
  }
  if (form.source === 'whatsapp') {
    return {
      ...base,
      source: 'whatsapp' as const,
      message: form.message.trim(),
    } as CreateLeadPayload
  }
  return {
    ...base,
    source: 'instagram' as const,
    message: form.message.trim(),
  } as CreateLeadPayload
}

function buildUpdatePayload(form: LeadFormState): UpdateLeadPayload {
  const base = {
    companyName: form.companyName.trim(),
    contactName: form.contactName.trim(),
    email: form.email.trim(),
    phone: form.phone.trim() === '' ? null : form.phone.trim(),
    status: form.status,
  }
  if (form.source === 'manual') {
    return { ...base, source: 'manual' as const }
  }
  if (form.source === 'whatsapp') {
    return {
      ...base,
      source: 'whatsapp' as const,
      message: form.message.trim(),
    } as UpdateLeadPayload
  }
  return {
    ...base,
    source: 'instagram' as const,
    message: form.message.trim(),
  } as UpdateLeadPayload
}

function LeadFormComponent({
  mode,
  initialData,
  onSubmit,
  onCancel,
}: LeadFormProps): ReactElement {
  const [form, setForm] = useState<LeadFormState>(() => {
    if (mode === 'edit' && initialData !== undefined) {
      return fromLead(initialData)
    }
    return emptyFormState()
  })

  // Resets fields when switching create/edit or when the loaded lead row changes.
  useEffect(() => {
    if (mode === 'edit' && initialData !== undefined) {
      setForm(fromLead(initialData))
      return
    }
    setForm(emptyFormState())
  }, [mode, initialData])

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    const nextErrors: LeadFormState['errors'] = {}
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
    if (form.source !== 'manual' && !isRequiredField(form.message)) {
      nextErrors.message = 'Inbound message is required for this source'
    }
    if (Object.keys(nextErrors).length > 0) {
      setForm((previous) => ({ ...previous, errors: nextErrors }))
      return
    }

    if (mode === 'create') {
      const aiScore = Math.floor(Math.random() * 100)
      onSubmit(buildCreatePayload(form, aiScore))
      return
    }
    onSubmit(buildUpdatePayload(form))
  }

  const heading = mode === 'create' ? 'New lead' : 'Edit lead'

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex items-start justify-between gap-3 border-b border-border-muted pb-3">
        <div>
          <h2 id="lead-form-title" className="type-feature text-text-primary">
            {heading}
          </h2>
          <p className="type-body-small mt-1 text-slate-600">
            {mode === 'create'
              ? 'Capture a lead from any channel.'
              : 'Update pipeline fields for this lead.'}
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-mdToken border border-border-muted bg-surface-base text-slate-600 transition hover:bg-surface-secondary hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
          aria-label="Close lead form"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <span className="type-caption block uppercase tracking-wide text-slate-600">
            Source
          </span>
          {mode === 'edit' && initialData !== undefined ? (
            <p className="type-body-small mt-1.5 capitalize text-text-primary">{initialData.source}</p>
          ) : (
            <Select
              id="lead-source"
              name="source"
              value={form.source}
              onChange={(event) => {
                const value = event.target.value as LeadSource
                setForm((previous) => ({
                  ...previous,
                  source: value,
                  message: value === 'manual' ? '' : previous.message,
                  errors: { ...previous.errors, message: undefined },
                }))
              }}
            >
              <option value="manual">Manual</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="instagram">Instagram</option>
            </Select>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            className="type-caption block uppercase tracking-wide text-slate-600"
            htmlFor="lead-company"
          >
            Company name
          </label>
          <Input
            id="lead-company"
            name="companyName"
            type="text"
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
            htmlFor="lead-contact"
          >
            Contact name
          </label>
          <Input
            id="lead-contact"
            name="contactName"
            type="text"
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
            htmlFor="lead-email"
          >
            Email
          </label>
          <Input
            id="lead-email"
            name="email"
            type="email"
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
            htmlFor="lead-phone"
          >
            Phone
          </label>
          <Input
            id="lead-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={(event) => {
              setForm((previous) => ({ ...previous, phone: event.target.value }))
            }}
          />
        </div>

        <div>
          <label
            className="type-caption block uppercase tracking-wide text-slate-600"
            htmlFor="lead-status"
          >
            Status
          </label>
          <Select
            id="lead-status"
            name="status"
            value={form.status}
            onChange={(event) => {
              setForm((previous) => ({
                ...previous,
                status: event.target.value as LeadStatus,
              }))
            }}
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="closed">Closed</option>
          </Select>
        </div>

        {form.source !== 'manual' ? (
          <div className="sm:col-span-2">
            <label
              className="type-caption block uppercase tracking-wide text-slate-600"
              htmlFor="lead-message"
            >
              Inbound message
            </label>
            <textarea
              id="lead-message"
              name="message"
              rows={4}
              value={form.message}
              onChange={(event) => {
                setForm((previous) => ({
                  ...previous,
                  message: event.target.value,
                  errors: { ...previous.errors, message: undefined },
                }))
              }}
              className="type-body-small mt-1.5 w-full resize-y rounded-mdToken border border-border-muted bg-surface-base px-3 py-2.5 text-text-primary outline-none transition focus-visible:border-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
            />
            {form.errors.message !== undefined ? (
              <p className="type-small mt-1 text-red-700" role="alert">
                {form.errors.message}
              </p>
            ) : null}
          </div>
        ) : null}
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
          {mode === 'create' ? 'Create lead' : 'Save changes'}
        </Button>
      </div>
    </form>
  )
}

export const LeadForm = memo(LeadFormComponent)
