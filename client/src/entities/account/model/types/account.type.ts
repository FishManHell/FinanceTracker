import type { Currency } from '@/shared/types'

export interface Account {
  type: string
  amount: number
  currency: Currency
  description: string
}

export type Accounts = Account[]
