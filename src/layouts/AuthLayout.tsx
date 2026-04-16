import { memo, type ReactElement, type ReactNode } from 'react'
import { BarChart3, MessagesSquare, ShieldCheck } from 'lucide-react'

export interface AuthLayoutProps {
  children: ReactNode
}

function AuthLayoutComponent({ children }: AuthLayoutProps): ReactElement {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-surface-base via-surface-base to-blue-50/20 px-4 py-8 text-text-primary">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,rgba(0,82,255,0.15),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-400/10 to-transparent blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-gradient-to-tr from-blue-300/5 to-transparent blur-3xl"
        aria-hidden
      />
      <div className="relative z-10 grid w-full max-w-[1120px] overflow-hidden rounded-xlToken border border-border-muted bg-surface-base shadow-2xl backdrop-blur-sm lg:grid-cols-2 transition-all duration-500 hover:shadow-3xl">
        <section className="hidden h-full flex-col justify-between border-r border-border-muted bg-gradient-to-br from-blue-50/40 via-surface-base to-surface-base p-px32 lg:flex">
          <div>
            <p className="type-caption uppercase tracking-wide text-brand-primary">
              Responza App
            </p>
            <h1 className="type-hero-3 mt-4 bg-gradient-to-r from-text-primary to-brand-primary bg-clip-text text-transparent">
              Sell faster, stay organized.
            </h1>
            <p className="type-body mt-4 max-w-md text-slate-700">
              Manage leads, quotations, orders, and conversations from one focused
              workspace built for fast-moving teams.
            </p>
          </div>

          <div className="grid gap-3">
            <div className="group flex items-center gap-3 rounded-mdToken border border-blue-200/50 bg-gradient-to-r from-blue-50/50 to-transparent px-4 py-3 transition-all duration-300 hover:border-brand-primary/30 hover:bg-blue-50/80">
              <ShieldCheck className="h-5 w-5 text-brand-primary transition-transform duration-300 group-hover:scale-110" aria-hidden />
              <p className="type-body-small text-slate-700">
                Reliable pipeline tracking from first contact to delivery.
              </p>
            </div>
            <div className="group flex items-center gap-3 rounded-mdToken border border-blue-200/50 bg-gradient-to-r from-blue-50/50 to-transparent px-4 py-3 transition-all duration-300 hover:border-brand-primary/30 hover:bg-blue-50/80">
              <MessagesSquare className="h-5 w-5 text-brand-primary transition-transform duration-300 group-hover:scale-110" aria-hidden />
              <p className="type-body-small text-slate-700">
                Unified communication view across channels.
              </p>
            </div>
            <div className="group flex items-center gap-3 rounded-mdToken border border-blue-200/50 bg-gradient-to-r from-blue-50/50 to-transparent px-4 py-3 transition-all duration-300 hover:border-brand-primary/30 hover:bg-blue-50/80">
              <BarChart3 className="h-5 w-5 text-brand-primary transition-transform duration-300 group-hover:scale-110" aria-hidden />
              <p className="type-body-small text-slate-700">
                Actionable visibility into revenue and fulfilment status.
              </p>
            </div>
          </div>
        </section>

        <section className="flex min-h-[520px] items-center justify-center p-px20 sm:p-px32">
          <div className="w-full max-w-sm">{children}</div>
        </section>
      </div>
    </div>
  )
}

export const AuthLayout = memo(AuthLayoutComponent)
