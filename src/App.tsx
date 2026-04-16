import type { ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from '@/context/AuthContext'
import { CommunicationsProvider } from '@/context/CommunicationsContext'
import { LeadsProvider } from '@/context/LeadsContext'
import { ServicesProvider } from '@/context/ServicesContext'
import { ToastProvider } from '@/context/ToastContext'
import { AppRoutes } from '@/routes/AppRoutes'

export default function App(): ReactElement {
  return (
    <BrowserRouter>
      <ServicesProvider>
        <LeadsProvider>
          <CommunicationsProvider>
            <AuthProvider>
              <ToastProvider>
                <AppRoutes />
              </ToastProvider>
            </AuthProvider>
          </CommunicationsProvider>
        </LeadsProvider>
      </ServicesProvider>
    </BrowserRouter>
  )
}
