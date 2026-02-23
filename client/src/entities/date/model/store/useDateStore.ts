import { defineStore } from 'pinia'
import type { MonthKey, UseDateStoreState } from '../types.ts'

export const useDateStore = defineStore('dateStore', {
  state: (): UseDateStoreState => ({
    months: {
      budget: {
        month: new Date().getMonth() + 1,
        touched: false,
      },
      transactions: {
        month: new Date().getMonth() + 1,
        touched: false,
      },
    },
  }),

  actions: {
    setMonth(key: MonthKey, month: number) {
      this.months[key].month = month
      this.months[key].touched = true
    },
  },
})
