import { appConfig } from '@/config/app.config'
import { STORAGE_KEYS } from '@/config/storage-keys'
import type { IAuthService } from '@/interfaces/IAuthService'
import type { IStorageService } from '@/interfaces/IStorageService'
import type {
  LoginCredentials,
  UpdateUserPayload,
  User,
} from '@/types/auth.types'
import type { ID } from '@/types/common.types'

export class AuthError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthError'
  }
}

interface SessionPayload {
  readonly userId: ID
}

function readSessionUserId(): ID | null {
  if (typeof localStorage === 'undefined') {
    return null
  }
  const raw = localStorage.getItem(STORAGE_KEYS.session)
  if (raw === null) {
    return null
  }
  const parsed: unknown = JSON.parse(raw)
  if (parsed === null || typeof parsed !== 'object' || !('userId' in parsed)) {
    return null
  }
  const userId = (parsed as SessionPayload).userId
  if (typeof userId !== 'string') {
    return null
  }
  return userId
}

function writeSession(userId: ID): void {
  if (typeof localStorage === 'undefined') {
    return
  }
  const payload: SessionPayload = { userId }
  localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(payload))
}

function clearSession(): void {
  if (typeof localStorage === 'undefined') {
    return
  }
  localStorage.removeItem(STORAGE_KEYS.session)
}

export class AuthService implements IAuthService {
  private readonly storage: IStorageService

  constructor(storage: IStorageService) {
    this.storage = storage
  }

  async login(credentials: LoginCredentials): Promise<void> {
    await Promise.resolve()
    const { email, password } = appConfig.mockCredentials
    if (
      credentials.email !== email ||
      credentials.password !== password
    ) {
      throw new AuthError('Invalid email or password.')
    }
    const users = await this.storage.getAll<User>(STORAGE_KEYS.users)
    const user = users.find((row) => row.email === credentials.email)
    if (user === undefined) {
      throw new AuthError('No user matches the configured mock credentials.')
    }
    writeSession(user.id)
  }

  logout(): void {
    clearSession()
  }

  getCurrentUser(): User | null {
    const userId = readSessionUserId()
    if (userId === null) {
      return null
    }
    return this.storage.snapshotById<User>(STORAGE_KEYS.users, userId)
  }

  updateUser(id: ID, payload: UpdateUserPayload): User {
    return this.storage.update<User>(STORAGE_KEYS.users, id, payload)
  }
}
