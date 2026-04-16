import type { FormEvent, ReactElement } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/hooks/useAuth'
import { AuthError } from '@/services/auth.service'
import type { LoginFormState } from '@/types/auth.types'

export function LoginPage(): ReactElement {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState<LoginFormState>({
    email: '',
    password: '',
    error: null,
    isLoading: false,
  })

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    setForm((previous) => ({ ...previous, error: null, isLoading: true }))
    try {
      await login({ email: form.email, password: form.password })
      setForm((previous) => ({ ...previous, isLoading: false }))
      navigate('/dashboard', { replace: true })
    } catch (error: unknown) {
      const message =
        error instanceof AuthError
          ? error.message
          : 'Sign-in failed. Please try again.'
      setForm((previous) => ({
        ...previous,
        error: message,
        isLoading: false,
      }))
    }
  }

  return (
    <Card
      variant="light"
      className="w-full rounded-lg border-border-muted bg-surface-base p-8 shadow-lg backdrop-blur-md"
    >
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-mdToken border-2 border-brand-primary/30 bg-gradient-to-br from-brand-primary/15 to-brand-primary/5 shadow-lg">
        <LogIn className="h-6 w-6 text-brand-primary" aria-hidden />
      </div>
      <h1 className="type-feature text-center bg-gradient-to-r from-text-primary to-brand-primary bg-clip-text text-transparent">
        Sign in to Responza
      </h1>
      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="type-caption block uppercase tracking-wide text-slate-600" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={(event) =>
              setForm((previous) => ({ ...previous, email: event.target.value }))
            }
          />
        </div>
        <div>
          <label
            className="type-caption block uppercase tracking-wide text-slate-600"
            htmlFor="password"
          >
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={form.password}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                password: event.target.value,
              }))
            }
          />
        </div>
        {form.error !== null ? (
          <p className="type-body-small rounded-mdToken border border-red-700/30 bg-red-50 px-3 py-2 text-red-700" role="alert">
            {form.error}
          </p>
        ) : null}
        <Button
          type="submit"
          loading={form.isLoading}
          className="w-full bg-gradient-to-r from-brand-primary to-brand-primary/80 !text-text-inverse hover:from-brand-hover hover:to-brand-hover/80 hover:!text-text-inverse transition-all duration-300 shadow-md hover:shadow-lg"
          variant="primaryPill"
        >
          Sign in
        </Button>
      </form>
    </Card>
  )
}
