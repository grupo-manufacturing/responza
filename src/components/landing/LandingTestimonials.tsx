import type { ReactElement } from 'react'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote:
      'Responza cut our quote turnaround from two days to a few hours. Our sales team now responds to leads before competitors even see the enquiry.',
    name: 'Anand Verma',
    role: 'Director, Verma Fabrications',
    initials: 'AV',
    featured: true,
  },
  {
    quote:
      'The WhatsApp integration is exactly what we needed. We no longer lose pricing requests between chat and operations.',
    name: 'Neha Patil',
    role: 'Operations Lead, Nova Components',
    initials: 'NP',
    featured: false,
  },
  {
    quote:
      'Pipeline visibility improved immediately. Everyone from sales to dispatch sees what is pending and what is ready.',
    name: 'Rahul Iyer',
    role: 'Founder, Ironline Manufacturing',
    initials: 'RI',
    featured: false,
  },
  {
    quote:
      'Our inside sales team now answers enquiries with full context, and conversion rates have clearly improved.',
    name: 'Pooja Nair',
    role: 'Sales Head, Axion Steels',
    initials: 'PN',
    featured: false,
  },
]

export function LandingTestimonials(): ReactElement {
  const featured = testimonials.find((t) => t.featured)!
  const rest = testimonials.filter((t) => !t.featured)

  return (
    <section id="testimonials" className="bg-surface-secondary px-6 py-14 md:px-10 md:py-16">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-link-secondary">
            What our customers say
          </p>
          <h2 className="font-display text-4xl font-normal leading-tight tracking-tight text-text-primary lg:text-5xl">
            Trusted by manufacturing teams across India
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
            Real outcomes from teams using Responza to streamline communication, quoting, and
            sales execution.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <article className="group flex flex-col justify-between rounded-2xl border border-border-muted bg-surface-base p-8 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-primary/25 hover:shadow-md md:row-span-2">
            <Quote className="mb-5 h-6 w-6 text-brand-primary/70" aria-hidden />
            <p className="mb-8 text-lg leading-relaxed text-slate-700">"{featured.quote}"</p>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-xs font-semibold text-brand-primary">
                {featured.initials}
              </span>
              <div>
                <p className="text-sm font-semibold text-text-primary">{featured.name}</p>
                <p className="text-xs text-slate-500">{featured.role}</p>
              </div>
            </div>
          </article>

          {rest.map((t) => (
            <article
              key={t.name}
              className="group flex flex-col justify-between rounded-2xl border border-border-muted bg-surface-base p-7 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-primary/25 hover:shadow-md"
            >
              <Quote className="mb-4 h-5 w-5 text-brand-primary/60" aria-hidden />
              <p className="mb-6 text-sm leading-relaxed text-slate-700">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-[10px] font-semibold text-brand-primary">
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}