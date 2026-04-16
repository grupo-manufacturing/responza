import type { ID, Timestamps } from '@/types/common.types'

export type UserRole = 'admin' | 'sales' | 'viewer'

export interface User extends Timestamps {
  id: ID
  email: string
  name: string
  role: UserRole
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthState {
  currentUser: User | null
  isAuthenticated: boolean
}

export interface LoginFormState {
  email: string
  password: string
  error: string | null
  isLoading: boolean
}

export type CreateUserPayload = Omit<User, 'id' | 'createdAt' | 'updatedAt'>

export type UpdateUserPayload = Partial<CreateUserPayload>
