import { AlertTriangle } from 'lucide-react'
import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  message: string
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, message: '' }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error.message }
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(error, info.componentStack)
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false, message: '' })
  }

  override render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="flex gap-3 rounded-xl border border-red-900/50 bg-red-950/35 p-4 text-sm text-red-100"
        >
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" aria-hidden />
          <div className="min-w-0">
            <p className="font-semibold text-red-100">This section crashed</p>
            <p className="mt-1 break-words text-red-200/90">{this.state.message}</p>
            <button
              type="button"
              onClick={this.handleRetry}
              className="mt-4 rounded-lg border border-red-800/60 bg-red-900/40 px-3 py-1.5 text-xs font-medium text-red-50 transition hover:bg-red-900/60"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
