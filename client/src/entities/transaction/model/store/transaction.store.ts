import { defineStore } from 'pinia'
import type { TransactionsDTO } from '../types/transaction.dto.ts'

interface UseTransactionStoreState {
  transactions: TransactionsDTO
  isLoading: boolean
}

export const useTransactionStore = defineStore('transaction', {
  state: (): UseTransactionStoreState => ({
    transactions: [],
    isLoading: true,
  }),

  actions: {
    setTransactions(transactions: TransactionsDTO) {
      this.transactions = transactions
    },
    setLoading(isLoading: boolean) {
      this.isLoading = isLoading
    },
  },
})
