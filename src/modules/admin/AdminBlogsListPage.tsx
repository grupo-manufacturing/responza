import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listAdminBlogs, type AdminBlog } from './adminApi'

function formatDate(iso: string | null): string {
  if (!iso) return '—'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(iso))
}

export function AdminBlogsListPage(): ReactElement {
  const [posts, setPosts] = useState<AdminBlog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    void listAdminBlogs()
      .then((data) => {
        if (!cancelled) setPosts(data)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Could not load posts.')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="admin-page-title">Blog posts</h1>
          <p className="admin-page-lead">Create, edit, and publish articles for the public blog.</p>
        </div>
        <Link to="/admin/blogs/new" className="admin-btn admin-btn-primary">
          New post
        </Link>
      </div>

      {error ? <p className="admin-error">{error}</p> : null}

      <div className="admin-card admin-table-wrap">
        {loading ? (
          <p className="text-slate-600">Loading…</p>
        ) : posts.length === 0 ? (
          <p className="text-slate-600">
            No posts yet.{' '}
            <Link to="/admin/blogs/new" className="admin-link">
              Create your first post
            </Link>
            .
          </p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Category</th>
                <th>Updated</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <div className="font-semibold text-slate-900">{post.title}</div>
                    <div className="text-xs text-slate-500">{post.slug}</div>
                  </td>
                  <td>
                    <span
                      className={`admin-badge ${post.published ? 'admin-badge-published' : 'admin-badge-draft'}`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>{post.category}</td>
                  <td>{formatDate(post.updatedAt)}</td>
                  <td>
                    <Link to={`/admin/blogs/${post.id}/edit`} className="admin-link">
                      Edit
                    </Link>
                    {post.published ? (
                      <>
                        {' · '}
                        <a
                          href={`/blogs/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="admin-link"
                        >
                          View
                        </a>
                      </>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}
