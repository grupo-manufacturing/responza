import type { FC, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { useAuth } from '@/hooks/useAuth'

export const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}
