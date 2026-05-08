import type { ReactElement } from 'react'
import { Container, SectionHead } from '@/components/landing/primitives'

type Step = {
  title: string
  body: string
}

const STEPS: Step[] = [
  {
    title: 'Connect your channels',
    body: 'Connect WhatsApp, Instagram and IndiaMART in minutes.',
  },
  {
    title: 'All customer messages in one box',
    body: 'Every incoming chat lands in one shared inbox for your team.',
  },
  {
    title: "Responza AI replies in your customer's language",
    body: 'AI drafts and sends replies with your tone in the customer language.',
  },
]

export function LandingHowItWorks(): ReactElement {
  return (
    <section id="how-it-works" className="landing-how">
      <Container>
        <SectionHead
          eyebrow="How It Works"
          title={<>Go live in 3 simple <em className="landing-accent-em">steps.</em></>}
          kicker="No complex setup. Connect channels, unify conversations, and let AI handle replies."
        />

        <div className="landing-how-steps" role="list" aria-label="How it works steps">
          {STEPS.map((step, idx) => (
            <article key={step.title} className="landing-how-step" role="listitem">
              <span className="mono landing-how-index">0{idx + 1}</span>
              <h3 className="landing-how-title">{step.title}</h3>
              <p className="landing-how-body">{step.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
