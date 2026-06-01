import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

import { LandingPageLayout } from '@/components/landing/LandingPageLayout'
import {
  fetchBlogPostBySlug,
  formatBlogDate,
  type BlogPostDetail,
} from '@/lib/blogsApi'

function BlogPostBody({
  post,
}: {
  post: BlogPostDetail
}): ReactElement {
  return (
    <section className="landing-subpage-section">
      <article className="landing-container landing-subpage-prose">
        <Link to="/blogs" className="text-sm text-link-secondary hover:underline">
          Back to blogs
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-700">
            {post.category}
          </span>
          <span className="text-slate-500">{formatBlogDate(post.publishedAt)}</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500">{post.readTime}</span>
        </div>

        <h1 className="mt-4 font-display text-4xl font-normal tracking-tight text-slate-900 md:text-5xl">
          {post.title}
        </h1>

        <p className="mt-4 text-base leading-7 text-slate-600">{post.excerpt}</p>

        <div className="mt-8 space-y-5">
          {post.content.map((paragraph, index) => (
            <p key={`${post.slug}-${index}`} className="text-base leading-7 text-slate-700">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </section>
  )
}

export function BlogPostPage(): ReactElement {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPostDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) {
      setNotFound(true)
      setLoading(false)
      return
    }

    let cancelled = false
    void (async () => {
      try {
        const data = await fetchBlogPostBySlug(slug)
        if (cancelled) return
        if (!data) {
          setNotFound(true)
          return
        }
        setPost(data)
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Could not load this article.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [slug])

  if (!slug || notFound) {
    return <Navigate to="/blogs" replace />
  }

  if (loading) {
    return (
      <LandingPageLayout>
        <section className="landing-subpage-section">
          <p className="landing-container text-slate-600">Loading article…</p>
        </section>
      </LandingPageLayout>
    )
  }

  if (error || !post) {
    return (
      <LandingPageLayout>
        <section className="landing-subpage-section">
          <div className="landing-container landing-subpage-prose">
            <p className="text-red-700" role="alert">
              {error ?? 'Could not load this article.'}
            </p>
            <Link to="/blogs" className="mt-4 inline-block text-sm text-link-secondary hover:underline">
              Back to blogs
            </Link>
          </div>
        </section>
      </LandingPageLayout>
    )
  }

  return (
    <LandingPageLayout>
      <BlogPostBody post={post} />
    </LandingPageLayout>
  )
}
