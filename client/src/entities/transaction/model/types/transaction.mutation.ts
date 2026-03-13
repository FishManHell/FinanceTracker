import type { TransactionsDTO } from './transaction.dto'

export interface DeleteTransactionResponse {
  deleteTransaction: boolean
}

export interface GetTransactionsParams {
  year: number
  month: number
}

export interface GetTransactionsResponse {
  transactions: TransactionsDTO
}
