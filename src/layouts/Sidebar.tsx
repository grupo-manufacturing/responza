import type { ReactElement, ReactNode } from 'react'
import { memo, useMemo } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import type { TopbarUser } from '@/layouts/Topbar'

export interface SidebarNavItem {
  readonly to: string
  readonly label: string
  readonly icon?: ReactNode
  readonly badgeCount?: number
}

export interface SidebarProps {
  activePath: string
  items: readonly SidebarNavItem[]
  productName: string
  user: TopbarUser | null
  onSignOut: () => void
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) {
    return '?'
  }
  if (parts.length === 1) {
    return parts[0]!.slice(0, 2).toUpperCase()
  }
  return `${parts[0]!.charAt(0)}${parts[parts.length - 1]!.charAt(0)}`.toUpperCase()
}

function SidebarComponent({
  activePath,
  items,
  productName,
  user,
  onSignOut,
}: SidebarProps): ReactElement {
  const badge = useMemo((): string => {
    if (user === null) {
      return '?'
    }
    return initials(user.name)
  }, [user])

  return (
    <aside className="section-light flex h-full min-h-0 w-[84px] shrink-0 flex-col overflow-hidden border-r border-border-muted bg-surface-base xl:w-[272px]">
      <div className="flex h-[3.75rem] shrink-0 items-center border-b border-border-muted px-px16">
        <div className="type-caption text-brand-primary">{productName.toUpperCase()}</div>
      </div>
      <nav
        className="scrollbar-none flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-px8"
        aria-label="Main"
      >
        {items.map((item) => {
          const isActive =
            activePath === item.to || activePath.startsWith(`${item.to}/`)
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`type-button flex items-center justify-center gap-3 rounded-pill border px-px12 py-px10 transition xl:justify-start ${
                isActive
                  ? 'border-brand-primary bg-brand-primary text-text-inverse'
                  : 'border-transparent text-slate-700 hover:border-border-muted hover:bg-surface-secondary hover:text-text-primary'
              }`}
            >
              {item.icon !== undefined ? (
                <span
                  className={isActive ? 'text-text-inverse' : 'text-slate-500'}
                >
                  {item.icon}
                </span>
              ) : null}
              <span className="hidden xl:inline">{item.label}</span>
              {item.badgeCount !== undefined && item.badgeCount > 0 ? (
                <span className="type-small ml-auto hidden rounded-full border border-brand-primary/50 bg-brand-primary/15 px-2 py-0.5 text-brand-hover xl:inline-flex">
                  {item.badgeCount}
                </span>
              ) : null}
            </Link>
          )
        })}
      </nav>
      {user !== null ? (
        <div className="shrink-0 border-t border-border-muted p-px12">
          <div className="flex w-full flex-col gap-3">
            <div className="hidden w-full min-w-0 items-center gap-3 xl:flex">
              <div className="min-w-0 flex-1">
                <div className="type-caption truncate text-text-primary">
                  {user.name}
                </div>
                <div className="type-small truncate text-slate-600">
                  {user.email}
                </div>
              </div>
              <div
                className="type-small flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-primary/50 bg-brand-primary/10 text-brand-hover"
                aria-hidden
              >
                {badge}
              </div>
            </div>
            <div
              className="type-small mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-brand-primary/50 bg-brand-primary/10 text-brand-hover xl:hidden"
              aria-hidden
            >
              {badge}
            </div>
            <Button
              type="button"
              onClick={onSignOut}
              variant="blueBordered"
              size="sm"
              className="w-full xl:w-full"
            >
              <span className="hidden xl:inline">Sign out</span>
              <span className="xl:hidden">Out</span>
            </Button>
          </div>
        </div>
      ) : null}
    </aside>
  )
}

export const Sidebar = memo(SidebarComponent)
