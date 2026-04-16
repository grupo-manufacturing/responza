import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react'
import { useNavigate } from 'react-router-dom'

import { useServices } from '@/hooks/useServices'
import type { AuthState, LoginCredentials } from '@/types/auth.types'

export type AuthContextValue = AuthState & {
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  refreshUser: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }): ReactElement {
  const { auth } = useServices()
  const navigate = useNavigate()
  // Session lives in localStorage (see AuthService). Read it synchronously on first
  // render so ProtectedRoute does not redirect to /login before useEffect runs.
  const [state, setState] = useState<AuthState>(() => {
    const user = auth.getCurrentUser()
    return { currentUser: user, isAuthenticated: user !== null }
  })

  const login = useCallback(
    async (credentials: LoginCredentials): Promise<void> => {
      await auth.login(credentials)
      const user = auth.getCurrentUser()
      setState({ currentUser: user, isAuthenticated: user !== null })
    },
    [auth],
  )

  const logout = useCallback((): void => {
    auth.logout()
    setState({ currentUser: null, isAuthenticated: false })
    navigate('/login', { replace: true })
  }, [auth, navigate])

  const refreshUser = useCallback((): void => {
    const user = auth.getCurrentUser()
    setState({ currentUser: user, isAuthenticated: user !== null })
  }, [auth])

  const value = useMemo(
    (): AuthContextValue => ({
      ...state,
      login,
      logout,
      refreshUser,
    }),
    [state, login, logout, refreshUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
