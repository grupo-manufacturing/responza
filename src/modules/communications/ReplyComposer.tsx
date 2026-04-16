import type { KeyboardEvent, ReactElement } from 'react'
import { memo, useCallback, useMemo, useState } from 'react'
import { SendHorizontal } from 'lucide-react'

export interface ReplyComposerProps {
  onSend: (body: string) => void
  isDisabled: boolean
}

function ReplyComposerComponent({
  onSend,
  isDisabled,
}: ReplyComposerProps): ReactElement {
  const [body, setBody] = useState<string>('')

  const canSend = useMemo((): boolean => {
    return body.trim() !== '' && !isDisabled
  }, [body, isDisabled])

  const handleSend = useCallback((): void => {
    if (!canSend) {
      return
    }
    onSend(body)
    setBody('')
  }, [body, canSend, onSend])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>): void => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
        event.preventDefault()
        handleSend()
      }
    },
    [handleSend],
  )

  return (
    <div className="relative">
      <label htmlFor="reply-composer-textarea" className="sr-only">
        Message
      </label>
      <textarea
        id="reply-composer-textarea"
        value={body}
        onChange={(event) => {
          setBody(event.target.value)
        }}
        onKeyDown={handleKeyDown}
        disabled={isDisabled}
        placeholder="Type your reply..."
        rows={1}
        className="scrollbar-none w-full resize-none rounded-mdToken border border-border-muted bg-surface-base px-3 py-2.5 pr-14 text-sm text-text-primary outline-none transition placeholder:text-slate-500 focus-visible:border-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary disabled:cursor-not-allowed disabled:opacity-60"
      />
      <button
        type="button"
        onClick={handleSend}
        disabled={!canSend}
        className="absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-mdToken text-slate-500 transition hover:text-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Send message"
      >
        <SendHorizontal className="h-4 w-4" aria-hidden />
      </button>
    </div>
  )
}

export const ReplyComposer = memo(ReplyComposerComponent)
