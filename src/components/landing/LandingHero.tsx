import type { ReactElement } from 'react'
import { useState, useEffect } from 'react'
import { ChannelGlyph, Bubble, Avatar, Sparkle } from '@/components/landing/primitives'

const CONVOS = [
  {
    channel: 'wa', channelLabel: 'WhatsApp',
    customer: 'Priya S.',
    phone: '+91 98765 •••••',
    orig: 'भैया, ये कुर्ता मीडियम साइज़ में मिलेगा? कल तक डिलीवरी हो जाएगी?',
    origLang: 'Hindi',
    translated: 'Hey, will this kurta be available in medium size? Can you deliver by tomorrow?',
    intent: 'Size + delivery query',
    reply: 'Hi Priya! Yes, the Ananta Kurta is in stock in Medium. Same-day dispatch from our Jaipur warehouse — you\'ll get it by tomorrow 6 PM. Want me to reserve one?',
    replyTranslated: 'नमस्ते प्रिया! हाँ, अनंता कुर्ता मीडियम में उपलब्ध है। जयपुर से आज ही डिस्पैच हो जाएगा — कल शाम 6 बजे तक आपके पास पहुँच जाएगा। क्या आरक्षित कर दूँ?',
  },
  {
    channel: 'insta', channelLabel: 'Instagram DM',
    customer: 'ariv_sundar',
    phone: '',
    orig: 'இந்த கம்மல் இன்னும் stock இருக்கா? price என்ன?',
    origLang: 'Tamil',
    translated: 'Are these earrings still in stock? What\'s the price?',
    intent: 'Price + stock query',
    reply: 'Yes! The Mayil jhumkas are back in stock — ₹1,499 incl. GST. Ships free across Tamil Nadu. Shall I send the checkout link?',
    replyTranslated: 'ஆமா! மயில் ஜிமுக்கா ரீஸ்டாக் ஆயிட்டு — ₹1,499 (GST சேர்த்து). தமிழ்நாடு முழுக்க shipping free. Link அனுப்பவா?',
  },
  {
    channel: 'im', channelLabel: 'IndiaMART',
    customer: 'Rajesh Traders',
    phone: 'Bulk enquiry',
    orig: '500 पीस का रेट क्या होगा? GST included में।',
    origLang: 'Hindi',
    translated: 'What\'s the rate for 500 pieces? GST included.',
    intent: 'B2B bulk pricing',
    reply: 'For 500 units, we can offer ₹182/pc (GST incl.), with 30% advance and 45-day payment terms. Want me to share a PI?',
    replyTranslated: '500 पीस पर ₹182/पीस (GST सहित) दे सकते हैं, 30% एडवांस और 45 दिन पेमेंट टर्म। PI भेज दूँ?',
  },
]

function ShimmerLines() {
  return (
    <div className="landing-hero-shimmer-lines">
      <div className="shimmer landing-hero-shimmer landing-hero-shimmer-wide" />
      <div className="shimmer landing-hero-shimmer landing-hero-shimmer-narrow" />
    </div>
  )
}

function TranslationStrip({ stage, translated, lang }: { stage: number; translated: string; lang: string }) {
  if (stage < 1) return null
  return (
    <div className="landing-hero-translation-strip">
      <div className="landing-hero-translation-icon"><Sparkle color="var(--accent)" /></div>
      <div className="landing-hero-translation-content">
        <div className="mono landing-hero-translation-label">
          {stage === 1 ? `Translating from ${lang}…` : `Translated from ${lang}`}
        </div>
        <div className="landing-hero-translation-text">
          {stage === 1 ? <ShimmerLines /> : translated}
        </div>
      </div>
    </div>
  )
}

function FloatingBadge({ children, position }: { children: React.ReactNode; position: 'top' | 'bottom' }) {
  const positionClass = position === 'top' ? 'landing-hero-badge-top' : 'landing-hero-badge-bottom'
  return (
    <div className={`landing-hero-badge ${positionClass}`}>
      {children}
    </div>
  )
}

