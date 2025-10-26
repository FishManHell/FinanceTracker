import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null as null | { id: string; name: string },
    token: '' as string,
    error: '' as string,
  }),
  actions: {
    setToken(token: string) {
      localStorage.setItem('token', token);
      this.token = token;
      this.isAuthenticated = true;
    },
    setError(message: string) {
      this.error = message;
    },
    logout() {
      this.user = null;
      this.token = '';
      this.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    restoreSession() {
      const token = localStorage.getItem('token');
      if (token) {
        this.token = token;
        this.isAuthenticated = true;
      }
    },
  },
});
