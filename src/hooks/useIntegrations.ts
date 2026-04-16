import { useCallback, useEffect, useState } from 'react'

import { STORAGE_KEYS } from '@/config/storage-keys'
import { useServices } from '@/hooks/useServices'
import type { IStorageService } from '@/interfaces/IStorageService'
import type {
  IntegrationState,
  IntegrationStateDocument,
  PlatformConfig,
  PlatformKey,
} from '@/types/integration.types'

const INTEGRATION_DOC_ID = 'default'

const DEFAULT_PLATFORM_CONFIG: PlatformConfig = {
  connected: false,
  accountName: null,
  connectedAt: null,
}

const MOCK_ACCOUNT_NAMES: Record<PlatformKey, string> = {
  whatsapp: 'Demo Workspace (WhatsApp)',
  instagram: 'demo.studio.official',
}

function defaultIntegrationState(): IntegrationState {
  return {
    whatsapp: { ...DEFAULT_PLATFORM_CONFIG },
    instagram: { ...DEFAULT_PLATFORM_CONFIG },
  }
}

function integrationStateFromDocs(
  docs: IntegrationStateDocument[],
): IntegrationState {
  const row =
    docs.find((doc) => doc.id === INTEGRATION_DOC_ID) ?? docs[0] ?? null
  if (row === null) {
    return defaultIntegrationState()
  }
  return row.state
}

function readIntegrationStateSync(storage: IStorageService): IntegrationState {
  return integrationStateFromDocs(
    storage.snapshotAll<IntegrationStateDocument>(STORAGE_KEYS.integrations),
  )
}

function persistIntegrationState(
  storage: IStorageService,
  nextState: IntegrationState,
): void {
  const docs = storage.snapshotAll<IntegrationStateDocument>(
    STORAGE_KEYS.integrations,
  )
  const row =
    docs.find((doc) => doc.id === INTEGRATION_DOC_ID) ?? docs[0] ?? null
  if (row === null) {
    storage.create<IntegrationStateDocument>(STORAGE_KEYS.integrations, {
      id: INTEGRATION_DOC_ID,
      state: nextState,
    })
    return
  }
  storage.update<IntegrationStateDocument>(
    STORAGE_KEYS.integrations,
    row.id,
    { state: nextState },
  )
}

export interface UseIntegrationsResult {
  state: IntegrationState
  isLoading: boolean
  error: string | null
  simulateConnect: (platform: PlatformKey) => void
  disconnect: (platform: PlatformKey) => void
}

export function useIntegrations(): UseIntegrationsResult {
  const { storage } = useServices()

  const [state, setState] = useState<IntegrationState>(defaultIntegrationState)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load(): Promise<void> {
      try {
        const docs = await storage.getAll<IntegrationStateDocument>(
          STORAGE_KEYS.integrations,
        )
        if (!cancelled) {
          setState(integrationStateFromDocs(docs))
          setError(null)
        }
      } catch (caught: unknown) {
        const message =
          caught instanceof Error ? caught.message : 'Failed to load integrations'
        if (!cancelled) {
          setError(message)
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [storage])

  const simulateConnect = useCallback(
    (platform: PlatformKey): void => {
      try {
        const current = readIntegrationStateSync(storage)
        const nextState: IntegrationState = {
          ...current,
          [platform]: {
            connected: true,
            accountName: MOCK_ACCOUNT_NAMES[platform],
            connectedAt: new Date().toISOString(),
          },
        }
        persistIntegrationState(storage, nextState)
        setState(nextState)
        setError(null)
      } catch (caught: unknown) {
        const message =
          caught instanceof Error
            ? caught.message
            : 'Failed to connect integration'
        setError(message)
      }
    },
    [storage],
  )

  const disconnect = useCallback(
    (platform: PlatformKey): void => {
      try {
        const current = readIntegrationStateSync(storage)
        const nextState: IntegrationState = {
          ...current,
          [platform]: { ...DEFAULT_PLATFORM_CONFIG },
        }
        persistIntegrationState(storage, nextState)
        setState(nextState)
        setError(null)
      } catch (caught: unknown) {
        const message =
          caught instanceof Error
            ? caught.message
            : 'Failed to disconnect integration'
        setError(message)
      }
    },
    [storage],
  )

  return {
    state,
    isLoading,
    error,
    simulateConnect,
    disconnect,
  }
}
