import { defineStore } from 'pinia'
import type { Transactions } from '../types/transaction.type.ts'

interface UseTransactionStoreState {
  transactions: Transactions
  isLoading: boolean
}

export const useTransactionStore = defineStore('transaction', {
  state: (): UseTransactionStoreState => ({
    transactions: [],
    isLoading: true,
  }),

  actions: {
    setTransactions(transactions: Transactions) {
      this.transactions = transactions
    },
    setLoading(isLoading: boolean) {
      this.isLoading = isLoading
    },
  },
})
