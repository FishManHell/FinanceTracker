import { defineStore } from 'pinia';
import type { BudgetState } from '../type/budget.type.ts'

export type DatePickerModelValue = Date | Date[] | (Date | null)[] | null | undefined

export const useBudgetStore = defineStore('budget', {
  state: (): BudgetState => ({
    date: new Date(),
    currency: 'USD',
  }),

  actions: {
    setDate(newDate: DatePickerModelValue) {
      this.date = newDate
    },
    setCurrency(currency: string) {
      this.currency = currency
    },
  },
})
