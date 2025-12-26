import { defineStore } from 'pinia'
import type { Transactions } from '../types/transaction.type.ts'

export const useTransactionStore = defineStore(
  'transaction',
  {
    state: (): {transactions: Transactions} => ({
      transactions: []
    }),

    actions: {
      setTransactions(transactions: Transactions) {
        this.transactions = transactions
      }
    }
  }
)
