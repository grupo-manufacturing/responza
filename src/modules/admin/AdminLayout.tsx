import type { ReactElement } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import '@/modules/admin/admin.css'
import { adminLogout } from './adminApi'
import { clearAdminToken } from './authStorage'

export function AdminLayout(): ReactElement {
  const navigate = useNavigate()

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div className="admin-header-inner">
          <Link to="/admin/blogs" className="admin-brand">
            <span className="admin-brand-mark" aria-hidden>
              R
            </span>
            Responza Admin
          </Link>
          <div className="admin-header-actions">
            <nav className="admin-nav" aria-label="Admin navigation">
              <NavLink
                to="/admin/blogs"
                className={({ isActive }) =>
                  `admin-nav-link${isActive ? ' admin-nav-link-active' : ''}`
                }
              >
                Blog posts
              </NavLink>
            </nav>
            <button
              type="button"
              className="admin-sign-out"
              onClick={() => {
                void adminLogout().finally(() => {
                  clearAdminToken()
                  navigate('/admin/login', { replace: true })
                })
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}
