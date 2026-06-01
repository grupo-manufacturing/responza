import type { ReactElement } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ScrollToTop } from '@/components/ScrollToTop'
import { AdminBlogEditorPage } from '@/modules/admin/AdminBlogEditorPage'
import { AdminBlogsListPage } from '@/modules/admin/AdminBlogsListPage'
import { AdminGuard } from '@/modules/admin/AdminGuard'
import { AdminLayout } from '@/modules/admin/AdminLayout'
import { AdminLoginPage } from '@/modules/admin/AdminLoginPage'
import { LandingPage } from '@/modules/landing/LandingPage'
import { PrivacyPolicyPage } from '@/modules/landing/PrivacyPolicyPage'
import { TermsConditionsPage } from '@/modules/landing/TermsConditionsPage'
import { BlogsPage } from '@/modules/landing/BlogsPage'
import { BlogPostPage } from '@/modules/landing/BlogPostPage'

export default function App(): ReactElement {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:slug" element={<BlogPostPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-conditions" element={<TermsConditionsPage />} />

        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminGuard />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/blogs" replace />} />
            <Route path="blogs" element={<AdminBlogsListPage />} />
            <Route path="blogs/new" element={<AdminBlogEditorPage />} />
            <Route path="blogs/:id/edit" element={<AdminBlogEditorPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
