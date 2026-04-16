import type { ID } from '@/types/common.types'

export interface IStorageService {
  init(): void

  /** Read with optional artificial delay (see `app.config.ts`). */
  getAll<T>(key: string): Promise<T[]>

  /** Read with optional artificial delay (see `app.config.ts`). */
  getById<T extends { id: ID }>(key: string, id: ID): Promise<T | null>

  /** Immediate read — no delay (writes and UI refresh after mutations). */
  snapshotAll<T>(key: string): T[]

  /** Immediate read — no delay. */
  snapshotById<T extends { id: ID }>(key: string, id: ID): T | null

  create<T extends { id: ID }>(key: string, item: T): T

  update<T extends { id: ID }>(
    key: string,
    id: ID,
    payload: Partial<T>,
  ): T

  remove(key: string, id: ID): void
}
