import type { ReactElement } from 'react'
import { useCallback, useMemo, useState } from 'react'
import { format } from 'date-fns'
import { ArrowLeft, FileDown } from 'lucide-react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { PageHeader } from '@/components/shared/PageHeader'
import { Spinner } from '@/components/ui/Spinner'
import { useCustomers } from '@/hooks/useCustomers'
import { useToast } from '@/hooks/useToast'
import { useQuotations } from '@/hooks/useQuotations'
import { QuotationPDF } from '@/modules/quotations/QuotationPDF'
import type { QuotationStatus } from '@/types/quotation.types'

export function QuotationDetailPage(): ReactElement {
  const { quotationId } = useParams<{ quotationId: string }>()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const {
    quotations,
    updateQuotation,
    convertToOrder,
    isLoading: quotationsLoading,
    error: quotationsError,
  } = useQuotations()
  const {
    customers,
    isLoading: customersLoading,
    error: customersError,
  } = useCustomers()
  const [convertError, setConvertError] = useState<string | null>(null)

  const quotation = useMemo(() => {
    if (quotationId === undefined) {
      return null
    }
    return quotations.find((q) => q.id === quotationId) ?? null
  }, [quotations, quotationId])

  const customer = useMemo(() => {
    if (quotation === null) {
      return null
    }
    return customers.find((c) => c.id === quotation.customerId) ?? null
  }, [customers, quotation])

  const handleStatus = useCallback(
    (next: QuotationStatus): void => {
      if (quotation === null) {
        return
      }
      const ok = updateQuotation(quotation.id, { status: next })
      if (ok) {
        showToast({ message: 'Quotation updated' })
      } else {
        showToast({ message: 'Could not update quotation', type: 'error' })
      }
    },
    [quotation, showToast, updateQuotation],
  )

  const handleConvert = useCallback((): void => {
    if (quotation === null) {
      return
    }
    setConvertError(null)
    try {
      const order = convertToOrder(quotation.id)
      showToast({ message: 'Order created from quotation' })
      navigate(`/orders/${order.id}`)
    } catch (caught: unknown) {
      const message =
        caught instanceof Error ? caught.message : 'Could not convert quotation'
      setConvertError(message)
      showToast({ message, type: 'error' })
    }
  }, [convertToOrder, navigate, quotation, showToast])

  if (quotationId === undefined) {
    return (
      <div className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-y-auto">
        <p className="type-body-small text-slate-600">Missing quotation id.</p>
      </div>
    )
  }

  if (quotationsLoading || customersLoading) {
    return (
      <div className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-y-auto">
        <Spinner label="Loading quotation" />
      </div>
    )
  }

  if (quotationsError !== null || customersError !== null) {
    return (
      <div className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-y-auto">
        <div className="space-y-2" role="alert">
          {quotationsError !== null ? (
            <p className="type-body-small rounded-mdToken border border-red-700/30 bg-red-50 px-4 py-3 text-red-700">
              {quotationsError}
            </p>
          ) : null}
          {customersError !== null ? (
            <p className="type-body-small rounded-mdToken border border-red-700/30 bg-red-50 px-4 py-3 text-red-700">
              {customersError}
            </p>
          ) : null}
        </div>
      </div>
    )
  }

  if (quotation === null) {
    return (
      <div className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-y-auto">
        <PageHeader title="Quotation not found" />
        <Link
          to="/quotations"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-primary transition hover:text-link-secondary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to quotations
        </Link>
      </div>
    )
  }

  if (customer === null) {
    return (
      <div className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-y-auto">
        <PageHeader title="Customer missing" description="This quotation has no matching customer." />
        <Link
          to="/quotations"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-primary transition hover:text-link-secondary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to quotations
        </Link>
      </div>
    )
  }

  const canConvert =
    quotation.status === 'accepted' && quotation.convertedToOrderId === null

  return (
    <div className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-y-auto">
      <div className="mb-6">
        <Link
          to="/quotations"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-brand-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Quotations
        </Link>
      </div>

      <PageHeader
        title={quotation.quoteNumber}
        description={`${customer.companyName} · ${quotation.status}`}
        action={
          customer !== null ? (
            <PDFDownloadLink
              document={<QuotationPDF quotation={quotation} customer={customer} />}
              fileName={`${quotation.quoteNumber}.pdf`}
              className="type-button inline-flex items-center gap-2 rounded-pill border border-brand-primary bg-transparent px-4 py-2 text-brand-primary transition hover:bg-brand-primary hover:text-text-inverse"
            >
              {({ loading }) => (
                <>
                  <FileDown className="h-4 w-4" aria-hidden />
                  {loading ? 'Preparing PDF…' : 'Download PDF'}
                </>
              )}
            </PDFDownloadLink>
          ) : null
        }
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="rounded-lg p-5 lg:col-span-1">
          <h2 className="type-caption uppercase tracking-wide text-slate-600">
            Summary
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="type-small text-slate-600">Total</dt>
              <dd className="mt-0.5 font-semibold tabular-nums text-text-primary">
                ${quotation.total.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="type-small text-slate-600">Valid until</dt>
              <dd className="mt-0.5 text-text-primary">
                {quotation.validUntil !== null
                  ? format(new Date(quotation.validUntil), 'PP')
                  : '—'}
              </dd>
            </div>
            <div>
              <dt className="type-small text-slate-600">Updated</dt>
              <dd className="mt-0.5 text-text-primary">
                {format(new Date(quotation.updatedAt), 'PPp')}
              </dd>
            </div>
          </dl>
        </Card>

        <section className="space-y-4 lg:col-span-2">
          <Card className="rounded-lg p-5">
            <h2 className="type-caption uppercase tracking-wide text-slate-600">
              Status
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {quotation.status === 'draft' ? (
                <>
                  <Button
                    type="button"
                    onClick={() => {
                      handleStatus('sent')
                    }}
                    variant="primaryPill"
                    size="sm"
                  >
                    Mark sent
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      handleStatus('rejected')
                    }}
                    variant="blueBordered"
                    size="sm"
                  >
                    Mark rejected
                  </Button>
                </>
              ) : null}
              {quotation.status === 'sent' ? (
                <>
                  <Button
                    type="button"
                    onClick={() => {
                      handleStatus('accepted')
                    }}
                    variant="primaryPill"
                    size="sm"
                  >
                    Accept
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      handleStatus('rejected')
                    }}
                    variant="blueBordered"
                    size="sm"
                  >
                    Reject
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      handleStatus('expired')
                    }}
                    variant="blueBordered"
                    size="sm"
                  >
                    Mark expired
                  </Button>
                </>
              ) : null}
              {(quotation.status === 'rejected' || quotation.status === 'expired') &&
              quotation.convertedToOrderId === null ? (
                <Button
                  type="button"
                  onClick={() => {
                    handleStatus('draft')
                  }}
                  variant="blueBordered"
                  size="sm"
                >
                  Reopen as draft
                </Button>
              ) : null}
            </div>
          </Card>

          <Card className="rounded-lg p-5">
            <h2 className="type-caption uppercase tracking-wide text-slate-600">
              Convert to order
            </h2>
            {canConvert ? (
              <div className="mt-3">
                <Button
                  type="button"
                  onClick={handleConvert}
                  variant="primaryPill"
                  size="sm"
                >
                  Convert to order
                </Button>
                {convertError !== null ? (
                  <p className="type-small mt-2 text-red-700" role="alert">
                    {convertError}
                  </p>
                ) : null}
              </div>
            ) : quotation.convertedToOrderId !== null ? (
              <p className="mt-3 text-sm text-slate-600">
                Linked order:{' '}
                <Link
                  to={`/orders/${quotation.convertedToOrderId}`}
                  className="font-medium text-brand-primary underline-offset-2 hover:underline"
                >
                  View order
                </Link>
              </p>
            ) : (
              <p className="mt-3 text-sm text-slate-600">
                Set status to <span className="text-text-primary">accepted</span> to enable
                conversion.
              </p>
            )}
          </Card>

          <Card className="rounded-lg p-5">
            <h2 className="type-caption uppercase tracking-wide text-slate-600">
              Line items
            </h2>
            <ul className="mt-3 divide-y divide-border-muted text-sm">
              {quotation.lineItems.map((line) => (
                <li key={line.id} className="flex flex-wrap justify-between gap-2 py-2">
                  <span className="text-text-primary">{line.description || '—'}</span>
                  <span className="tabular-nums text-slate-600">
                    {line.quantity} × ${line.unitPrice.toLocaleString()} = $
                    {line.lineTotal.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </section>
      </div>
    </div>
  )
}
