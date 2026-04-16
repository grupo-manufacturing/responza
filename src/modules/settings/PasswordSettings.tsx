import type { FormEvent, ReactElement } from 'react'
import { useCallback, useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useToast } from '@/hooks/useToast'
import {
  PASSWORD_MIN_LENGTH,
  type PasswordFormState,
} from '@/modules/settings/settings.types'

function emptyPasswordForm(): PasswordFormState {
  return { currentPassword: '', newPassword: '', confirmPassword: '' }
}

export function PasswordSettings(): ReactElement {
  const { showToast } = useToast()
  const [form, setForm] = useState<PasswordFormState>(emptyPasswordForm)
  const [fieldError, setFieldError] = useState<string | null>(null)

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>): void => {
      event.preventDefault()
      setFieldError(null)

      if (form.newPassword.length < PASSWORD_MIN_LENGTH) {
        setFieldError(`New password must be at least ${PASSWORD_MIN_LENGTH} characters.`)
        return
      }
      if (form.newPassword !== form.confirmPassword) {
        setFieldError('New password and confirmation do not match.')
        return
      }

      // TODO Phase 5: Replace with real IAuthService.changePassword() call
      showToast({ message: 'Password change simulated — backend not wired yet.' })
      setForm(emptyPasswordForm())
    },
    [form.confirmPassword, form.newPassword, showToast],
  )

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
      <h2 id="settings-password-title" className="type-feature text-text-primary">
        Password
      </h2>
      <p className="type-body-small text-slate-600">
        For this demo, submitting only validates input and shows a toast. No password is sent or
        stored.
      </p>

      {fieldError !== null ? (
        <p className="type-body-small rounded-mdToken border border-red-700/30 bg-red-50 px-3 py-2 text-red-700" role="alert">
          {fieldError}
        </p>
      ) : null}

      <label className="type-caption block uppercase tracking-wide text-slate-600">
        Current password
        <Input
          type="password"
          value={form.currentPassword}
          onChange={(e) => {
            setForm((previous) => ({ ...previous, currentPassword: e.target.value }))
          }}
          autoComplete="current-password"
        />
      </label>

      <label className="type-caption block uppercase tracking-wide text-slate-600">
        New password
        <Input
          type="password"
          value={form.newPassword}
          onChange={(e) => {
            setForm((previous) => ({ ...previous, newPassword: e.target.value }))
          }}
          autoComplete="new-password"
        />
      </label>

      <label className="type-caption block uppercase tracking-wide text-slate-600">
        Confirm new password
        <Input
          type="password"
          value={form.confirmPassword}
          onChange={(e) => {
            setForm((previous) => ({ ...previous, confirmPassword: e.target.value }))
          }}
          autoComplete="new-password"
        />
      </label>

      <p className="type-small text-slate-600">
        Minimum length: {PASSWORD_MIN_LENGTH} characters. Confirmation must match the new
        password.
      </p>

      <Button
        type="submit"
        variant="primaryPill"
        size="sm"
      >
        Update password
      </Button>
    </form>
  )
}
