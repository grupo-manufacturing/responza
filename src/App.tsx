import type { ReactElement } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LandingPage } from '@/modules/landing/LandingPage'
import { PrivacyPolicyPage } from '@/modules/landing/PrivacyPolicyPage'
import { TermsConditionsPage } from '@/modules/landing/TermsConditionsPage'
import { BlogsPage } from '@/modules/landing/BlogsPage'
import { BlogPostPage } from '@/modules/landing/BlogPostPage'

export default function App(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:slug" element={<BlogPostPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-conditions" element={<TermsConditionsPage />} />
      </Routes>
    </BrowserRouter>
  )
}
