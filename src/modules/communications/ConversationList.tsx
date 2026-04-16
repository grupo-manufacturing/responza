import type { ReactElement } from 'react'
import { memo } from 'react'

import { EmptyState } from '@/components/ui/EmptyState'
import { ConversationListItem } from '@/modules/communications/ConversationListItem'
import type { ID } from '@/types/common.types'
import type { Conversation } from '@/types/communication.types'

export interface ConversationListProps {
  conversations: Conversation[]
  activeConversationId: ID | null
  onSelect: (id: ID) => void
}

function ConversationListComponent({
  conversations,
  activeConversationId,
  onSelect,
}: ConversationListProps): ReactElement {
  if (conversations.length === 0) {
    return (
      <EmptyState
        compact
        title="No conversations found"
        description="Try changing your filters or connect another platform."
      />
    )
  }

  return (
    <div className="scrollbar-none h-full min-h-0 w-full overflow-y-auto pr-1">
      <div className="flex min-h-full flex-col gap-2">
      {conversations.map((conversation) => (
        <ConversationListItem
          key={conversation.id}
          conversation={conversation}
          isActive={conversation.id === activeConversationId}
          onClick={onSelect}
        />
      ))}
      </div>
    </div>
  )
}

export const ConversationList = memo(ConversationListComponent)
