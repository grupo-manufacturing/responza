import type { FormEvent, ReactElement } from 'react'
import {
  memo,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'
import { Plus, Trash2, X } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import type { Customer } from '@/types/customer.types'
import type { ID } from '@/types/common.types'
import type {
  CreateQuotationPayload,
  LineItem,
  Quotation,
  QuotationStatus,
  UpdateQuotationPayload,
} from '@/types/quotation.types'
import { generateId } from '@/utils/idGenerator'

const TAX_RATE = 0.08

type LineItemsAction =
  | { type: 'ADD' }
  | { type: 'REMOVE'; id: ID }
  | {
      type: 'UPDATE'
      id: ID
      field: 'description' | 'quantity' | 'unitPrice'
      value: string
    }
  | { type: 'RESET'; items: LineItem[] }

function recalcLineTotal(quantity: number, unitPrice: number): number {
  const q = Number.isFinite(quantity) ? quantity : 0
  const u = Number.isFinite(unitPrice) ? unitPrice : 0
  return Math.round(q * u * 100) / 100
}

function lineItemsReducer(state: LineItem[], action: LineItemsAction): LineItem[] {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        {
          id: generateId(),
          description: '',
          quantity: 1,
          unitPrice: 0,
          lineTotal: 0,
        },
      ]
    case 'REMOVE':
      return state.filter((row) => row.id !== action.id)
    case 'RESET':
      return action.items
    case 'UPDATE': {
      return state.map((row) => {
        if (row.id !== action.id) {
          return row
        }
        if (action.field === 'description') {
          return { ...row, description: action.value }
        }
        const raw = action.value.trim() === '' ? 0 : Number(action.value)
        const num = Number.isFinite(raw) ? raw : 0
        const quantity = action.field === 'quantity' ? num : row.quantity
        const unitPrice = action.field === 'unitPrice' ? num : row.unitPrice
        return {
          ...row,
          quantity,
          unitPrice,
          lineTotal: recalcLineTotal(quantity, unitPrice),
        }
      })
    }
    default:
      return state
  }
}

function computeTotals(lineItems: LineItem[]): {
  subtotal: number
  tax: number
  total: number
} {
  const subtotal = Math.round(
    lineItems.reduce((sum, row) => sum + row.lineTotal, 0) * 100,
  ) / 100
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100
  const total = Math.round((subtotal + tax) * 100) / 100
  return { subtotal, tax, total }
}

export interface QuotationFormProps {
  mode: 'create' | 'edit'
  initialData?: Quotation
  customers: Customer[]
  /** Required when mode is create — parent assigns next quote number. */
  draftQuoteNumber?: string
  onSubmit: (
    payload: CreateQuotationPayload | UpdateQuotationPayload,
  ) => void
  onCancel: () => void
}

