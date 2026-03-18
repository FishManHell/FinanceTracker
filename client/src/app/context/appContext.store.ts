import { defineStore } from 'pinia'
import { CURRENCIES, type Currency } from '@/shared/types'

export type DatePickerModelValue = Date | Date[] | (Date | null)[] | null | undefined

export const useAppContextStore = defineStore('app', {
  state: (): { date: Date; currency: Currency } => ({
    date: new Date(),
    currency: CURRENCIES.USD,
  }),

  actions: {
    setDate(value: DatePickerModelValue) {
      if (!(value instanceof Date)) return

      this.date = new Date(value)
    },

    setCurrency(currency: Currency) {
      this.currency = currency
    },
  },
})
