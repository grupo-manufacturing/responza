import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Input } from '@/components/ui/Input'
import {
  contentToText,
  createAdminBlog,
  deleteAdminBlog,
  getAdminBlog,
  publishAdminBlog,
  slugFromTitle,
  textToContent,
  updateAdminBlog,
} from './adminApi'

export function AdminBlogEditorPage(): ReactElement {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isNew = !id

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)
  const [excerpt, setExcerpt] = useState('')
  const [category, setCategory] = useState('')
  const [readTime, setReadTime] = useState('5 min read')
  const [contentText, setContentText] = useState('')
  const [published, setPublished] = useState(false)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isNew || !id) return
    let cancelled = false
    void getAdminBlog(id)
      .then((post) => {
        if (cancelled) return
        setTitle(post.title)
        setSlug(post.slug)
        setSlugTouched(true)
        setExcerpt(post.excerpt)
        setCategory(post.category)
        setReadTime(post.readTime)
        setContentText(contentToText(post.content))
        setPublished(post.published)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Could not load post.')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [id, isNew])

  useEffect(() => {
    if (slugTouched || !title.trim()) return
    setSlug(slugFromTitle(title))
  }, [title, slugTouched])

  const buildInput = () => ({
    slug: slug.trim(),
    title: title.trim(),
    excerpt: excerpt.trim(),
    category: category.trim(),
    readTime: readTime.trim(),
    content: textToContent(contentText),
  })

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    try {
      const input = buildInput()
      if (isNew) {
        const created = await createAdminBlog(input)
        navigate(`/admin/blogs/${created.id}/edit`, { replace: true })
      } else if (id) {
        await updateAdminBlog(id, input)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save.')
    } finally {
      setSaving(false)
    }
  }

  const handlePublish = async () => {
    setSaving(true)
    setError(null)
    try {
      const input = buildInput()
      let postId = id

      if (isNew || !postId) {
        const created = await createAdminBlog(input)
        postId = created.id
      } else {
        await updateAdminBlog(postId, input)
      }

      const refreshed = await publishAdminBlog(postId)
      setPublished(refreshed.published)
      setContentText(contentToText(refreshed.content))

      if (isNew || !id) {
        navigate(`/admin/blogs/${postId}/edit`, { replace: true })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not publish.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!id) return
    if (!window.confirm('Delete this post permanently?')) return
    setSaving(true)
    setError(null)
    try {
      await deleteAdminBlog(id)
      navigate('/admin/blogs', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not delete.')
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="text-slate-600">Loading post…</p>
  }

  return (
    <>
      <div className="mb-6">
        <Link to="/admin/blogs" className="admin-link text-sm">
          ← All posts
        </Link>
        <h1 className="admin-page-title mt-2">{isNew ? 'New post' : 'Edit post'}</h1>
      </div>

      {error ? <p className="admin-error">{error}</p> : null}

      <div className="admin-card">
        <div className="admin-field">
          <label className="admin-label" htmlFor="title">
            Title
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="!mt-0"
          />
        </div>

        <div className="admin-field">
          <label className="admin-label" htmlFor="slug">
            Slug
          </label>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => {
              setSlugTouched(true)
              setSlug(e.target.value)
            }}
            required
            className="!mt-0"
          />
        </div>

        <div className="admin-field">
          <label className="admin-label" htmlFor="excerpt">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            className="admin-textarea"
            rows={3}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="admin-field">
            <label className="admin-label" htmlFor="category">
              Category
            </label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="!mt-0"
            />
          </div>
          <div className="admin-field">
            <label className="admin-label" htmlFor="readTime">
              Read time
            </label>
            <Input
              id="readTime"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              required
              className="!mt-0"
            />
          </div>
        </div>

        <div className="admin-field">
          <label className="admin-label" htmlFor="content">
            Content
          </label>
          <p className="mb-2 text-xs text-slate-500">Separate paragraphs with a blank line.</p>
          <textarea
            id="content"
            className="admin-textarea"
            rows={12}
            value={contentText}
            onChange={(e) => setContentText(e.target.value)}
            required
          />
        </div>

        <div className="admin-actions">
          <button
            type="button"
            className="admin-btn admin-btn-primary"
            disabled={saving}
            onClick={() => void handleSave()}
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            disabled={saving}
            onClick={() => void handlePublish()}
          >
            Publish
          </button>
          {!isNew && published && slug ? (
            <a
              href={`/blogs/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="admin-btn admin-btn-secondary"
            >
              View on site
            </a>
          ) : null}
          {!isNew ? (
            <button
              type="button"
              className="admin-btn admin-btn-danger"
              disabled={saving}
              onClick={() => void handleDelete()}
            >
              Delete
            </button>
          ) : null}
        </div>
      </div>
    </>
  )
}
