export type WaitlistSource = 'hero' | 'footer'

export async function submitWaitlistEmail(
  email: string,
  source: WaitlistSource,
): Promise<void> {
  const res = await fetch('/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, source }),
  })

  const data: unknown = await res.json().catch(() => ({}))
  const err =
    data &&
    typeof data === 'object' &&
    'error' in data &&
    typeof (data as { error: unknown }).error === 'string'
      ? (data as { error: string }).error
      : 'Could not sign up. Please try again.'

  if (!res.ok) {
    throw new Error(err)
  }
}
