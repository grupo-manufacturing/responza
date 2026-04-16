export function isRequiredField(value: string): boolean {
  return value.trim().length > 0
}

export function isValidEmail(value: string): boolean {
  const trimmed = value.trim()
  if (trimmed === '') {
    return false
  }
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
}
