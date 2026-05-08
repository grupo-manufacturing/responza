import type { ReactElement } from 'react'
import { Container, SectionHead } from '@/components/landing/primitives'

const FEATURES = [
  {
    title: 'Unified inbox',
    body: 'All messages from WhatsApp, Instagram DMs, and IndiaMART enquiries in one dashboard, including Instagram basic DM automation.',
  },
  {
    title: '24/7 AI replies',
    body: 'AI handles price enquiries, stock availability, and order status in the customer\'s language and tone, trained on your business context.',
  },
  {
    title: 'Lead priority tagging',
    body: 'Every message is auto-tagged as Hot Lead, Warm, Just Browsing, or Spam so your team knows exactly who to call first.',
  },
  {
    title: 'India language translation',
    body: 'Auto-detect and translate Hindi, Tamil, Telugu, Marathi, Bengali, and Gujarati. Reply in their language or yours.',
  },
  {
    title: 'AI-suggested templates',
    body: 'Get context-aware suggested replies and send in one tap, so your team stops typing the same answers all day.',
  },
  {
    title: 'Auto-built contact profiles',
    body: 'Each contact gets a live profile with conversation history, source channel, past orders, tags, and notes in one place.',
  },
  {
    title: 'Conversation insights',
    body: 'AI surfaces insights like repeated bulk-pricing requests or complaint patterns, so you know what your inbox is really saying.',
  },
  {
    title: 'Performance analytics',
    body: 'Track average response time, channel-wise conversion, busiest hours, and bot vs human reply ratio to spot leaks fast.',
  },
  {
    title: 'Everyday follow-ups automated',
    body: 'Automate routine customer texts and repetitive follow-ups while your team focuses on high-intent conversations.',
  },
]

export function LandingFeatures(): ReactElement {
  return (
    <section id="channels" className="landing-features">
      <Container>
        <SectionHead
          eyebrow="Features"
          title={
            <>
              Features built for fast-moving <em className="landing-accent-em">MSME teams.</em>
            </>
          }
          kicker="From first enquiry to repeat order, the platform helps your team respond faster, prioritize better, and sell more."
        />
        <div className="landing-features-grid">
          {FEATURES.map((f, i) => (
            <div key={f.title} className="landing-features-item">
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