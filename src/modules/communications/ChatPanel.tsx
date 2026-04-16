import type { ReactElement } from 'react'
import { memo, useEffect, useRef } from 'react'

import { EmptyConversation } from '@/modules/communications/EmptyConversation'
import { MessageBubble } from '@/modules/communications/MessageBubble'
import { ReplyComposer } from '@/modules/communications/ReplyComposer'
import { Button } from '@/components/ui/Button'
import type { ID } from '@/types/common.types'
import type { Conversation, Message } from '@/types/communication.types'

export interface ChatPanelProps {
  conversation: Conversation | null
  messages: Message[]
  onSend: (body: string) => void
  onViewLead: (leadId: ID) => void
}

function ChatPanelComponent({
  conversation,
  messages,
  onSend,
  onViewLead,
}: ChatPanelProps): ReactElement {
  const messagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Auto-scrolls to the latest message whenever a new message is added.
    if (messagesRef.current !== null) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages])

  if (conversation === null) {
    return <EmptyConversation />
  }

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-border-muted bg-surface-lightTint">
      <div className="shrink-0 flex items-center justify-between gap-3 border-b border-border-muted px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-text-primary">
            {conversation.contactName}
          </p>
          <p className="mt-1 text-xs text-slate-600">{conversation.contactHandle}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="type-small rounded-full border border-border-muted bg-surface-secondary px-2.5 py-1 uppercase tracking-wide text-slate-600">
            {conversation.platform}
          </span>
          <Button
            type="button"
            onClick={() => {
              onViewLead(conversation.leadId)
            }}
            variant="blueBordered"
            size="sm"
          >
            View Lead
          </Button>
        </div>
      </div>

      <div ref={messagesRef} className="scrollbar-none min-h-0 flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        </div>
      </div>

      <div className="shrink-0 border-t border-border-muted p-3">
        <ReplyComposer onSend={onSend} isDisabled={conversation === null} />
      </div>
    </div>
  )
}

export const ChatPanel = memo(ChatPanelComponent)
