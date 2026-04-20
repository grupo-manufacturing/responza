import type { ReactElement } from 'react'
import { useState } from 'react'
import { Container, Eyebrow } from '@/components/landing/primitives'

const faqs = [
  {
    q: 'Do I need a WhatsApp Business API account?',
    a: 'Yes for WhatsApp — we\'ll help you apply through a Meta BSP during onboarding. Takes about 48 hours. Instagram requires a Meta Business account (most sellers already have this). Shopify and IndiaMART just need login.',
  },
  {
    q: 'How does the AI know my prices and policies?',
    a: 'You connect your Shopify catalog (auto), upload a PDF or Google Doc of policies, and optionally paste your most-used replies. Responza reads everything and drafts replies grounded in your actual data — it never makes up SKUs, prices or return windows.',
  },
  {
    q: 'Which Indian languages are supported?',
    a: 'At launch: Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Punjabi, Kannada, Malayalam, Odia and English. Urdu, Assamese and Arabic are in beta. If your customer types in Hinglish or transliterated Tamil, we handle that too.',
  },
  {
    q: 'Can I still reply manually?',
    a: 'Always. AI drafts are suggestions by default — you approve, edit, or send your own reply. You can turn on auto-send per channel once you trust it (most customers enable it for WhatsApp order-status queries within 2 weeks).',
  },
  {
    q: 'Is my customer data safe?',
    a: 'Data stays in Mumbai (AWS ap-south-1). SOC 2 Type II in progress, DPDP Act-compliant, end-to-end encryption for WhatsApp. We don\'t train our models on your customer conversations.',
  },
  {
    q: 'What if I already have Zoho/Freshdesk?',
    a: 'Responza replaces the inbox and CRM pieces. You can import your Zoho contacts and tags on day one, and we\'re happy to run in parallel while you migrate.',
  },
]

export function LandingFAQ(): ReactElement {
  const [open, setOpen] = useState(0)

  return (
    <section className="landing-faq">
      <Container>
        <div className="landing-faq-grid">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="display landing-faq-title">
              Questions, answered straight.
            </h2>
            <p className="landing-faq-copy">
              Still wondering? Email{' '}
              <a href="mailto:hi@responza.app" className="landing-faq-email">hi@responza.app</a>
              {' '}— a human replies within the hour (irony noted).
            </p>
          </div>
          <div>
            {faqs.map((f, i) => (
              <div key={i} className="landing-faq-item">
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="landing-faq-question"
                >
                  <span className="landing-faq-question-text">{f.q}</span>
                  <span className={`landing-faq-plus ${open === i ? 'landing-faq-plus-open' : ''}`}>+</span>
                </button>
                {open === i && (
                  <div className="landing-faq-answer">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
            <div className="landing-faq-divider" />
          </div>
        </div>
      </Container>
    </section>
  )
}