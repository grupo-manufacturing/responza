import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import '@/landing.css'

import { LandingFooterCTA } from '@/components/landing/LandingFooterCTA'
import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { blogPosts } from '@/modules/landing/blogPosts'

export function BlogsPage(): ReactElement {
  return (
    <main className="landing-page relative min-h-dvh bg-surface-base text-text-primary">
      <section className="mx-auto w-full max-w-6xl px-6 py-6 md:px-10 md:py-8">
        <LandingNavbar />
      </section>

      <section className="px-6 py-10 md:px-10 md:py-12">
        <div className="mx-auto w-full max-w-6xl">
          <Link to="/" className="text-sm text-link-secondary hover:underline">
            Back to home
          </Link>

          <h1 className="mt-4 font-display text-4xl font-normal tracking-tight md:text-5xl">
            Responza Blog
          </h1>
          <p className="mt-3 max-w-3xl text-base text-slate-600">
            Insights, guides, and playbooks for teams managing WhatsApp, Instagram, and marketplace
            conversations at scale.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-700">
                    {post.category}
                  </span>
                  <span className="text-slate-500">{post.date}</span>
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
        </div>
      </section>

      <LandingFooterCTA />
    </main>
  )
}
