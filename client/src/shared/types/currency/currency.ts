export const CURRENCIES = {
  USD: 'USD',
  EUR: 'EUR',
  ILS: 'ILS',
} as const

export type Currency = (typeof CURRENCIES)[keyof typeof CURRENCIES]
