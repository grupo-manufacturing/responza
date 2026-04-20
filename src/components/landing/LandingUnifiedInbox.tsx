import type { ReactElement } from 'react'
import { useState } from 'react'
import { Container, SectionHead, ChannelGlyph, Avatar, Bubble, Sparkle, TagPill, LogoMark, Btn } from '@/components/landing/primitives'

const INBOX_THREADS = [
  { ch: 'wa',    name: 'Priya Sharma',           snippet: 'भैया, ये कुर्ता मीडियम साइज़…', time: '2m',  tag: 'Unread',        count: 2, intent: 'size + delivery' },
  { ch: 'insta', name: 'ariv_sundar',             snippet: 'இந்த கம்மல் இன்னும் stock…',   time: '5m',  tag: 'AI draft ready', count: 0, intent: 'price query' },
  { ch: 'shop',  name: 'Kavya R. · Order #4921', snippet: 'Payment captured · ₹2,340',     time: '9m',  tag: 'Order',          count: 0, intent: 'purchase' },
  { ch: 'im',    name: 'Rajesh Traders',          snippet: '500 पीस का रेट क्या होगा?',   time: '14m', tag: 'B2B',            count: 1, intent: 'bulk quote' },
  { ch: 'insta', name: 'neha.bydesign',           snippet: 'Can you ship to Dubai?',        time: '22m', tag: 'Escalate',       count: 1, intent: 'international' },
  { ch: 'wa',    name: 'Amit Gupta',              snippet: 'Return request — item size too…', time: '41m', tag: 'Return',       count: 0, intent: 'returns' },
  { ch: 'shop',  name: 'Sneha M. · Order #4918', snippet: 'Shipped · AWB SR8824193',       time: '1h',  tag: 'Shipment',       count: 0, intent: 'shipping' },
]

function channelName(k: string) {
  return { shop: 'Shopify', insta: 'Instagram', wa: 'WhatsApp', im: 'IndiaMART' }[k] || k
}

function FilterPill({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return <span className={`landing-unified-filter ${active ? 'landing-unified-filter-active' : ''}`}>{children}</span>
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="landing-unified-info-row">
      <span className="landing-unified-info-label">{label}</span>
      <span className="landing-unified-info-value">{value}</span>
    </div>
  )
}

export function LandingUnifiedInbox(): ReactElement {
  const [sel, setSel] = useState(0)
  const t = INBOX_THREADS[sel]

  return (
    <section id="product" className="landing-unified">
      <Container>
        <SectionHead
          eyebrow="Unified inbox"
          title={<>Every conversation, <em className="landing-accent-em">one</em> place.</>}
        />

        <div className="landing-unified-shell">
          {/* toolbar */}
          <div className="landing-unified-toolbar">
            <LogoMark size={18} />
            <span className="mono landing-unified-toolbar-title">inbox</span>
            <div className="landing-unified-toolbar-spacer" />
            <FilterPill active>All channels</FilterPill>
            <FilterPill>Unassigned</FilterPill>
            <FilterPill>Needs me</FilterPill>
            <FilterPill>AI handled</FilterPill>
          </div>

          <div className="landing-unified-grid">
            {/* thread list */}
            <div className="landing-unified-threads">
              {INBOX_THREADS.map((th, i) => (
                <button key={i} onClick={() => setSel(i)} className={`landing-unified-thread ${i === sel ? 'landing-unified-thread-active' : ''}`}>
                  <ChannelGlyph kind={th.ch} size={22} />
                  <div className="landing-unified-thread-main">
                    <div className="landing-unified-thread-head">
                      <div className="landing-unified-thread-name">{th.name}</div>
                      <div className="landing-unified-thread-time">{th.time}</div>
                    </div>
                    <div className="landing-unified-thread-snippet">{th.snippet}</div>
                    <div className="landing-unified-thread-tags">
                      <TagPill>{th.tag}</TagPill>
                      {th.count > 0 && (
                        <span className="landing-unified-thread-count">{th.count}</span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* main pane */}
            <div className="landing-unified-main">
              <div className="landing-unified-main-head">
                <Avatar name={t.name} />
                <div>
                  <div className="landing-unified-main-name">{t.name}</div>
                  <div className="landing-unified-main-meta">
                    via <ChannelGlyph kind={t.ch} size={11} /> {channelName(t.ch)} · {t.intent}
                  </div>
                </div>
              </div>

              <Bubble side="in">
                <div className="landing-unified-in-msg">{t.snippet}</div>
                <div className="mono landing-unified-in-time">{t.time} ago</div>
              </Bubble>

              <div className="landing-unified-suggestion">
                <Sparkle color="var(--accent)" />
                <div className="landing-unified-suggestion-text">
                  <b>Responza suggests:</b> check stock in Jaipur warehouse, offer same-day dispatch, propose alternative colors.
                </div>
              </div>

              <Bubble side="out">
                <div className="mono landing-unified-draft-label">AI DRAFT</div>
                <div className="landing-unified-draft-text">
                  Hi {t.name.split(/[\s·]/)[0]}! Yes, we have your item in stock — happy to dispatch same-day from Jaipur. Shall I confirm the order?
                </div>
              </Bubble>

              <div className="landing-unified-reply-bar">
                <div className="landing-unified-reply-text">Reply as yourself, or tap</div>
                <Btn variant="accent" size="sm"><Sparkle /> Send AI reply</Btn>
              </div>
            </div>

            {/* customer panel */}
            <div className="landing-unified-side">
              <div className="mono landing-unified-side-title">CUSTOMER · 360°</div>
              <InfoRow label="Lifetime value" value="₹18,420" />
              <InfoRow label="Orders" value="7" />
              <InfoRow label="First seen" value="Instagram · Aug '24" />
              <InfoRow label="Preferred lang" value="Hindi" />
              <InfoRow label="City" value="Jaipur, RJ" />
              <div className="landing-unified-side-rule" />
              <div className="mono landing-unified-side-title landing-unified-side-title-orders">RECENT ORDERS</div>
              {['#4921 · Ananta Kurta', '#4718 · Silk Dupatta', '#4432 · Block-print Sari'].map((o) => (
                <div key={o} className="landing-unified-order-row">{o}</div>
              ))}
              <div className="landing-unified-side-rule" />
              <div className="landing-unified-tag-wrap">
                {['VIP', 'repeat buyer', 'ethnic wear', 'north india'].map((tag) => (
                  <TagPill key={tag}>{tag}</TagPill>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}