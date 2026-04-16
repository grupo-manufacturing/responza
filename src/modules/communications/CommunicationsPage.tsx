import type { ReactElement } from 'react'
import { Filter, MessageCircle, Search } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { Input } from '@/components/ui/Input'
import { Spinner } from '@/components/ui/Spinner'
import { useCommunications } from '@/hooks/useCommunications'
import { useIntegrations } from '@/hooks/useIntegrations'
import { ChatPanel } from '@/modules/communications/ChatPanel'
import { ConversationList } from '@/modules/communications/ConversationList'
import type { ID } from '@/types/common.types'

export function CommunicationsPage(): ReactElement {
  const navigate = useNavigate()
  const location = useLocation()
  const {
    conversations,
    isLoading,
    filters,
    setFilters,
    activeConversationId,
    activeConversation,
    messages,
    openConversation,
    sendMessage,
  } = useCommunications()
  const { state, isLoading: integrationsLoading } = useIntegrations()
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false)
  const filtersRef = useRef<HTMLDivElement>(null)

  const hasConnectedPlatform =
    state.whatsapp.connected || state.instagram.connected

  const handleOpenIntegrations = useCallback((): void => {
    navigate('/integrations')
  }, [navigate])

  const handleSearchChange = useCallback(
    (value: string): void => {
      setFilters({ search: value })
    },
    [setFilters],
  )

  const handleSelectConversation = useCallback(
    (id: ID): void => {
      openConversation(id)
    },
    [openConversation],
  )

  const handleViewLead = useCallback(
    (leadId: ID): void => {
      navigate('/leads', { state: { openLeadId: leadId } })
    },
    [navigate],
  )

  useEffect(() => {
    const state = location.state as { openConversationId?: ID } | null
    const targetId = state?.openConversationId
    if (targetId === undefined) {
      return
    }
    openConversation(targetId)
    navigate(location.pathname, { replace: true, state: null })
  }, [location.pathname, location.state, navigate, openConversation])

  useEffect(() => {
    if (!isFiltersOpen) {
      return
    }
    function handlePointerDown(event: MouseEvent): void {
      if (
        filtersRef.current !== null &&
        !filtersRef.current.contains(event.target as Node)
      ) {
        setIsFiltersOpen(false)
      }
    }
    document.addEventListener('mousedown', handlePointerDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
    }
  }, [isFiltersOpen])

  if (isLoading || integrationsLoading) {
    return <Spinner label="Loading conversations" />
  }

  if (!hasConnectedPlatform) {
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-2xl space-y-4">
            <EmptyState
              title="No platforms connected"
              description="Connect WhatsApp or Instagram from the Integrations page to start receiving messages."
              icon={<MessageCircle className="h-10 w-10" aria-hidden />}
            />
            <div className="flex justify-center">
              <Button
                type="button"
                onClick={handleOpenIntegrations}
                variant="primaryPill"
                size="sm"
              >
                Go to Integrations
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col gap-4 overflow-hidden md:flex-row">
      <aside className="flex h-[18rem] min-h-0 w-full shrink-0 flex-col overflow-hidden rounded-lg border border-border-muted bg-surface-lightTint p-3 md:h-full md:w-[320px]">
        <div ref={filtersRef} className="relative mb-3">
          <label className="relative block min-w-0">
            <span className="sr-only">Search conversations</span>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
              aria-hidden
            />
            <Input
              type="text"
              value={filters.search}
              onChange={(event) => {
                handleSearchChange(event.target.value)
              }}
              placeholder="Search conversations"
              className="mt-0 h-10 py-2 pl-9 pr-10"
            />
            <button
              type="button"
              onClick={() => {
                setIsFiltersOpen((open) => !open)
              }}
              className={`absolute right-2 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-mdToken transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary ${
                filters.platform !== 'all'
                  ? 'text-brand-primary'
                  : 'text-slate-500 hover:text-brand-primary'
              }`}
              aria-expanded={isFiltersOpen}
              aria-controls="communications-filters-panel"
              aria-label="Filter conversations by platform"
            >
              <Filter className="h-4 w-4" aria-hidden />
            </button>
          </label>

          {isFiltersOpen ? (
            <div
              id="communications-filters-panel"
              role="region"
              aria-label="Conversation platform filters"
              className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border border-border-muted bg-surface-base p-2 shadow-xl"
            >
              <button
                type="button"
                onClick={() => {
                  setFilters({ platform: 'all' })
                  setIsFiltersOpen(false)
                }}
                className={`flex w-full items-center justify-between rounded-mdToken px-3 py-2 text-left text-sm transition ${
                  filters.platform === 'all'
                    ? 'bg-brand-primary text-text-inverse'
                    : 'text-slate-600 hover:bg-surface-secondary hover:text-text-primary'
                }`}
              >
                <span>All</span>
              </button>
              <button
                type="button"
                disabled={!state.whatsapp.connected}
                onClick={() => {
                  setFilters({ platform: 'whatsapp' })
                  setIsFiltersOpen(false)
                }}
                className={`mt-1 flex w-full items-center justify-between rounded-mdToken px-3 py-2 text-left text-sm transition ${
                  filters.platform === 'whatsapp'
                    ? 'bg-brand-primary text-text-inverse'
                    : 'text-slate-600 hover:bg-surface-secondary hover:text-text-primary'
                } ${
                  !state.whatsapp.connected
                    ? 'cursor-not-allowed text-slate-500 hover:bg-transparent hover:text-slate-500'
                    : ''
                }`}
              >
                <span>WhatsApp</span>
              </button>
              <button
                type="button"
                disabled={!state.instagram.connected}
                onClick={() => {
                  setFilters({ platform: 'instagram' })
                  setIsFiltersOpen(false)
                }}
                className={`mt-1 flex w-full items-center justify-between rounded-mdToken px-3 py-2 text-left text-sm transition ${
                  filters.platform === 'instagram'
                    ? 'bg-brand-primary text-text-inverse'
                    : 'text-slate-600 hover:bg-surface-secondary hover:text-text-primary'
                } ${
                  !state.instagram.connected
                    ? 'cursor-not-allowed text-slate-500 hover:bg-transparent hover:text-slate-500'
                    : ''
                }`}
              >
                <span>Instagram</span>
              </button>
            </div>
          ) : null}
        </div>
        <div className="mt-3 min-h-0 flex-1 overflow-hidden">
          <ConversationList
            conversations={conversations}
            activeConversationId={activeConversationId}
            onSelect={handleSelectConversation}
          />
        </div>
      </aside>

      <section className="min-h-0 min-w-0 flex-1 overflow-hidden">
        <ChatPanel
          conversation={activeConversation}
          messages={messages}
          onSend={sendMessage}
          onViewLead={handleViewLead}
        />
      </section>
    </div>
  )
}
