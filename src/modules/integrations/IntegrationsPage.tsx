import type { ReactElement } from 'react'
import { useCallback, useMemo } from 'react'
import { Share2 } from 'lucide-react'

import { PageHeader } from '@/components/shared/PageHeader'
import { Spinner } from '@/components/ui/Spinner'
import { useIntegrations } from '@/hooks/useIntegrations'
import { useLeads } from '@/hooks/useLeads'
import { InstagramConnectCard } from '@/modules/integrations/InstagramConnectCard'
import { WhatsAppConnectCard } from '@/modules/integrations/WhatsAppConnectCard'

export function IntegrationsPage(): ReactElement {
  const { state, isLoading, error, simulateConnect, disconnect } = useIntegrations()
  const { leads, isLoading: leadsLoading } = useLeads()

  const whatsappLeads = useMemo(() => {
    return leads
      .filter((lead) => lead.source === 'whatsapp')
      .slice()
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
  }, [leads])

  const instagramLeads = useMemo(() => {
    return leads
      .filter((lead) => lead.source === 'instagram')
      .slice()
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
  }, [leads])

  const handleWhatsAppConnect = useCallback((): void => {
    simulateConnect('whatsapp')
  }, [simulateConnect])

  const handleWhatsAppDisconnect = useCallback((): void => {
    disconnect('whatsapp')
  }, [disconnect])

  const handleInstagramConnect = useCallback((): void => {
    simulateConnect('instagram')
  }, [simulateConnect])

  const handleInstagramDisconnect = useCallback((): void => {
    disconnect('instagram')
  }, [disconnect])

  const pageLoading = isLoading || leadsLoading

  return (
    <div className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-y-auto">
      <PageHeader
        title="Integrations"
        description="Link WhatsApp and Instagram to capture inbound leads in one place."
      />

      {error !== null ? (
        <p
          className="type-body-small mb-4 rounded-mdToken border border-red-700/30 bg-red-50 px-4 py-3 text-red-700"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      {pageLoading ? (
        <Spinner label="Loading integrations" />
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <WhatsAppConnectCard
            isConnected={state.whatsapp.connected}
            accountName={state.whatsapp.accountName}
            connectedAt={state.whatsapp.connectedAt}
            recentMessages={whatsappLeads}
            onConnect={handleWhatsAppConnect}
            onDisconnect={handleWhatsAppDisconnect}
          />
          <InstagramConnectCard
            isConnected={state.instagram.connected}
            accountName={state.instagram.accountName}
            connectedAt={state.instagram.connectedAt}
            recentMessages={instagramLeads}
            onConnect={handleInstagramConnect}
            onDisconnect={handleInstagramDisconnect}
          />
        </div>
      )}

      {!pageLoading ? (
        <p className="type-small mt-8 flex items-center gap-2 text-slate-600">
          <Share2 className="h-3.5 w-3.5 shrink-0" aria-hidden />
          Connections are simulated for this demo and stored locally in your browser.
        </p>
      ) : null}
    </div>
  )
}
