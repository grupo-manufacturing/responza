import type { ReactElement } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import '@/landing.css'

import { LandingFooterCTA } from '@/components/landing/LandingFooterCTA'
import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { getBlogPostBySlug } from '@/modules/landing/blogPosts'

export function BlogPostPage(): ReactElement {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getBlogPostBySlug(slug) : undefined

  if (!post) {
    return <Navigate to="/blogs" replace />
  }

  return (
    <main className="landing-page relative min-h-dvh bg-surface-base text-text-primary">
      <section className="mx-auto w-full max-w-6xl px-6 py-6 md:px-10 md:py-8">
        <LandingNavbar />
      </section>

      <section className="px-6 py-10 md:px-10 md:py-12">
        <article className="mx-auto w-full max-w-3xl">
          <Link to="/blogs" className="text-sm text-link-secondary hover:underline">
            Back to blogs
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-700">
              {post.category}
            </span>
            <span className="text-slate-500">{post.date}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">{post.readTime}</span>
          </div>

          <h1 className="mt-4 font-display text-4xl font-normal tracking-tight text-slate-900 md:text-5xl">
            {post.title}
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-600">{post.excerpt}</p>

          <div className="mt-8 space-y-5">
            {post.content.map((paragraph) => (
              <p key={paragraph} className="text-base leading-7 text-slate-700">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </section>

      <LandingFooterCTA />
    </main>
  )
}
