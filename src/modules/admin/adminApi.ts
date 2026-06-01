import { getApiBase } from '@/lib/api'
import { clearAdminToken, getAdminToken } from './authStorage'

export type AdminUser = {
  id: string
  email: string
  role: string
}

export type AdminBlog = {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  content: string[]
  published: boolean
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

export type BlogFormInput = {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  content: string[]
  published?: boolean
}

async function parseError(res: Response): Promise<string> {
  const data: unknown = await res.json().catch(() => ({}))
  if (data && typeof data === 'object' && 'error' in data && typeof data.error === 'string') {
    return data.error
  }
  return 'Request failed.'
}

async function adminFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getAdminToken()
  const headers = new Headers(init.headers)
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }
  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const res = await fetch(`${getApiBase()}${path}`, { ...init, headers })

  if (res.status === 401) {
    clearAdminToken()
    throw new Error('Session expired. Please sign in again.')
  }

  if (!res.ok) {
    throw new Error(await parseError(res))
  }

  if (res.status === 204) {
    return undefined as T
  }

  return (await res.json()) as T
}

export async function adminLogin(email: string, password: string): Promise<{ token: string; admin: AdminUser }> {
  const res = await fetch(`${getApiBase()}/api/v1/admin/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    throw new Error(await parseError(res))
  }

  const data = (await res.json()) as { token: string; admin: AdminUser }
  return data
}

export async function adminLogout(): Promise<void> {
  try {
    await adminFetch('/api/v1/admin/auth/logout', { method: 'POST' })
  } catch {
    clearAdminToken()
  }
}

export async function adminMe(): Promise<AdminUser> {
  const data = await adminFetch<{ admin: AdminUser }>('/api/v1/admin/auth/me')
  return data.admin
}

export async function listAdminBlogs(): Promise<AdminBlog[]> {
  return adminFetch<AdminBlog[]>('/api/v1/admin/blogs')
}

export async function getAdminBlog(id: string): Promise<AdminBlog> {
  return adminFetch<AdminBlog>(`/api/v1/admin/blogs/${id}`)
}

export async function createAdminBlog(input: BlogFormInput): Promise<AdminBlog> {
  return adminFetch<AdminBlog>('/api/v1/admin/blogs', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export async function updateAdminBlog(id: string, input: BlogFormInput): Promise<AdminBlog> {
  return adminFetch<AdminBlog>(`/api/v1/admin/blogs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(input),
  })
}

export async function deleteAdminBlog(id: string): Promise<void> {
  await adminFetch<{ ok: true }>(`/api/v1/admin/blogs/${id}`, { method: 'DELETE' })
}

export async function publishAdminBlog(id: string): Promise<AdminBlog> {
  return adminFetch<AdminBlog>(`/api/v1/admin/blogs/${id}/publish`, { method: 'PATCH' })
}

export function contentToText(content: string[]): string {
  return content.join('\n\n')
}

export function textToContent(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
}

export function slugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120)
}
