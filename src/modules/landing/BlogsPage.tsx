import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { LandingPageLayout } from '@/components/landing/LandingPageLayout'
import { fetchBlogPosts, formatBlogDate, type BlogListItem } from '@/lib/blogsApi'

export function BlogsPage(): ReactElement {
  const [posts, setPosts] = useState<BlogListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    void (async () => {
      try {
        const data = await fetchBlogPosts()
        if (!cancelled) setPosts(data)
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Could not load blog posts.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <LandingPageLayout>
      <section className="landing-subpage-section">
        <div className="landing-container">
          <Link to="/" className="text-sm text-link-secondary hover:underline">
            Back to home
          </Link>

          {loading ? (
            <p className="mt-8 text-slate-600">Loading articles…</p>
          ) : error ? (
            <p className="mt-8 text-red-700" role="alert">
              {error}
            </p>
          ) : posts.length === 0 ? (
            <p className="mt-8 text-slate-600">No articles published yet. Check back soon.</p>
          ) : (
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-700">
                      {post.category}
                    </span>
                    <span className="text-slate-500">{formatBlogDate(post.publishedAt)}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500">{post.readTime}</span>
                  </div>

                  <h2 className="mt-4 text-xl font-semibold tracking-tight text-slate-900">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{post.excerpt}</p>

                  <Link
                    to={`/blogs/${post.slug}`}
                    className="mt-5 inline-flex items-center text-sm font-semibold text-blue-700"
                    aria-label={`Read blog post: ${post.title}`}
                  >
                    Read article →
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </LandingPageLayout>
  )
}
