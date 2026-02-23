export const MONTH_KEYS = {
  budget: 'budget',
  transactions: 'transactions',
} as const

export type MonthKey = keyof typeof MONTH_KEYS

export interface MonthState {
  month: number
  touched: boolean
}

export interface UseDateStoreState {
  months: Record<MonthKey, MonthState>
}
