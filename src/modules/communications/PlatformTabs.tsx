import type { ReactElement } from 'react'
import { memo } from 'react'

import type { PlatformKey } from '@/types/integration.types'

type PlatformTabValue = PlatformKey | 'all'

export interface PlatformTabsProps {
  activePlatform: PlatformTabValue
  onTabChange: (platform: PlatformTabValue) => void
  whatsappUnread: number
  instagramUnread: number
  whatsappConnected: boolean
  instagramConnected: boolean
}

function PlatformTabsComponent({
  activePlatform,
  onTabChange,
  whatsappUnread,
  instagramUnread,
  whatsappConnected,
  instagramConnected,
}: PlatformTabsProps): ReactElement {
  const allUnread = whatsappUnread + instagramUnread

  const sharedTabClass =
    'inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500'

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => {
          onTabChange('all')
        }}
        className={`${sharedTabClass} ${
          activePlatform === 'all'
            ? 'border-emerald-500/60 bg-emerald-500/15 text-emerald-200'
            : 'border-slate-700/80 bg-slate-900/60 text-slate-300 hover:border-slate-500 hover:bg-slate-800/80'
        }`}
      >
        <span>All</span>
        {allUnread > 0 ? (
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-200">
            {allUnread}
          </span>
        ) : null}
      </button>

      <button
        type="button"
        disabled={!whatsappConnected}
        onClick={() => {
          onTabChange('whatsapp')
        }}
        className={`${sharedTabClass} ${
          activePlatform === 'whatsapp'
            ? 'border-emerald-500/60 bg-emerald-500/15 text-emerald-200'
            : 'border-slate-700/80 bg-slate-900/60 text-slate-300 hover:border-slate-500 hover:bg-slate-800/80'
        } ${
          !whatsappConnected
            ? 'cursor-not-allowed border-slate-800/80 bg-slate-900/30 text-slate-600 hover:border-slate-800/80 hover:bg-slate-900/30'
            : ''
        }`}
      >
        <span>WhatsApp</span>
        {whatsappUnread > 0 ? (
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-200">
            {whatsappUnread}
          </span>
        ) : null}
      </button>

      <button
        type="button"
        disabled={!instagramConnected}
        onClick={() => {
          onTabChange('instagram')
        }}
        className={`${sharedTabClass} ${
          activePlatform === 'instagram'
            ? 'border-emerald-500/60 bg-emerald-500/15 text-emerald-200'
            : 'border-slate-700/80 bg-slate-900/60 text-slate-300 hover:border-slate-500 hover:bg-slate-800/80'
        } ${
          !instagramConnected
            ? 'cursor-not-allowed border-slate-800/80 bg-slate-900/30 text-slate-600 hover:border-slate-800/80 hover:bg-slate-900/30'
            : ''
        }`}
      >
        <span>Instagram</span>
        {instagramUnread > 0 ? (
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-200">
            {instagramUnread}
          </span>
        ) : null}
      </button>
    </div>
  )
}

export const PlatformTabs = memo(PlatformTabsComponent)
