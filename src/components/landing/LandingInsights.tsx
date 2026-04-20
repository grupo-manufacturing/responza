import type { ReactElement, ReactNode } from 'react'
import { Container, SectionHead } from '@/components/landing/primitives'

function StatCard({ k, v, delta, hint }: { k: string; v: string; delta: string; hint: string }) {
  const up = delta.startsWith('+')
  const down = delta.startsWith('−') || delta.startsWith('-')
  return (
    <div className="landing-insights-stat">
      <div className="mono landing-insights-stat-key">{k.toUpperCase()}</div>
      <div className="display landing-insights-stat-value">{v}</div>
      <div className="landing-insights-stat-row">
        <span className={`landing-insights-delta ${(up || down) ? 'landing-insights-delta-up' : ''}`}>{delta}</span>
        <span className="landing-insights-hint">{hint}</span>
      </div>
    </div>
  )
}

function DashCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="landing-insights-dash-card">
      <div className="mono landing-insights-dash-title">{title.toUpperCase()}</div>
      {children}
    </div>
  )
}

function LegendDot({ c, label }: { c: string; label: string }) {
  const swatchClass =
    c === 'var(--accent)'
      ? 'landing-insights-swatch-accent'
      : c === '#D5F26B'
        ? 'landing-insights-swatch-shop'
        : c === '#8A5AE8'
          ? 'landing-insights-swatch-insta'
          : 'landing-insights-swatch-im'
  return (
    <span className="landing-insights-legend-item">
      <span className={`landing-insights-swatch ${swatchClass}`} />
      {label}
    </span>
  )
}

function Finding({ tone, children }: { tone: 'orange' | 'lime' | 'violet' | 'gold'; children: ReactNode }) {
  return (
    <div className={`landing-insights-finding landing-insights-finding-${tone}`}>
      {children}
    </div>
  )
}

function AreaChart() {
  const w = 560, h = 160, pad = 10
  const days = 14
  const series = [
    { name: 'wa',    color: 'var(--accent)', data: [12,18,14,22,28,30,26,34,41,38,45,52,48,61] },
    { name: 'shop',  color: '#D5F26B',       data: [ 5, 7, 6, 9,11,14,13,15,18,20,19,24,22,28] },
    { name: 'insta', color: '#8A5AE8',       data: [ 8,10, 9,12,14,16,15,18,22,20,26,24,28,32] },
    { name: 'im',    color: '#F4C53D',       data: [ 3, 5, 4, 6, 8, 7, 9,11,10,13,12,15,13,17] },
  ]
  const stacked: { base: number; top: number; color: string }[][] = []
  for (let i = 0; i < days; i++) {
    let base = 0
    const col: { base: number; top: number; color: string }[] = []
    for (const s of series) { col.push({ base, top: base + s.data[i], color: s.color }); base += s.data[i] }
    stacked.push(col)
  }
  const maxY = Math.max(...stacked.map((c) => c[c.length - 1].top))
  const xAt = (i: number) => pad + i * ((w - 2 * pad) / (days - 1))
  const yAt = (v: number) => h - pad - (v / maxY) * (h - 2 * pad)
  const pathFor = (idx: number) => {
    let top = `M ${xAt(0)} ${yAt(stacked[0][idx].top)}`
    for (let i = 1; i < days; i++) top += ` L ${xAt(i)} ${yAt(stacked[i][idx].top)}`
    for (let i = days - 1; i >= 0; i--) top += ` L ${xAt(i)} ${yAt(stacked[i][idx].base)}`
    return top + ' Z'
  }
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="landing-insights-chart">
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1={pad} x2={w - pad} y1={h * g} y2={h * g} stroke="rgba(255,255,255,0.08)" />
      ))}
      {series.map((s, i) => (
        <path key={s.name} d={pathFor(i)} fill={s.color} opacity={0.85} />
      ))}
    </svg>
  )
}

export function LandingInsights(): ReactElement {
  return (
    <section className="landing-insights">
      <Container>
        <SectionHead
          eyebrow="AI insights"
          title="Numbers your gut feel couldn't see."
        />
        <div className="landing-insights-shell">
          <div aria-hidden className="landing-insights-glow" />
          <div className="landing-insights-stats">
            <StatCard k="Customers this week" v="1,284" delta="+18.4%" hint="across 4 channels" />
            <StatCard k="Avg response time" v="42s" delta="−89%" hint="was 7m14s before Responza" />
            <StatCard k="Revenue attributed" v="₹4,28,900" delta="+₹1.2L" hint="from AI-closed chats" />
          </div>
          <div className="landing-insights-dash">
            <DashCard title="Conversation volume · last 14 days">
              <AreaChart />
              <div className="landing-insights-legend">
                <LegendDot c="var(--accent)" label="WhatsApp" />
                <LegendDot c="#D5F26B" label="Shopify" />
                <LegendDot c="#8A5AE8" label="Instagram" />
                <LegendDot c="#F4C53D" label="IndiaMART" />
              </div>
            </DashCard>
            <DashCard title="Responza AI found">
              <Finding tone="orange"><b>12 customers</b> asked about "same-day delivery" this week — consider a banner on the Shopify store.</Finding>
              <Finding tone="lime"><b>Kurta set (Ananta)</b> is your top question driver on Instagram — stock low at 7 units.</Finding>
              <Finding tone="violet"><b>Rajesh Traders</b> (IndiaMART) hasn't replied in 6 days — worth ₹42K in pipeline. Nudge?</Finding>
              <Finding tone="gold">Hindi messages up <b>+34%</b> this month. AI auto-translate saved ~9h of typing.</Finding>
            </DashCard>
          </div>
        </div>
      </Container>
    </section>
  )
}