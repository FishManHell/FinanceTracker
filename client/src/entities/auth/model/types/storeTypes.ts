import type { UserDTO } from '@/shared/types'

export interface RefreshResponse {
  refresh: UserDTO
}

export interface SessionState {
  isAuthenticated: boolean;
  error: string
}
