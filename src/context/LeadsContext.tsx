import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type ReactElement,
  type ReactNode,
  type SetStateAction,
} from 'react'

import { useServices } from '@/hooks/useServices'
import type { ID } from '@/types/common.types'
import type {
  CreateLeadPayload,
  Lead,
  LeadFilters,
  LeadStatus,
  UpdateLeadPayload,
} from '@/types/lead.types'

const defaultFilters: LeadFilters = {
  source: 'all',
  status: 'all',
  minScore: null,
  maxScore: null,
}

function leadMatchesFilters(lead: Lead, filters: LeadFilters): boolean {
  if (filters.source !== 'all' && lead.source !== filters.source) {
    return false
  }
  if (filters.status !== 'all' && lead.status !== filters.status) {
    return false
  }
  if (filters.minScore !== null && lead.aiScore < filters.minScore) {
    return false
  }
  if (filters.maxScore !== null && lead.aiScore > filters.maxScore) {
    return false
  }
  return true
}

export interface UseLeadsResult {
  leads: Lead[]
  filters: LeadFilters
  setFilters: Dispatch<SetStateAction<LeadFilters>>
  filteredLeads: Lead[]
  isLoading: boolean
  error: string | null
  createLead: (payload: CreateLeadPayload) => boolean
  updateLead: (id: ID, payload: UpdateLeadPayload) => boolean
  deleteLead: (id: ID) => boolean
  updateLeadStatus: (id: ID, status: LeadStatus) => boolean
}

const LeadsContext = createContext<UseLeadsResult | null>(null)

function useLeadsState(): UseLeadsResult {
  const { leads: leadsService } = useServices()

  const [leads, setLeads] = useState<Lead[]>([])
  const [filters, setFilters] = useState<LeadFilters>(defaultFilters)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Loads every lead from storage into local state. Runs once on mount.
  useEffect(() => {
    let cancelled = false
    async function load(): Promise<void> {
      try {
        const rows = await leadsService.getAll()
        if (!cancelled) {
          setLeads(rows)
          setError(null)
        }
      } catch (caught: unknown) {
        const message =
          caught instanceof Error ? caught.message : 'Failed to load leads'
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
  }, [leadsService])

  const createLead = useCallback(
    (payload: CreateLeadPayload): boolean => {
      try {
        leadsService.create(payload)
        setLeads(leadsService.listFromStore())
        setError(null)
        return true
      } catch (caught: unknown) {
        const message =
          caught instanceof Error ? caught.message : 'Failed to create lead'
        setError(message)
        return false
      }
    },
    [leadsService],
  )

  const updateLead = useCallback(
    (id: ID, payload: UpdateLeadPayload): boolean => {
      try {
        leadsService.update(id, payload)
        setLeads(leadsService.listFromStore())
        setError(null)
        return true
      } catch (caught: unknown) {
        const message =
          caught instanceof Error ? caught.message : 'Failed to update lead'
        setError(message)
        return false
      }
    },
    [leadsService],
  )

  const deleteLead = useCallback(
    (id: ID): boolean => {
      try {
        leadsService.remove(id)
        setLeads(leadsService.listFromStore())
        setError(null)
        return true
      } catch (caught: unknown) {
        const message =
          caught instanceof Error ? caught.message : 'Failed to delete lead'
        setError(message)
        return false
      }
    },
    [leadsService],
  )

  const updateLeadStatus = useCallback(
    (id: ID, status: LeadStatus): boolean => {
      try {
        leadsService.update(id, { status })
        setLeads(leadsService.listFromStore())
        setError(null)
        return true
      } catch (caught: unknown) {
        const message =
          caught instanceof Error ? caught.message : 'Failed to update lead status'
        setError(message)
        return false
      }
    },
    [leadsService],
  )

  const filteredLeads = useMemo((): Lead[] => {
    return leads.filter((lead) => leadMatchesFilters(lead, filters))
  }, [leads, filters])

  return {
    leads,
    filters,
    setFilters,
    filteredLeads,
    isLoading,
    error,
    createLead,
    updateLead,
    deleteLead,
    updateLeadStatus,
  }
}

export function LeadsProvider({ children }: { children: ReactNode }): ReactElement {
  const value = useLeadsState()
  return <LeadsContext.Provider value={value}>{children}</LeadsContext.Provider>
}

export function useLeads(): UseLeadsResult {
  const ctx = useContext(LeadsContext)
  if (ctx === null) {
    throw new Error('useLeads must be used within LeadsProvider')
  }
  return ctx
}
