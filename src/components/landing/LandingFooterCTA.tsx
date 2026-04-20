import type { ReactElement } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Eyebrow, Btn, Wordmark } from '@/components/landing/primitives'

export function LandingFooterCTA(): ReactElement {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <section className="landing-footer-cta">
      <div aria-hidden className="landing-footer-cta-glow" />
      <Container className="landing-footer-cta-inner">
        <Eyebrow color="rgba(255,255,255,0.7)">Early access · Q2 2026</Eyebrow>
        <h2 className="display landing-footer-cta-title">
          Let the AI reply.<br />
          <span className="landing-footer-cta-accent">You go close the sale.</span>
        </h2>
        <p className="landing-footer-cta-copy">
          Join 1,200+ Indian merchants on the waitlist. First 200 conversations are free — forever.
        </p>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true) }}
          className="landing-footer-cta-form"
        >
          <input
            required type="email" placeholder="you@yourstore.in" value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="landing-footer-cta-input"
          />
          <Btn variant="accent" size="md" as="button" type="submit">
            {sent ? 'On the list ✓' : 'Get early access'}
          </Btn>
        </form>

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