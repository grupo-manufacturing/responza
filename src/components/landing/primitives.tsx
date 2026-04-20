import type { ReactElement, ReactNode } from 'react'

export function Container({ children, className = '' }: { children: ReactNode; className?: string }): ReactElement {
  const classes = className ? `landing-container ${className}` : 'landing-container'
  return <div className={classes}>{children}</div>
}

export function Eyebrow({ children, color }: { children: ReactNode; color?: string }): ReactElement {
  const classes = color ? 'landing-eyebrow landing-eyebrow-light' : 'landing-eyebrow'
  return (
    <div className={`${classes} mono`}>
      <span className="landing-eyebrow-line" />
      {children}
    </div>
  )
}

export function SectionHead({
  eyebrow,
  title,
  kicker,
}: {
  eyebrow: string
  title: ReactNode
  kicker?: string
}): ReactElement {
  return (
    <div className="landing-section-head">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="display landing-section-head-title">{title}</h2>
      {kicker && (
        <p className="landing-section-head-kicker">{kicker}</p>
      )}
    </div>
  )
}

export function Btn({
  children,
  variant = 'primary',
  size = 'md',
  as: Tag = 'button',
  ...rest
}: {
  children: ReactNode
  variant?: 'primary' | 'accent' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  as?: 'button' | 'a'
  [key: string]: unknown
}): ReactElement {
  const classes = `landing-btn landing-btn-${size} landing-btn-${variant}`
  return (
    <Tag {...rest} className={classes}>
      {children}
    </Tag>
  )
}

export function Sparkle({ color = '#fff' }: { color?: string }): ReactElement {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 0 L7 5 L12 6 L7 7 L6 12 L5 7 L0 6 L5 5 Z" fill={color} />
    </svg>
  )
}

export function TagPill({ children }: { children: ReactNode }): ReactElement {
  return <span className="landing-tag-pill">{children}</span>
}

export function Avatar({ name }: { name: string }): ReactElement {
  const initials = name
    .split(/[\s_.]+/)
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
  return (
    <div className="landing-avatar">{initials}</div>
  )
}

export function Bubble({ side, children }: { side: 'in' | 'out'; children: ReactNode }): ReactElement {
  const out = side === 'out'
  return (
    <div className={`landing-bubble-row ${out ? 'landing-bubble-row-out' : 'landing-bubble-row-in'}`}>
      <div className={`landing-bubble ${out ? 'landing-bubble-out' : 'landing-bubble-in'}`}>
        {children}
      </div>
    </div>
  )
}

export function LogoMark({ size = 22 }: { size?: number }): ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className="landing-svg-block">
      <rect x="1.5" y="1.5" width="29" height="29" rx="7" fill="var(--ink)" />
      <path
        d="M10 9.5 H17 a4.5 4.5 0 0 1 0 9 H13 l5 5 H14 l-5-5 V9.5 Z M13 12 V16 H17 a2 2 0 0 0 0 -4 Z"
        fill="var(--bg)"
      />
      <circle cx="24" cy="22" r="2" fill="var(--accent)" />
    </svg>
  )
}

export function Wordmark({ size = 22, color = 'currentColor' }: { size?: number; color?: string }): ReactElement {
  const sizeClass = size <= 16 ? 'landing-wordmark-sm' : size <= 18 ? 'landing-wordmark-md' : 'landing-wordmark-lg'
  const colorClass = color === '#fff' ? 'landing-wordmark-light' : 'landing-wordmark-default'
  return (
    <span className={`display landing-wordmark ${sizeClass} ${colorClass}`}>
      <LogoMark size={size * 0.95} />
      <span>RESPONZA</span>
    </span>
  )
}

export function ChannelGlyph({ kind, size = 28 }: { kind: string; size?: number }): ReactElement | null {
  const s = size
  const common = { width: s, height: s, viewBox: '0 0 32 32', className: 'landing-svg-block' }
  switch (kind) {
    case 'shop':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="26" height="26" rx="7" fill="#0F0E0C" />
          <path d="M9 12 L16 7 L23 12 V23 a2 2 0 0 1 -2 2 H11 a2 2 0 0 1 -2 -2 Z" fill="#D5F26B" />
          <rect x="14" y="16" width="4" height="9" fill="#0F0E0C" />
        </svg>
      )
    case 'insta':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="26" height="26" rx="8" fill="#E86B2B" />
          <rect x="8" y="8" width="16" height="16" rx="5" fill="none" stroke="#fff" strokeWidth="2" />
          <circle cx="16" cy="16" r="4" fill="none" stroke="#fff" strokeWidth="2" />
          <circle cx="21" cy="11" r="1.3" fill="#fff" />
        </svg>
      )
    case 'wa':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="26" height="26" rx="13" fill="#2F7D4F" />
          <path
            d="M10 22 L12 18 a6 6 0 1 1 3 3 Z"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'im':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="26" height="26" rx="7" fill="#1F3A8A" />
          <path
            d="M8 22 V10 L13 17 L18 10 V22"
            stroke="#F4C53D"
            strokeWidth="2.4"
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <circle cx="23" cy="11" r="2" fill="#F4C53D" />
        </svg>
      )
    default:
      return null
  }
}

export function ChannelChip({ kind, label }: { kind: string; label: string }): ReactElement {
  return (
    <div className="landing-channel-chip">
      <ChannelGlyph kind={kind} size={20} />
      {label}
    </div>
  )
}