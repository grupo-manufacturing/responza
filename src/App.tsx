import type { ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { LandingPage } from '@/modules/landing/LandingPage'

export default function App(): ReactElement {
  return (
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>
  )
}
