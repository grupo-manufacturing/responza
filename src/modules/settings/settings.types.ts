export interface ProfileFormState {
  name: string
  email: string
}

export interface PasswordFormState {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export const PASSWORD_MIN_LENGTH = 8
