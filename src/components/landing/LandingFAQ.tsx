import type { ReactElement } from 'react'
import { useState } from 'react'
import { Container, Eyebrow } from '@/components/landing/primitives'

const faqs = [
  {
    q: 'Which Indian languages are supported?',
    a: 'At launch: Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Punjabi, Kannada, Malayalam, Odia and English. Urdu, Assamese and Arabic are in beta. If your customer types in Hinglish or transliterated Tamil, we handle that too.',
  },
  {
    q: 'Is my customer data safe?',
    a: 'Data stays in Mumbai (AWS ap-south-1). SOC 2 Type II in progress, DPDP Act-compliant, end-to-end encryption for WhatsApp. We don\'t train our models on your customer conversations.',
  }
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
              Still wondering? <br />
              <a href="mailto:hi@responza.app" className="landing-faq-email">contact@responza.in</a>
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