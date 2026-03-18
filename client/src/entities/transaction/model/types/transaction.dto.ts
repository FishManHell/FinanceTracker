import type { Currency } from '@/shared/types'

export interface AccountDTO {
  type: string
  description: string
}

export interface TransactionDTO {
  date: Date
  amount: number
  category: string
  type: string
  currency: Currency
  description: string
  account: AccountDTO
}

export interface TransactionMonthlyDTO {
  month: number
  total: number
  currency: Currency
}

export type TransactionBaseDTO = Omit<TransactionDTO, 'type'>

export type TransactionsDTO = TransactionDTO[]

export type TransactionsMonthlyDTO = TransactionMonthlyDTO[]
