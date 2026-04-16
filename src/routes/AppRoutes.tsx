import type { ReactElement } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { ErrorBoundary } from '@/components/shared/ErrorBoundary'
import { AuthLayout } from '@/layouts/AuthLayout'
import { AppLayout } from '@/layouts/AppLayout'
import { LoginPage } from '@/modules/auth/LoginPage'
import { CustomerDetailPage } from '@/modules/customers/CustomerDetailPage'
import { CustomersPage } from '@/modules/customers/CustomersPage'
import { CommunicationsPage } from '@/modules/communications/CommunicationsPage'
import { DashboardPage } from '@/modules/dashboard/DashboardPage'
import { IntegrationsPage } from '@/modules/integrations/IntegrationsPage'
import { LandingPage } from '@/modules/landing/LandingPage'
import { PrivacyPolicyPage } from '@/modules/landing/PrivacyPolicyPage'
import { TermsConditionsPage } from '@/modules/landing/TermsConditionsPage'
import { LeadsPage } from '@/modules/leads/LeadsPage'
import { OrderDetailPage } from '@/modules/orders/OrderDetailPage'
import { OrdersPage } from '@/modules/orders/OrdersPage'
import { QuotationDetailPage } from '@/modules/quotations/QuotationDetailPage'
import { QuotationsPage } from '@/modules/quotations/QuotationsPage'
import { SettingsPage } from '@/modules/settings/SettingsPage'
import { ProtectedRoute } from '@/routes/ProtectedRoute'

export function AppRoutes(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms-conditions" element={<TermsConditionsPage />} />
      <Route
        path="/login"
        element={
          <AuthLayout>
            <LoginPage />
          </AuthLayout>
        }
      />
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="dashboard"
          element={
            <ErrorBoundary>
              <DashboardPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="leads"
          element={
            <ErrorBoundary>
              <LeadsPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="customers"
          element={
            <ErrorBoundary>
              <CustomersPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="customers/:customerId"
          element={
            <ErrorBoundary>
              <CustomerDetailPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="quotations"
          element={
            <ErrorBoundary>
              <QuotationsPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="quotations/:quotationId"
          element={
            <ErrorBoundary>
              <QuotationDetailPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="orders"
          element={
            <ErrorBoundary>
              <OrdersPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="orders/:orderId"
          element={
            <ErrorBoundary>
              <OrderDetailPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="communications"
          element={
            <ErrorBoundary>
              <CommunicationsPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="integrations"
          element={
            <ErrorBoundary>
              <IntegrationsPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="settings"
          element={
            <ErrorBoundary>
              <SettingsPage />
            </ErrorBoundary>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
