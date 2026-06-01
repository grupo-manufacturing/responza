import { getApiBase } from './api'

export type BlogListItem = {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  publishedAt: string
}

export type BlogPostDetail = BlogListItem & {
  content: string[]
}

export function formatBlogDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(iso))
}

export async function fetchBlogPosts(): Promise<BlogListItem[]> {
  const res = await fetch(`${getApiBase()}/api/v1/blogs`)
  if (!res.ok) {
    throw new Error('Could not load blog posts.')
  }
  const data: unknown = await res.json()
  if (!Array.isArray(data)) {
    throw new Error('Could not load blog posts.')
  }
  return data as BlogListItem[]
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  const res = await fetch(`${getApiBase()}/api/v1/blogs/${encodeURIComponent(slug)}`)
  if (res.status === 404) {
    return null
  }
  if (!res.ok) {
    throw new Error('Could not load this article.')
  }
  const data: unknown = await res.json()
  if (!data || typeof data !== 'object' || !('slug' in data)) {
    throw new Error('Could not load this article.')
  }
  return data as BlogPostDetail
}
