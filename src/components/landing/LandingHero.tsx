import type { ReactElement } from 'react'

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
        <span aria-hidden className="landing-hero-highlight-bar" />
      </span>
    </>
  )
}

export function LandingHero(): ReactElement {
  const headline = "One inbox. Every channel. A team member who never sleeps."

  return (
    <section className="landing-hero">
      {/* warm bloom */}
      <div aria-hidden className="landing-hero-glow-wrap">
        <div className="landing-hero-glow" />
      </div>

      <div className="landing-container landing-hero-inner">
        <div className="landing-hero-content">
          <h1 className="display landing-hero-title">
            {renderHeadline(headline)}
          </h1>

        </div>
      </div>
    </section>
  )
}