function QuotationFormComponent({
  mode,
  initialData,
  customers,
  draftQuoteNumber,
  onSubmit,
  onCancel,
}: QuotationFormProps): ReactElement {
  const [customerId, setCustomerId] = useState<string>(() =>
    mode === 'edit' && initialData !== undefined
      ? initialData.customerId
      : customers[0]?.id ?? '',
  )
  const [status, setStatus] = useState<QuotationStatus>(() =>
    mode === 'edit' && initialData !== undefined ? initialData.status : 'draft',
  )
  const [validUntil, setValidUntil] = useState<string>(() =>
    mode === 'edit' &&
    initialData !== undefined &&
    initialData.validUntil !== null
      ? initialData.validUntil.slice(0, 10)
      : '',
  )
  const [notes, setNotes] = useState<string>(() =>
    mode === 'edit' && initialData !== undefined && initialData.notes !== null
      ? initialData.notes
      : '',
  )

  const [lineItems, dispatchLineItems] = useReducer(
    lineItemsReducer,
    undefined,
    (): LineItem[] => {
      if (mode === 'edit' && initialData !== undefined) {
        return initialData.lineItems.map((row) => ({ ...row }))
      }
      return [
        {
          id: generateId(),
          description: '',
          quantity: 1,
          unitPrice: 0,
          lineTotal: 0,
        },
      ]
    },
  )

  const { subtotal, tax, total } = useMemo(
    () => computeTotals(lineItems),
    [lineItems],
  )

  useEffect(() => {
    if (mode === 'edit' && initialData !== undefined) {
      setCustomerId(initialData.customerId)
      setStatus(initialData.status)
      setValidUntil(
        initialData.validUntil !== null ? initialData.validUntil.slice(0, 10) : '',
      )
      setNotes(initialData.notes ?? '')
      dispatchLineItems({ type: 'RESET', items: initialData.lineItems.map((r) => ({ ...r })) })
      return
    }
    setCustomerId(customers[0]?.id ?? '')
    setStatus('draft')
    setValidUntil('')
    setNotes('')
    dispatchLineItems({
      type: 'RESET',
      items: [
        {
          id: generateId(),
          description: '',
          quantity: 1,
          unitPrice: 0,
          lineTotal: 0,
        },
      ],
    })
  }, [mode, initialData, customers])

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    if (customerId.trim() === '') {
      return
    }
    if (mode === 'create' && (draftQuoteNumber === undefined || draftQuoteNumber.trim() === '')) {
      return
    }
    const validUntilValue = validUntil.trim() === '' ? null : `${validUntil.trim()}T23:59:59.000Z`
    const notesValue = notes.trim() === '' ? null : notes.trim()

    if (mode === 'create') {
      const payload: CreateQuotationPayload = {
        customerId,
        quoteNumber: draftQuoteNumber!.trim(),
        status,
        lineItems,
        subtotal,
        tax,
        total,
        validUntil: validUntilValue,
        notes: notesValue,
        convertedToOrderId: null,
      }
      onSubmit(payload)
      return
    }

    if (initialData === undefined) {
      return
    }

    const payload: UpdateQuotationPayload = {
      customerId,
      status,
      lineItems,
      subtotal,
      tax,
      total,
      validUntil: validUntilValue,
      notes: notesValue,
    }
    onSubmit(payload)
  }

  const quoteLabel =
    mode === 'create' ? (draftQuoteNumber ?? '—') : (initialData?.quoteNumber ?? '—')

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex items-start justify-between gap-3 border-b border-border-muted pb-3">
        <div>
          <h2 id="quotation-form-title" className="type-feature text-text-primary">
            {mode === 'create' ? 'New quotation' : 'Edit quotation'}
          </h2>
          <p className="type-body-small mt-1 text-slate-600">
            {mode === 'create'
              ? 'Build and send a new quote for a customer.'
              : 'Update quotation details and line items.'}
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-mdToken border border-border-muted bg-surface-base text-slate-600 transition hover:bg-surface-secondary hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
          aria-label="Close quotation form"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="type-caption block uppercase tracking-wide text-slate-600">
            Quote number
          </label>
          <p className="mt-1.5 font-mono text-sm text-text-primary">{quoteLabel}</p>
        </div>
        <label className="type-caption block uppercase tracking-wide text-slate-600">
          Customer
          <Select
            value={customerId}
            onChange={(e) => {
              setCustomerId(e.target.value)
            }}
            required
          >
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.companyName}
              </option>
            ))}
          </Select>
        </label>
        <label className="type-caption block uppercase tracking-wide text-slate-600">
          Status
          <Select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as QuotationStatus)
            }}
          >
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="expired">Expired</option>
          </Select>
        </label>
        <label className="type-caption block uppercase tracking-wide text-slate-600">
          Valid until
          <Input
            type="date"
            value={validUntil}
            onChange={(e) => {
              setValidUntil(e.target.value)
            }}
          />
        </label>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="type-caption uppercase tracking-wide text-slate-600">
            Line items
          </span>
          <Button
            type="button"
            onClick={() => {
              dispatchLineItems({ type: 'ADD' })
            }}
            variant="blueBordered"
            size="sm"
            className="px-2 py-1"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden />
            Add line
          </Button>
        </div>
        <div className="space-y-2 rounded-mdToken border border-border-muted bg-surface-lightTint p-3">
          {lineItems.map((row) => (
            <div
              key={row.id}
              className="grid gap-2 border-b border-border-muted pb-3 last:border-0 last:pb-0 sm:grid-cols-12 sm:items-end"
            >
              <label className="sm:col-span-5">
                <span className="sr-only">Description</span>
                <Input
                  value={row.description}
                  onChange={(e) => {
                    dispatchLineItems({
                      type: 'UPDATE',
                      id: row.id,
                      field: 'description',
                      value: e.target.value,
                    })
                  }}
                  placeholder="Description"
                  className="mt-0 px-2 py-1.5 text-sm"
                />
              </label>
              <label className="sm:col-span-2">
                <span className="mb-0.5 block text-[10px] uppercase text-slate-600">Qty</span>
                <Input
                  type="number"
                  min={0}
                  step={1}
                  value={row.quantity === 0 ? '' : row.quantity}
                  onChange={(e) => {
                    dispatchLineItems({
                      type: 'UPDATE',
                      id: row.id,
                      field: 'quantity',
                      value: e.target.value,
                    })
                  }}
                  className="mt-0 px-2 py-1.5 text-sm"
                />
              </label>
              <label className="sm:col-span-2">
                <span className="mb-0.5 block text-[10px] uppercase text-slate-600">Unit $</span>
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  value={row.unitPrice === 0 ? '' : row.unitPrice}
                  onChange={(e) => {
                    dispatchLineItems({
                      type: 'UPDATE',
                      id: row.id,
                      field: 'unitPrice',
                      value: e.target.value,
                    })
                  }}
                  className="mt-0 px-2 py-1.5 text-sm"
                />
              </label>
              <div className="flex items-center justify-between gap-2 sm:col-span-3">
                <span className="text-xs tabular-nums text-slate-600">
                  Line: <span className="text-text-primary">${row.lineTotal.toLocaleString()}</span>
                </span>
                <button
                  type="button"
                  disabled={lineItems.length <= 1}
                  onClick={() => {
                    dispatchLineItems({ type: 'REMOVE', id: row.id })
                  }}
                  className="rounded-mdToken p-1.5 text-slate-500 transition hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Remove line"
                >
                  <Trash2 className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <label className="type-caption block uppercase tracking-wide text-slate-600">
        Notes
        <textarea
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value)
          }}
          rows={2}
          className="type-body-small mt-1.5 w-full rounded-mdToken border border-border-muted bg-surface-base px-3 py-2 text-text-primary outline-none focus-visible:border-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
        />
      </label>

      <div className="rounded-mdToken border border-border-muted bg-surface-secondary px-4 py-3 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal</span>
          <span className="tabular-nums text-text-primary">${subtotal.toLocaleString()}</span>
        </div>
        <div className="mt-1 flex justify-between text-slate-600">
          <span>Tax (8%)</span>
          <span className="tabular-nums text-text-primary">${tax.toLocaleString()}</span>
        </div>
        <div className="mt-2 flex justify-between border-t border-border-muted pt-2 font-semibold text-text-primary">
          <span>Total</span>
          <span className="tabular-nums">${total.toLocaleString()}</span>
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
          {mode === 'create' ? 'Create quotation' : 'Save changes'}
        </Button>
      </div>
    </form>
  )
}

export const QuotationForm = memo(QuotationFormComponent)
