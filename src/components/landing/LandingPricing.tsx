import type { ReactElement } from 'react'
import { Container, SectionHead, Btn } from '@/components/landing/primitives'

function Check(): ReactElement {
  return (
    <div className="landing-pricing-check">
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
        <path d="M2 6 L5 9 L10 3" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

const features = [
  'All 4 channels: Shopify, Instagram, WhatsApp, IndiaMART',
  'Up to 5 team seats included',
  'Unlimited AI drafts + auto-translate (11 Indian languages)',
  'Unified CRM with customer 360°',
  'Weekly AI insights & briefings',
  'Bulk WhatsApp broadcasts (template fees at cost)',
  'SLA rules, escalation, team routing',
  'Razorpay, Shiprocket, Delhivery, Judge.me integrations',
  'Chat & email support in English and Hindi',
]

export function LandingPricing(): ReactElement {
  return (
    <section id="pricing" className="landing-pricing">
      <Container>
        <SectionHead
          eyebrow="Pricing"
          title="One plan. Everything included."
          kicker="Built for Indian SMBs. No seat minimums, no enterprise sales calls, no surprise bills."
        />
        <div className="landing-pricing-card">
          <div className="landing-pricing-left">
            <div aria-hidden className="landing-pricing-left-glow" />
            <div className="landing-pricing-left-content">
              <div className="mono landing-pricing-plan">RESPONZA · PRO</div>
              <div className="landing-pricing-price-row">
                <span className="display landing-pricing-price">₹2,499</span>
                <span className="landing-pricing-period">/month</span>
              </div>
              <div className="landing-pricing-billed">Billed monthly · GST extra · Cancel anytime</div>
              <Btn variant="accent" size="lg" as="a" href="#signup">Start 14-day free trial →</Btn>
              <div className="landing-pricing-trial-note">
                First 200 conversations per month are free — forever.
              </div>
            </div>
          </div>

          <div className="landing-pricing-right">
            <div className="landing-pricing-right-title">Everything in Responza:</div>
            {features.map((f) => (
              <div key={f} className="landing-pricing-feature">
                <Check />
                <div className="landing-pricing-feature-text">{f}</div>
              </div>
            ))}
            <div className="landing-pricing-sales-note">
              Need more seats or WhatsApp API at scale?{' '}
              <a href="#" className="landing-pricing-sales-link">Talk to sales →</a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}