import type {User} from "@/shared/types"

export interface RefreshResponse {
  refresh: User;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  error: string
}
