import type { ReactElement } from 'react'
import { useState } from 'react'
import { submitWaitlistEmail } from '@/lib/waitlistSubmit'
import whatsappLogo from '@/assets/whatsapp.png'
import instagramLogo from '@/assets/instagram.png'
import indiamartLogo from '@/assets/indiamart.png'
import { Btn } from './primitives'

export function LandingHero(): ReactElement {
  const subhead =
    'Handle WhatsApp, Instagram and IndiaMART in one place — with AI that replies in Hindi (and English).'
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return (
    <section className="landing-hero">
      <div className="landing-container landing-hero-inner">
        <div className="landing-hero-grid">
          <div className="landing-hero-content">
            <div className="landing-hero-eyebrow mono">BUILT FOR INDIA</div>
            <h1 className="landing-hero-title">
              One inbox for <span className="landing-accent-em">Indian D2C brands</span> and{' '}
              <span className="landing-accent-em">manufacturers</span>
              <span className="landing-hero-title-dot">.</span>
            </h1>

            <p className="landing-hero-subhead">{subhead}</p>

            <div className="landing-hero-chips" aria-label="Supported channels">
              <span className="landing-hero-platform-chip">
                <img src={whatsappLogo} alt="" className="landing-hero-platform-icon" />
                WhatsApp
              </span>
              <span className="landing-hero-platform-chip">
                <img src={instagramLogo} alt="" className="landing-hero-platform-icon" />
                Instagram
              </span>
              <span className="landing-hero-platform-chip">
                <img src={indiamartLogo} alt="" className="landing-hero-platform-icon" />
                IndiaMART
              </span>
            </div>

            <div className="landing-hero-cta">
              <div className="landing-hero-cta-label">Get early access</div>
              <form
                id="hero-early-access"
                className="landing-hero-form"
                onSubmit={async (e) => {
                  e.preventDefault()
                  if (sending || sent) return
                  setError(null)
                  setSending(true)
                  try {
                    await submitWaitlistEmail(email, 'hero')
                    setSent(true)
                  } catch (err) {
                    setError(err instanceof Error ? err.message : 'Something went wrong.')
                  } finally {
                    setSending(false)
                  }
                }}
              >
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Work email (you@yourstore.in)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={sent}
                  className="landing-hero-input"
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? 'hero-early-access-error' : undefined}
                />
                <Btn variant="accent" size="md" as="button" type="submit" disabled={sending || sent}>
                  {sent ? "You're on the list ✓" : sending ? 'Sending…' : 'Get early access'}
                </Btn>
              </form>
              {error ? (
                <p
                  id="hero-early-access-error"
                  role="alert"
                  className="mono"
                  style={{ fontSize: 13, color: 'var(--danger, #b91c1c)', marginTop: 12, marginBottom: 0 }}
                >
                  {error}
                </p>
              ) : null}

              <p className="landing-hero-cta-note">
                Join 1,200+ Indian merchants on the waitlist. First 200 conversations are free — forever.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
