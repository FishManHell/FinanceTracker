import { defineStore } from 'pinia';
import { apolloClient } from '@/shared/api/apollo.ts'
import { REFRESH_QUERY } from './graphql/Refresh.ts'
import type { AuthState, RefreshResponse } from './types/authStore.ts'
import type { User } from '@/shared/types'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: false,
    user: null,
    error: '',
  }),
  actions: {
    setError(message: string) {
      this.error = message;
    },
    setUser(user: User) {
      this.user = user;
      this.isAuthenticated = true;
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
    },
    async restoreSession() {
      try {
        const { data } = await apolloClient.query<RefreshResponse>({
          query: REFRESH_QUERY,
          fetchPolicy: "network-only"
        });
        if (data?.refresh) {
          this.user = data.refresh;
          this.isAuthenticated = true;
        } else {
          this.user = null;
          this.isAuthenticated = false;
        }
      } catch {
        this.user = null;
        this.isAuthenticated = false;
      }
    },
  },
});
