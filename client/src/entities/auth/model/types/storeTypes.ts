import type {User} from "@/shared/types"

export interface RefreshResponse {
  refresh: User;
}

export interface SessionState {
  isAuthenticated: boolean;
  error: string
}
