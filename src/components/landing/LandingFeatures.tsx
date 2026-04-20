import type { ReactElement } from 'react'
import { Container, SectionHead } from '@/components/landing/primitives'

const FEATURES = [
  { title: 'Unified inbox',               body: 'One timeline per customer across Shopify, Instagram, WhatsApp and IndiaMART. Never ask \'which channel was this on?\' again.' },
  { title: 'Auto-translate, 11 languages', body: 'Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Punjabi, Kannada, Malayalam, Odia, English. Arabic coming soon.' },
  { title: 'Built-in CRM',                body: 'Customer 360°: lifetime value, preferred channel, language, city, tags. Segment and broadcast without a spreadsheet.' },
  { title: 'Weekly briefings',          body: 'Every Monday, a short note on what\'s trending, who\'s at risk, and where to focus. In plain English, delivered to WhatsApp.' },
  { title: 'Bulk & broadcast',            body: 'Send a WhatsApp template to 5,000 customers at once' },
  { title: 'Works with your stack',       body: 'Razorpay, Shiprocket, Delhivery, Judge.me. One-click. Custom webhooks for everything else.' },
]

export function LandingFeatures(): ReactElement {
  return (
    <section id="channels" className="landing-features">
      <Container>
        <SectionHead
          eyebrow="Features"
          title={
            <>
              A Unified CRM that actually <em className="landing-accent-em">replies.</em>
            </>
          }
        />
        <div className="landing-features-grid">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={`landing-features-item ${(i + 1) % 4 === 0 ? 'landing-features-item-end' : ''} ${i < 4 ? 'landing-features-item-top' : ''}`}
            >
              <div className="mono landing-features-index">
                0{i + 1}
              </div>
              <div className="landing-features-title">{f.title}</div>
              <div className="landing-features-body">{f.body}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}