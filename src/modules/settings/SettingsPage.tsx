import type { ReactElement } from 'react'
import { useState } from 'react'

import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/Button'
import { PasswordSettings } from '@/modules/settings/PasswordSettings'
import { ProfileSettings } from '@/modules/settings/ProfileSettings'

type SettingsTab = 'profile' | 'password'

export function SettingsPage(): ReactElement {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile')

  return (
    <div className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-y-auto">
      <PageHeader
        title="Settings"
        description="Manage your profile and password."
      />

      <div className="mt-2 flex flex-wrap gap-2 border-b border-border-muted pb-3">
        <Button
          type="button"
          onClick={() => {
            setActiveTab('profile')
          }}
          variant={activeTab === 'profile' ? 'darkPill' : 'blueBordered'}
          size="sm"
        >
          Profile
        </Button>
        <Button
          type="button"
          onClick={() => {
            setActiveTab('password')
          }}
          variant={activeTab === 'password' ? 'darkPill' : 'blueBordered'}
          size="sm"
        >
          Password
        </Button>
      </div>

      <div className="mt-8">
        {activeTab === 'profile' ? <ProfileSettings /> : <PasswordSettings />}
      </div>
    </div>
  )
}
