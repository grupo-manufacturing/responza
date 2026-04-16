import type { ReactElement } from 'react'
import { BarChart3, ClipboardCheck, MessageSquareText, ShieldCheck, Truck, Workflow } from 'lucide-react'

const featureCards = [
  {
    title: 'Unified Inbox',
    body: 'Keep customer chats from WhatsApp and Instagram in one place, with full context and history.',
    Icon: MessageSquareText,
  },
  {
    title: 'Sales Workflow',
    body: 'Move from lead to quotation to order without spreadsheets or duplicate data entry.',
    Icon: Workflow,
  },
  {
    title: 'Live Insights',
    body: 'Monitor team activity, pipeline health, and open opportunities at a single glance.',
    Icon: BarChart3,
  },
  {
    title: 'Quotation Builder',
    body: 'Create branded quotations with line items and pricing in just a few clicks.',
    Icon: ClipboardCheck,
  },
  {
    title: 'Delivery Tracking',
    body: 'Keep orders visible from confirmation to dispatch and final fulfillment.',
    Icon: Truck,
  },
  {
    title: 'Role-based Control',
    body: 'Protect sensitive sales data with clean access boundaries for every team member.',
    Icon: ShieldCheck,
  },
]

export function LandingFeatures(): ReactElement {
  return (
    <section id="features" className="bg-surface-base px-6 py-14 md:px-10 md:py-16">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-link-secondary">
            What you get
          </p>
          <h2 className="font-display text-4xl font-normal leading-tight tracking-tight text-text-primary lg:text-5xl">
            Features built for high-velocity sales teams
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
            Everything from lead capture to order fulfillment, with workflows designed for
            manufacturing operations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((feature) => (
            <article
              key={feature.title}
              className="group rounded-xl border border-border-muted bg-surface-base p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-primary/30 hover:shadow-md"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-surface-secondary transition-colors group-hover:bg-brand-primary/10">
                <feature.Icon className="h-5 w-5 text-brand-primary" aria-hidden />
              </div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{feature.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}