import type { ReactElement } from 'react'

const companies = [
  'Verma Fabrications',
  'Nova Components',
  'Ironline Mfg.',
  'Axion Steels',
  'PrimeFab Industries',
]

export function LandingLogos(): ReactElement {
  return (
    <section className="border-y border-border-muted bg-surface-secondary px-6 py-5 md:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-y-2">
        <span className="mr-8 border-r border-border-muted pr-8 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
          Trusted by teams at
        </span>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          {companies.map((name) => (
            <span key={name} className="font-sans text-sm font-medium text-slate-500">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}