import type {
  LoginCredentials,
  UpdateUserPayload,
  User,
} from '@/types/auth.types'
import type { ID } from '@/types/common.types'

export interface IAuthService {
  login(credentials: LoginCredentials): Promise<void>

  logout(): void

  getCurrentUser(): User | null

  updateUser(id: ID, payload: UpdateUserPayload): User
}
