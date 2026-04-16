import type { ReactElement } from 'react'
import { memo } from 'react'
import { format } from 'date-fns'
import { Check, CheckCheck } from 'lucide-react'

import type { Message } from '@/types/communication.types'

export interface MessageBubbleProps {
  message: Message
}

function statusIcon(message: Message): ReactElement {
  if (message.status === 'sent') {
    return <Check className="h-3.5 w-3.5" aria-hidden />
  }
  if (message.status === 'delivered') {
    return <CheckCheck className="h-3.5 w-3.5" aria-hidden />
  }
  return <CheckCheck className="h-3.5 w-3.5 text-link-secondary" aria-hidden />
}

function MessageBubbleComponent({ message }: MessageBubbleProps): ReactElement {
  const isOutbound = message.direction === 'outbound'

  return (
    <div className={`flex ${isOutbound ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] ${isOutbound ? 'items-end' : 'items-start'} flex flex-col`}>
        {!isOutbound && message.senderName !== null ? (
          <p className="mb-1 px-1 text-xs text-slate-500">{message.senderName}</p>
        ) : null}

        <div
          className={`rounded-2xl px-3 py-2 text-sm leading-relaxed ${
            isOutbound
              ? 'rounded-br-md bg-brand-primary text-text-inverse'
              : 'rounded-bl-md border border-border-muted bg-surface-base text-text-primary'
          }`}
        >
          <p>{message.body}</p>
        </div>

        <div className="mt-1 flex items-center gap-1 px-1 text-[11px] text-slate-500">
          <time dateTime={message.createdAt}>{format(new Date(message.createdAt), 'p')}</time>
          {isOutbound ? statusIcon(message) : null}
        </div>
      </div>
    </div>
  )
}

export const MessageBubble = memo(MessageBubbleComponent)
