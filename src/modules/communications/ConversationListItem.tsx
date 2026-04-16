import type { ReactElement } from 'react'
import { memo, useMemo } from 'react'
import { formatDistanceToNow } from 'date-fns'

import type { ID } from '@/types/common.types'
import type { Conversation } from '@/types/communication.types'

export interface ConversationListItemProps {
  conversation: Conversation
  isActive: boolean
  onClick: (id: ID) => void
}

function ConversationListItemComponent({
  conversation,
  isActive,
  onClick,
}: ConversationListItemProps): ReactElement {
  const relativeTime = useMemo(() => {
    return formatDistanceToNow(new Date(conversation.lastMessageAt), {
      addSuffix: true,
    })
  }, [conversation.lastMessageAt])

  return (
    <button
      type="button"
      onClick={() => {
        onClick(conversation.id)
      }}
      className={`w-full rounded-lg border px-3 py-3 text-left transition ${
        isActive
          ? 'border-brand-primary bg-brand-primary/10'
          : 'border-border-muted bg-surface-base hover:border-brand-primary/35 hover:bg-surface-secondary'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-muted bg-surface-secondary text-sm font-semibold text-text-primary">
          {conversation.avatarInitials}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-text-primary">
                {conversation.contactName}
              </p>
              <p className="truncate text-xs text-slate-600">
                {conversation.contactHandle}
              </p>
            </div>
            <time
              dateTime={conversation.lastMessageAt}
              className="shrink-0 text-xs text-slate-500"
            >
              {relativeTime}
            </time>
          </div>

          <div className="mt-2 flex items-center justify-between gap-2">
            <p className="line-clamp-1 min-w-0 flex-1 text-sm text-slate-600">
              {conversation.lastMessagePreview}
            </p>
            {conversation.unreadCount > 0 ? (
              <span className="shrink-0 rounded-full border border-brand-primary/40 bg-brand-primary/10 px-2 py-0.5 text-xs font-semibold text-brand-primary">
                {conversation.unreadCount}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </button>
  )
}

export const ConversationListItem = memo(ConversationListItemComponent)
