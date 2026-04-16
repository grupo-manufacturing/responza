import type { FormEvent, ReactElement } from 'react'
import { useCallback, useEffect, useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/hooks/useAuth'
import { useServices } from '@/hooks/useServices'
import { useToast } from '@/hooks/useToast'
import type { ProfileFormState } from '@/modules/settings/settings.types'

function emptyProfileForm(): ProfileFormState {
  return { name: '', email: '' }
}

export function ProfileSettings(): ReactElement {
  const { currentUser, refreshUser } = useAuth()
  const { auth } = useServices()
  const { showToast } = useToast()

  const [form, setForm] = useState<ProfileFormState>(emptyProfileForm)

  useEffect(() => {
    if (currentUser === null) {
      setForm(emptyProfileForm())
      return
    }
    setForm({ name: currentUser.name, email: currentUser.email })
  }, [currentUser])

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>): void => {
      event.preventDefault()
      if (currentUser === null) {
        return
      }
      const name = form.name.trim()
      const email = form.email.trim()
      if (name === '' || email === '') {
        showToast({ message: 'Name and email cannot be empty.', type: 'error' })
        return
      }
      auth.updateUser(currentUser.id, {
        name,
        email,
      })
      refreshUser()
      showToast({ message: 'Profile saved' })
    },
    [auth, currentUser, form.email, form.name, refreshUser, showToast],
  )

  if (currentUser === null) {
    return (
      <p className="type-body-small text-slate-600" role="status">
        Sign in to edit your profile.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
      <h2 id="settings-profile-title" className="type-feature text-text-primary">
        Profile
      </h2>
      <p className="type-body-small text-slate-600">
        Update the name and email stored on your account.
      </p>

      <label className="type-caption block uppercase tracking-wide text-slate-600">
        Display name
        <Input
          value={form.name}
          onChange={(e) => {
            setForm((previous) => ({ ...previous, name: e.target.value }))
          }}
          required
          autoComplete="name"
        />
      </label>

      <label className="type-caption block uppercase tracking-wide text-slate-600">
        Email
        <Input
          type="email"
          value={form.email}
          onChange={(e) => {
            setForm((previous) => ({ ...previous, email: e.target.value }))
          }}
          required
          autoComplete="email"
        />
      </label>

      <div className="type-small rounded-mdToken border border-border-muted bg-surface-secondary px-3 py-2 text-slate-600">
        Role: <span className="font-medium text-text-primary">{currentUser.role}</span> (managed by
        an administrator)
      </div>

      <Button
        type="submit"
        variant="primaryPill"
        size="sm"
      >
        Save profile
      </Button>
    </form>
  )
}
