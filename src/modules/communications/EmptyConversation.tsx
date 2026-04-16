import type { ReactElement } from 'react'
import { memo } from 'react'
import { MessageCircleMore } from 'lucide-react'

function EmptyConversationComponent(): ReactElement {
  return (
    <div className="flex h-full min-h-0 w-full flex-1 items-center justify-center rounded-lg border border-dashed border-border-muted bg-surface-lightTint p-8">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg border border-border-muted bg-surface-secondary text-slate-600">
          <MessageCircleMore className="h-7 w-7" aria-hidden />
        </div>
        <p className="type-feature text-text-primary">
          Select a conversation to start messaging
        </p>
      </div>
    </div>
  )
}

export const EmptyConversation = memo(EmptyConversationComponent)
