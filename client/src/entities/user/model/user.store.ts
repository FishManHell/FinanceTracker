import { defineStore } from 'pinia'
import type { User } from '@/shared/types'
import type { UserState } from '@/entities/user/model/storeTypes.ts'

export const userStore = defineStore("user", {
  state: (): UserState => ({
    user: null,
  }),
  actions: {
    setUser(user: User) {
      this.user = user;
    },
    clearUser() {
      console.log('CLEAR USER')
      this.user = null;
    },
  },
})
