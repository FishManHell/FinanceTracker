import { defineStore } from 'pinia';
import type { BudgetState } from '../type/budget.type.ts'

export type DatePickerModelValue = Date | Date[] | (Date | null)[] | null | undefined

export const useBudgetStore = defineStore('budget', {
  state: (): BudgetState => ({
    currency: 'USD',
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  }),

  actions: {
    setMonth(value: DatePickerModelValue) {
      if (value instanceof Date) {
        this.month = value.getMonth()
      }
    },
    setYear(value: DatePickerModelValue) {
      if (value instanceof Date) {
        this.year = value.getFullYear()
      }
    },

    setCurrency(currency: string) {
      this.currency = currency
    },
  },
})
