import type { ReactElement } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { submitWaitlistEmail } from '@/lib/waitlistSubmit'
import { Container, Btn, Wordmark } from '@/components/landing/primitives'

export function LandingFooterCTA(): ReactElement {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return (
    <section className="landing-footer-cta">
      <div aria-hidden className="landing-footer-cta-glow" />
      <Container className="landing-footer-cta-inner">
        <h2 className="display landing-footer-cta-title">
          Unified Messaging Platform.<br />
          <span className="landing-footer-cta-accent">Close the deals quickly.</span>
        </h2>
        <p className="landing-footer-cta-copy">
          Join 1,200+ Indian merchants on the waitlist. First 200 conversations are free — forever.
        </p>

        <form
          onSubmit={async (e) => {
            e.preventDefault()
            if (sending || sent) return
            setError(null)
            setSending(true)
            try {
              await submitWaitlistEmail(email, 'footer')
              setSent(true)
            } catch (err) {
              setError(err instanceof Error ? err.message : 'Something went wrong.')
            } finally {
              setSending(false)
            }
          }}
          className="landing-footer-cta-form"
        >
          <input
            required type="email" placeholder="you@yourstore.in" value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={sent}
            className="landing-footer-cta-input"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? 'footer-early-access-error' : undefined}
          />
          <Btn variant="accent" size="md" as="button" type="submit" disabled={sending || sent}>
            {sent ? 'On the list ✓' : sending ? 'Sending…' : 'Get early access'}
          </Btn>
        </form>
        {error ? (
          <p
            id="footer-early-access-error"
            role="alert"
            className="mono"
            style={{ color: 'rgba(255,255,255,0.85)', marginTop: 14, marginBottom: 0, fontSize: 13 }}
          >
            {error}
          </p>
        ) : null}

        {/* minimal footer */}
        <div className="landing-footer-cta-bottom">
          <div className="landing-footer-cta-brand">
            <Wordmark size={16} color="#fff" />
            <span className="landing-footer-cta-copyright">© 2026</span>
          </div>
          <div className="landing-footer-cta-links">
            <Link to="/privacy-policy" className="landing-footer-cta-link">Privacy</Link>
            <Link to="/terms-conditions" className="landing-footer-cta-link">Terms</Link>
          </div>
        </div>
      </Container>
    </section>
  )
}