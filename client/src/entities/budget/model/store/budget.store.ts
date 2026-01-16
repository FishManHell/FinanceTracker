import { defineStore } from 'pinia';
import type { BudgetState } from '../type/budget.type.ts'

export type DatePickerModelValue = Date | Date[] | (Date | null)[] | null | undefined

export const useBudgetStore = defineStore('budget', {
  state: (): BudgetState => ({
    currency: 'USD',
    date: new Date()
  }),

  actions: {
    setDate(value: DatePickerModelValue) {
      if (value instanceof Date) {
        this.date = value
      }
    },

    setCurrency(currency: string) {
      this.currency = currency
    },
  },
})
