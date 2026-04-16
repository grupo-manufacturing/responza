import type { LoginCredentials } from '@/types/auth.types'

export interface AppConfig {
  name: string
  version: string
  mockCredentials: LoginCredentials
  /** Artificial delay (ms) applied to `IStorageService` read APIs. Set to 0 to disable. */
  storageReadDelayMs: number
}

export const appConfig: AppConfig = {
  name: 'Responza',
  version: '0.1.0',
  mockCredentials: {
    email: 'demo@factoriz.local',
    password: 'demo-password',
  },
  storageReadDelayMs: 450,
}
