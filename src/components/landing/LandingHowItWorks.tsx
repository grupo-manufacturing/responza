import type { ReactElement } from 'react'
import { Container, SectionHead } from '@/components/landing/primitives'

const steps = [
  {
    n: '01',
    title: 'Connect your channels',
    body: 'Sign in with Shopify, Instagram (via Meta), WhatsApp Business API and your IndiaMART seller account. Takes 4 minutes.',
  },
  {
    n: '02',
    title: 'Train Responza in an afternoon',
    body: 'Upload your catalog, policies and past chats. Responza learns your tone, your prices, and what you do and don\'t promise.',
  },
  {
    n: '03',
    title: 'Go live — AI drafts, you approve',
    body: 'Every message gets an AI draft reply in the customer\'s language. Approve, tweak or auto-send. Sleep through Diwali sale.',
  },
]

export function LandingHowItWorks(): ReactElement {
  return (
    <section className="landing-how">
      <Container>
        <SectionHead
          eyebrow="How it works"
          title="From zero to AI-replying in an afternoon."
        />
        <div className="landing-how-grid">
          {steps.map((s) => (
            <div key={s.n} className="landing-how-item">
              <div className="display landing-how-number">
                {s.n}
              </div>
              <div className="landing-how-title">{s.title}</div>
              <div className="landing-how-body">{s.body}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}