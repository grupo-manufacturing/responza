import { v4 as uuidv4 } from 'uuid'

import type { ID } from '@/types/common.types'

export function generateId(): ID {
  return uuidv4()
}
