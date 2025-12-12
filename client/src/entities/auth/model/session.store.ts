import { defineStore } from 'pinia'
import type { SessionState } from './types/storeTypes.ts'

export const sessionStore = defineStore("session", {
  state: (): SessionState => ({
    isAuthenticated: false,
    error: "",
  }),
  actions: {
    setAuthenticated(value: boolean) {
      this.isAuthenticated = value;
    },
    setError(message: string) {
      this.error = message;
    },
    logout() {
      console.log('LOGOUT');
      this.isAuthenticated = false;
    },
  },
});
