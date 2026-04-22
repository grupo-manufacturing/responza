import type { ReactElement } from 'react'
import { useState, useEffect } from 'react'
import { Container, Eyebrow, Sparkle } from '@/components/landing/primitives'

const LANG_SAMPLES = [
  { code: 'hi', label: 'Hindi',   greeting: 'नमस्ते!',   text: 'आपका ऑर्डर कल तक पहुँच जाएगा।' },
  { code: 'ta', label: 'Tamil',   greeting: 'வணக்கம்!',   text: 'உங்கள் ஆர்டர் நாளை வந்துவிடும்.' },
  { code: 'te', label: 'Telugu',  greeting: 'నమస్తే!',    text: 'మీ ఆర్డర్ రేపు వస్తుంది.' },
  { code: 'bn', label: 'Bengali', greeting: 'নমস্কার!',   text: 'আপনার অর্ডার কাল পৌঁছে যাবে।' },
  { code: 'mr', label: 'Marathi', greeting: 'नमस्कार!',   text: 'तुमची ऑर्डर उद्या पोहोचेल.' },
  { code: 'en', label: 'English', greeting: 'Hello!',     text: 'Your order arrives tomorrow.' },
]

const SAMPLES: Record<number, { in: { lang: string; text: string }; out: { lang: string; text: string } }> = {
  0: {
    in:  { lang: 'Hindi',   text: 'क्या यह शर्ट कॉटन की है? वॉशिंग के बाद सिकुड़ेगी तो नहीं?' },
    out: { lang: 'English', text: 'Is this shirt cotton? Will it shrink after washing?' },
  },
  1: {
    in:  { lang: 'Tamil',   text: 'Same design different color இருக்கா? என்ன colors வந்திருக்கு?' },
    out: { lang: 'English', text: 'Do you have the same design in a different color? What colors are available?' },
  },
  2: {
    in:  { lang: 'Bengali', text: 'এই শাড়ির সাথে matching blouse পাওয়া যাবে?' },
    out: { lang: 'English', text: 'Will I get a matching blouse with this saree?' },
  },
}

function TxRow({ side, lang, text, flag }: { side: string; lang: string; text: string; flag: string }) {
  return (
    <div className={`landing-translations-row ${side === 'customer' ? 'landing-translations-row-in' : 'landing-translations-row-out'}`}>
      <div className="landing-translations-flag">{flag}</div>
      <div className="landing-translations-row-main">
        <div className="mono landing-translations-row-label">
          {side === 'customer' ? 'CUSTOMER SAID' : 'YOU READ'} · {lang}
        </div>
        <div className="landing-translations-row-text">{text}</div>
      </div>
    </div>
  )
}

function TranslationMachine(): ReactElement {
  const [src, setSrc] = useState(0)
  const active = SAMPLES[src] || SAMPLES[0]

  useEffect(() => {
    const t = setInterval(() => setSrc((s) => (s + 1) % 3), 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="landing-translations-machine">
      <div className="landing-translations-head">
        <Sparkle color="var(--accent)" />
        <span className="mono landing-translations-live">LIVE TRANSLATE</span>
        <div className="landing-translations-head-spacer" />
        <span className="mono landing-translations-latency">0.6s avg</span>
      </div>

      <TxRow side="customer" lang={active.in.lang} text={active.in.text} flag="📥" />

      <div className="landing-translations-divider-row">
        <div className="landing-translations-divider-line" />
        <div className="landing-translations-pulse">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M4 7h10M14 7l-3-3M14 7l-3 3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 17H10M10 17l3 3M10 17l3-3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="landing-translations-divider-line" />
      </div>

      <TxRow side="you" lang={active.out.lang} text={active.out.text} flag="📤" />

      <div className="landing-translations-rule" />

      <div className="mono landing-translations-caption">
        YOU REPLY IN ENGLISH ↓ SENT AS {active.in.lang.toUpperCase()}
      </div>
      <div className="landing-translations-reply-in">
        Yes, 100% pure cotton. Pre-washed so it won't shrink. Machine wash cold.
      </div>
      <div className="landing-translations-reply-out">
        हाँ, 100% शुद्ध कॉटन है। प्री-वॉश्ड है इसलिए सिकुड़ेगी नहीं। मशीन वॉश कोल्ड।
      </div>

    </div>
  )
}

export function LandingTranslations(): ReactElement {
  return (
    <section className="landing-translations">
      <Container>
        <div className="landing-translations-intro">
          <Eyebrow>AI translation</Eyebrow>
          <p className="landing-translations-copy landing-translations-copy-full">
            Responza detects the language, translates the inbound message, in the chosen one automatically. 11 Indian Languages + English , Arabic & more.
          </p>
        </div>
        <div className="landing-translations-grid">
          <div>
            <h2 className="display landing-translations-title">
              Reply in the language your customer types in.
            </h2>
            <div className="landing-translations-language-grid">
              {LANG_SAMPLES.map((l) => (
                <div key={l.code} className="landing-translations-language-item">
                  <div className="mono landing-translations-language-code">
                    {l.code.toUpperCase()} · {l.label}
                  </div>
                  <div className="landing-translations-language-greeting">{l.greeting}</div>
                  <div className="landing-translations-language-text">{l.text}</div>
                </div>
              ))}
            </div>
          </div>
          <TranslationMachine />
        </div>
      </Container>
    </section>
  )
}