function Dot3({ c }: { c: string }) {
  const cls = c === '#E86B2B' ? 'landing-hero-dot-red' : c === '#F4C53D' ? 'landing-hero-dot-yellow' : 'landing-hero-dot-green'
  return <span className={`landing-hero-dot ${cls}`} />
}

function HeroPreview() {
  const [idx, setIdx] = useState(0)
  const [stage, setStage] = useState(0)
  const [typed, setTyped] = useState('')
  const c = CONVOS[idx]

  useEffect(() => {
    setStage(0); setTyped('')
    const t1 = setTimeout(() => setStage(1), 900)
    const t2 = setTimeout(() => setStage(2), 1900)
    const t3 = setTimeout(() => setStage(3), 2800)
    const t4 = setTimeout(() => setStage(4), 3700)
    return () => [t1, t2, t3, t4].forEach(clearTimeout)
  }, [idx])

  useEffect(() => {
    if (stage < 3) { setTyped(''); return }
    const target = c.reply
    let i = 0
    const int = setInterval(() => {
      i += 2
      setTyped(target.slice(0, i))
      if (i >= target.length) clearInterval(int)
    }, 22)
    return () => clearInterval(int)
  }, [stage, idx])

  useEffect(() => {
    const t = setTimeout(() => { setIdx((i) => (i + 1) % CONVOS.length); setStage(0) }, 8500)
    return () => clearTimeout(t)
  }, [idx])

  return (
    <div className="landing-hero-preview">
      <FloatingBadge position="top">
        <span className="mono landing-hero-badge-label">LIVE</span>
        <span className="landing-hero-badge-value">2,847 replies today</span>
      </FloatingBadge>
      <div className="landing-hero-window">
        {/* window chrome */}
        <div className="landing-hero-window-top">
          <div className="landing-hero-dots">
            <Dot3 c="#E86B2B" /><Dot3 c="#F4C53D" /><Dot3 c="#2F7D4F" />
          </div>
          <div className="mono landing-hero-window-url">
            responza.app / inbox / {c.customer.toLowerCase().replace(/\W/g, '-')}
          </div>
          <div className="mono landing-hero-window-channel">
            <ChannelGlyph kind={c.channel} size={14} /> {c.channelLabel}
          </div>
        </div>

        <div className="landing-hero-window-body">
          <div className="landing-hero-customer">
            <Avatar name={c.customer} />
            <div className="landing-hero-customer-main">
              <div className="landing-hero-customer-name">{c.customer}</div>
              <div className="landing-hero-customer-meta">{c.phone || 'via ' + c.channelLabel}</div>
            </div>
            <div className="mono landing-hero-customer-intent">{c.intent}</div>
          </div>

          <Bubble side="in">
            <div className="landing-hero-message-text">{c.orig}</div>
            <div className="mono landing-hero-message-time">{c.origLang} · just now</div>
          </Bubble>

          <TranslationStrip stage={stage} translated={c.translated} lang={c.origLang} />

          {stage >= 3 && (
            <Bubble side="out">
              <div className="mono landing-hero-draft-label">
                <Sparkle /> RESPONZA AI · draft
              </div>
              <div className="landing-hero-draft-text">
                {typed}
                {typed.length < c.reply.length && <span className="cursor" />}
              </div>
              {stage >= 4 && (
                <div className="landing-hero-auto-translation">
                  <div className="mono landing-hero-auto-label">AUTO-TRANSLATED TO {c.origLang.toUpperCase()}</div>
                  {c.replyTranslated}
                </div>
              )}
            </Bubble>
          )}

        </div>
      </div>

      {/* pager dots */}
      <div className="landing-hero-pager">
        {CONVOS.map((_, i) => (
          <button key={i} onClick={() => { setIdx(i); setStage(0) }}
            className={`landing-hero-pager-dot ${i === idx ? 'landing-hero-pager-dot-active' : ''}`} />
        ))}
      </div>
    </div>
  )
}

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
        <div>
          <h1 className="display landing-hero-title">
            {renderHeadline(headline)}
          </h1>

        </div>

        <HeroPreview />
      </div>
    </section>
  )
}