import type { ReactElement } from 'react'
import { useState } from 'react'
import { submitWaitlistEmail } from '@/lib/waitlistSubmit'
import { Btn } from './primitives'

function renderHeadline(text: string) {
  const words = text.trim().split(/\s+/)
  if (words.length < 3) return text
  const head = words.slice(0, -2).join(' ')
  const tail = words.slice(-2).join(' ')
  return (
    <>
      {head}{' '}
      <span className="landing-hero-highlight-wrap">
        <span className="landing-hero-highlight-text">{tail}</span>
        <span
          aria-hidden
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: '0.04em',
            height: '0.32em',
            background: 'var(--accent)',
            opacity: 0.35,
            zIndex: 0,
            borderRadius: 3,
          }}
        />
      </span>
    </>
  )
}

const HERO_TRUST_BADGES = ['Meta Verified', 'No Credit Card', 'Instant Setup'] as const

function TrustTickIcon(): ReactElement {
  return (
    <svg className="landing-hero-trust-tick" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M13.5 4.5l-6.2 6.2-2.4-2.4"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function LandingHero(): ReactElement {
  const headline = "One inbox. Every channel. A team member who never sleeps."
  const subhead = "Responza unifies Shopify, Instagram, WhatsApp and IndiaMART in a single CRM — and replies in your customer's language while you sleep."
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return (
    <section className="landing-hero">
      <div aria-hidden className="landing-hero-glow-wrap">
        <div className="landing-hero-glow" />
      </div>

      <div className="landing-container landing-hero-inner">
        <div className="landing-hero-content">
          <div className="landing-hero-pill">
            <span className="landing-hero-pill-new">INDIA'S</span>
            <span className="mono landing-hero-pill-text">#1 Smart Inbox For Businesses</span>
          </div>

          <h1 className="display landing-hero-title">
            {renderHeadline(headline)}
          </h1>

          <p className="landing-hero-subhead">
            {subhead}
          </p>

          <div className="landing-hero-cta">
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
                placeholder="you@yourstore.in"
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

            <div className="landing-hero-trust-badges" aria-label="Product assurances">
              {HERO_TRUST_BADGES.map((label) => (
                <span key={label} className="landing-hero-trust-badge">
                  <TrustTickIcon />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
