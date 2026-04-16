import type { ReactElement } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/Button'

const pipelineRows = [
  { name: 'Nova Components', value: '₹2.4L', stage: 'Quoted', stageStyle: 'bg-emerald-100 text-emerald-800' },
  { name: 'Ironline Mfg.', value: '₹5.8L', stage: 'Negotiation', stageStyle: 'bg-teal-100 text-teal-800' },
  { name: 'Axion Steels', value: '₹1.1L', stage: 'New Lead', stageStyle: 'bg-brand-primary/10 text-brand-primary' },
  { name: 'PrimeFab Ind.', value: '₹3.7L', stage: 'Quoted', stageStyle: 'bg-emerald-100 text-emerald-800' },
  { name: 'Verma Fabrication', value: '₹8.2L', stage: 'Negotiation', stageStyle: 'bg-teal-100 text-teal-800' },
]

const teamMembers = [
  { initials: 'AV', name: 'Anand V.', role: 'Sales Lead', color: 'bg-emerald-100 text-emerald-900' },
  { initials: 'NP', name: 'Neha P.', role: 'Ops Lead', color: 'bg-teal-100 text-teal-900' },
  { initials: 'RI', name: 'Rahul I.', role: 'Founder', color: 'bg-brand-primary/10 text-brand-primary' },
]

const barHeights = ['40%', '55%', '48%', '70%', '85%', '100%']

export function LandingHero(): ReactElement {
  return (
    <section className="relative grid min-h-[78vh] grid-cols-1 items-center gap-10 overflow-hidden px-2 py-10 lg:grid-cols-2 lg:px-0">
      {/* Background glow */}
      <div className="pointer-events-none absolute right-0 top-0 h-[520px] w-[520px] -translate-y-20 translate-x-20 rounded-full bg-teal-300/10 blur-3xl" />

      {/* Left: Text */}
      <div className="relative z-10 flex flex-col">
        <p className="mb-7 inline-flex w-fit items-center gap-2 rounded-full border border-border-muted bg-surface-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-link-secondary">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
          CRM for Modern Manufacturers
        </p>

        <h1 className="mb-6 font-display text-5xl font-normal leading-[1.05] tracking-tight text-text-primary lg:text-6xl xl:text-7xl">
          Close more deals,{' '}
          <em className="not-italic text-brand-primary">faster</em>{' '}
          than ever before.
        </h1>

        <p className="mb-10 max-w-md text-lg leading-relaxed text-slate-600">
          One workspace for your sales pipeline, customer conversations, quotations, and
          delivery — no spreadsheets, no duplicates.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Link to="/login">
            <Button
              size="lg"
              className="flex items-center gap-2 rounded-full bg-brand-primary px-8 text-text-inverse hover:bg-brand-hover"
            >
              Get started free
              <ArrowRight className="h-4 w-4 text-text-inverse" aria-hidden />
            </Button>
          </Link>
        </div>
      </div>

      {/* Right: Dashboard mockup */}
      <div className="relative hidden lg:block">
        <div className="relative h-[440px]">
          {/* Main pipeline card */}
          <div className="absolute inset-0 rounded-2xl border border-border-muted bg-surface-base p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-800">Sales Pipeline</span>
              <span className="text-xs text-slate-400">April 2025</span>
            </div>
            <div className="mb-3 grid grid-cols-3 gap-2">
              {['Lead', 'Value', 'Stage'].map((h) => (
                <span key={h} className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  {h}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {pipelineRows.map((row) => (
                <div
                  key={row.name}
                  className="grid grid-cols-3 items-center gap-2 rounded-lg border border-border-muted bg-surface-base px-3 py-2"
                >
                  <span className="text-xs font-medium text-slate-800">{row.name}</span>
                  <span className="text-center text-xs text-slate-500">{row.value}</span>
                  <span className={`rounded-full px-2 py-0.5 text-center text-[10px] font-semibold ${row.stageStyle}`}>
                    {row.stage}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue float card */}
          <div className="absolute -right-5 bottom-5 z-10 w-52 rounded-2xl border border-border-muted bg-surface-base p-4 shadow-md">
            <p className="mb-1 text-xs text-slate-400">Revenue this month</p>
            <p className="font-serif text-2xl font-medium text-slate-800">₹21.2L</p>
            <p className="mb-3 text-xs font-medium text-green-700">↑ 18% vs last month</p>
            <div className="flex h-9 items-end gap-1">
              {barHeights.map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t-sm ${i >= 3 ? 'bg-brand-primary' : 'bg-surface-secondary'}`}
                  style={{ height: h }}
                />
              ))}
            </div>
          </div>

          {/* Team float card */}
          <div className="absolute -left-7 top-44 z-10 w-44 rounded-2xl border border-border-muted bg-surface-base p-4 shadow-md">
            <p className="mb-3 text-xs font-semibold text-slate-700">Active Team</p>
            {teamMembers.map((m) => (
              <div key={m.initials} className="mb-2 flex items-center gap-2 last:mb-0">
                <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${m.color}`}>
                  {m.initials}
                </span>
                <div>
                  <p className="text-xs font-medium text-slate-800">{m.name}</p>
                  <p className="text-[10px] text-slate-400">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}