import type { ReactElement } from 'react'
import { useCallback, useMemo } from 'react'
import {
  FileText,
  LayoutDashboard,
  MessageSquare,
  Package,
  Settings as SettingsNavIcon,
  Share2,
  UserPlus,
  Users,
} from 'lucide-react'
import { Outlet, useLocation } from 'react-router-dom'

import { appConfig } from '@/config/app.config'
import { useAuth } from '@/hooks/useAuth'
import { useCommunicationsContext } from '@/hooks/useCommunicationsContext'
import { Sidebar, type SidebarNavItem } from '@/layouts/Sidebar'
import { Topbar } from '@/layouts/Topbar'

const iconClass = 'h-5 w-5 shrink-0'

export function AppLayout(): ReactElement {
  const location = useLocation()
  const { logout, currentUser } = useAuth()
  const { totalUnread } = useCommunicationsContext()

  const activePath = location.pathname
  const handleSignOut = useCallback((): void => {
    logout()
  }, [logout])

  const navItems = useMemo((): SidebarNavItem[] => {
    return [
      {
        to: '/dashboard',
        label: 'Dashboard',
        icon: <LayoutDashboard className={iconClass} aria-hidden />,
      },
      {
        to: '/leads',
        label: 'Leads',
        icon: <UserPlus className={iconClass} aria-hidden />,
      },
      {
        to: '/customers',
        label: 'Customers',
        icon: <Users className={iconClass} aria-hidden />,
      },
      {
        to: '/quotations',
        label: 'Quotations',
        icon: <FileText className={iconClass} aria-hidden />,
      },
      {
        to: '/orders',
        label: 'Orders',
        icon: <Package className={iconClass} aria-hidden />,
      },
      {
        to: '/integrations',
        label: 'Integrations',
        icon: <Share2 className={iconClass} aria-hidden />,
      },
      {
        to: '/communications',
        label: 'Communications',
        icon: <MessageSquare className={iconClass} aria-hidden />,
        badgeCount: totalUnread,
      },
      {
        to: '/settings',
        label: 'Settings',
        icon: <SettingsNavIcon className={iconClass} aria-hidden />,
      },
    ]
  }, [totalUnread])

  const topbarUser = useMemo(() => {
    if (currentUser === null) {
      return null
    }
    return { name: currentUser.name, email: currentUser.email }
  }, [currentUser])

  return (
    <div className="section-light flex h-dvh overflow-hidden">
      <Sidebar
        activePath={activePath}
        items={navItems}
        productName={appConfig.name}
        user={topbarUser}
        onSignOut={handleSignOut}
      />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar title="Workspace" />
        <main className="section-light scrollbar-none flex min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-px16 py-px20 sm:px-px24 lg:px-px32 lg:py-px24">
            <div className="flex min-h-full flex-col">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
