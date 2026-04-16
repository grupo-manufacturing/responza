import type { ReactElement } from 'react'
import { memo } from 'react'
import { format } from 'date-fns'
import { MessageCircle, QrCode } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import type { IntegrationConnectCardProps } from '@/modules/integrations/integrationConnectCard.types'

const MODAL_TOGGLE_ID = 'integration-whatsapp-connect-modal'

function WhatsAppConnectCardComponent({
  isConnected,
  accountName,
  connectedAt,
  recentMessages,
  onConnect,
  onDisconnect,
}: IntegrationConnectCardProps): ReactElement {
  if (isConnected) {
    return (
      <Card className="flex h-full flex-col rounded-lg p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-mdToken border border-brand-primary/30 bg-brand-primary/10 text-brand-primary">
              <MessageCircle className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <h2 className="type-feature text-text-primary">WhatsApp</h2>
              <p className="type-body-small text-slate-600">Business messaging</p>
            </div>
          </div>
          <span className="type-small rounded-full border border-brand-primary/40 bg-brand-primary/10 px-3 py-1 uppercase tracking-wide text-brand-primary">
            Connected
          </span>
        </div>
        <dl className="mt-6 space-y-2 text-sm">
          <div>
            <dt className="type-small text-slate-600">Account</dt>
            <dd className="mt-0.5 font-medium text-text-primary">{accountName ?? '—'}</dd>
          </div>
          {connectedAt !== null ? (
            <div>
              <dt className="type-small text-slate-600">Connected</dt>
              <dd className="mt-0.5 text-text-primary">
                <time dateTime={connectedAt}>{format(new Date(connectedAt), 'PPp')}</time>
              </dd>
            </div>
          ) : null}
        </dl>
        <div className="mt-6 flex min-h-0 flex-1 flex-col">
          <h3 className="type-caption uppercase tracking-wide text-slate-600">
            Recent messages
          </h3>
          {recentMessages.length === 0 ? (
            <div className="mt-3">
              <EmptyState
                compact
                title="No WhatsApp leads yet"
                description="Inbound messages will appear here once leads are captured from this channel."
                icon={<MessageCircle className="h-8 w-8" aria-hidden />}
              />
            </div>
          ) : (
            <ul className="mt-3 space-y-2">
              {recentMessages.map((lead) => (
                <li
                  key={lead.id}
                  className="rounded-mdToken border border-border-muted bg-surface-base px-3 py-2 text-sm"
                >
                  <p className="font-medium text-text-primary">{lead.companyName}</p>
                  {lead.source === 'whatsapp' ? (
                    <p className="mt-1 line-clamp-2 text-xs text-slate-600">{lead.message}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Button
          type="button"
          onClick={onDisconnect}
          className="mt-6 w-full"
          variant="blueBordered"
          size="sm"
        >
          Disconnect
        </Button>
      </Card>
    )
  }

  return (
    <Card className="flex h-full flex-col rounded-lg p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-mdToken border border-border-muted bg-surface-secondary text-slate-600">
          <MessageCircle className="h-6 w-6" aria-hidden />
        </span>
        <div>
          <h2 className="type-feature text-text-primary">WhatsApp</h2>
          <p className="type-body-small text-slate-600">Connect your business inbox</p>
        </div>
      </div>

      <input
        id={MODAL_TOGGLE_ID}
        type="checkbox"
        className="peer sr-only"
        aria-hidden
      />
      <label
        htmlFor={MODAL_TOGGLE_ID}
        className="type-button mt-6 inline-flex w-full cursor-pointer items-center justify-center rounded-pill border border-surface-secondary bg-surface-secondary px-4 py-2.5 text-text-primary transition hover:border-brand-hover hover:bg-brand-hover hover:text-text-inverse"
      >
        Connect WhatsApp
      </label>

      <div className="pointer-events-none fixed inset-0 z-50 hidden place-items-center bg-black/70 p-4 backdrop-blur-sm peer-checked:pointer-events-auto peer-checked:grid">
        <label
          htmlFor={MODAL_TOGGLE_ID}
          className="absolute inset-0 cursor-pointer"
          aria-label="Close dialog"
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="whatsapp-connect-title"
          className="relative z-10 w-full max-w-md rounded-lg border border-border-muted bg-surface-base p-6 shadow-2xl"
          onPointerDown={(event) => {
            event.stopPropagation()
          }}
        >
          <h2 id="whatsapp-connect-title" className="type-feature text-text-primary">
            Connect WhatsApp
          </h2>
          <p className="type-body-small mt-1 text-slate-600">
            Scan the code with WhatsApp on your phone, then confirm the link.
          </p>

          <div className="mt-6 flex justify-center">
            <div className="flex h-36 w-36 flex-col items-center justify-center rounded-mdToken border-2 border-dashed border-border-muted bg-surface-secondary text-slate-500">
              <QrCode className="h-10 w-10 opacity-60" aria-hidden />
              <span className="mt-2 text-xs font-medium">Placeholder QR</span>
            </div>
          </div>

          <ol className="mt-6 list-decimal space-y-2 pl-5 text-sm text-slate-600">
            <li>Open WhatsApp on your phone.</li>
            <li>Tap Menu or Settings and link a device.</li>
            <li>Point your camera at the QR code (mocked here).</li>
          </ol>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <label
              htmlFor={MODAL_TOGGLE_ID}
              className="type-button cursor-pointer rounded-pill border border-brand-primary px-4 py-2 text-center text-brand-primary transition hover:bg-brand-primary hover:text-text-inverse"
            >
              Cancel
            </label>
            <Button
              type="button"
              onClick={() => {
                onConnect()
              }}
              variant="primaryPill"
              size="sm"
            >
              Simulate Connection
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

export const WhatsAppConnectCard = memo(WhatsAppConnectCardComponent)
