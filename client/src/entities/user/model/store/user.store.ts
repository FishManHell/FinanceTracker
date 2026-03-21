import { defineStore } from 'pinia'
import type { UserDTO } from '@/shared/types'
import type { UserState } from '../types/storeTypes.ts'

export const userStore = defineStore('user', {
  state: (): UserState => ({
    user: null,
  }),
  actions: {
    setUser(user: UserDTO) {
      this.user = user
    },
    clearUser() {
      this.user = null
    },
  },
})
