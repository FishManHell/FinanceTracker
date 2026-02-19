import { defineStore } from 'pinia'

export type DatePickerModelValue = Date | Date[] | (Date | null)[] | null | undefined

export const useAppContextStore = defineStore("app", {
  state: () => ({
    date: new Date(),
    currency: 'USD',
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
