import type { ReactElement } from 'react'
import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/Input'
import '@/modules/admin/admin.css'
import { adminLogin } from './adminApi'
import { getAdminToken, setAdminToken } from './authStorage'

export function AdminLoginPage(): ReactElement {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  if (getAdminToken()) {
    return <Navigate to="/admin/blogs" replace />
  }

  const from =
    location.state &&
    typeof location.state === 'object' &&
    'from' in location.state &&
    typeof location.state.from === 'string'
      ? location.state.from
      : '/admin/blogs'

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-card">
        <h1 className="admin-login-title">Admin sign in</h1>
        <p className="admin-login-lead">Manage Responza blog posts.</p>

        {error ? <p className="admin-error">{error}</p> : null}

        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (loading) return
            setError(null)
            setLoading(true)
            void adminLogin(email, password)
              .then(({ token }) => {
                setAdminToken(token)
                navigate(from, { replace: true })
              })
              .catch((err) => {
                setError(err instanceof Error ? err.message : 'Sign in failed.')
              })
              .finally(() => setLoading(false))
          }}
        >
          <div className="admin-field">
            <label className="admin-label" htmlFor="admin-email">
              Email
            </label>
            <Input
              id="admin-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="!mt-0"
            />
          </div>
          <div className="admin-field">
            <label className="admin-label" htmlFor="admin-password">
              Password
            </label>
            <Input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="!mt-0"
            />
          </div>
          <button type="submit" className="admin-btn admin-btn-primary w-full" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          <Link to="/" className="admin-link">
            Back to website
          </Link>
        </p>
      </div>
    </div>
  )
}
