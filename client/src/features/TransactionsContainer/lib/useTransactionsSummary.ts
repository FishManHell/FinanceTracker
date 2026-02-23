import { computed, type ComputedRef, type Ref } from 'vue'
import { getSeverity, type SeverityValue } from '@/shared/lib/finance/getSeverity'
import type { Transactions } from '@/entities/transaction'

interface TransactionsSummary {
  totalIncomes: ComputedRef<number>
  totalExpenses: ComputedRef<number>
  balance: ComputedRef<number>
  incomesSeverity: ComputedRef<SeverityValue>
  expensesSeverity: ComputedRef<SeverityValue>
  balanceSeverity: ComputedRef<SeverityValue>
}

export function useTransactionsSummary(
  transactions: Ref<Transactions | undefined> | ComputedRef<Transactions | undefined>,
): TransactionsSummary {
  const totalIncomes = computed(() => {
    return (
      transactions.value
        ?.filter(({ type }) => type === 'income')
        .reduce((sum, { amount }) => sum + amount, 0) ?? 0
    )
  })

  const totalExpenses = computed(() => {
    return (
      transactions.value
        ?.filter(({ type }) => type === 'expense')
        .reduce((sum, { amount }) => sum + Math.abs(amount), 0) ?? 0
    )
  })

  const balance = computed(() => totalIncomes.value - totalExpenses.value)

  const balanceSeverity = computed(() => {
    return getSeverity('balance', balance.value)
  })

  const incomesSeverity = computed(() => {
    return getSeverity('income', totalIncomes.value)
  })

  const expensesSeverity = computed(() => {
    return getSeverity('expense', totalExpenses.value)
  })

  return {
    totalIncomes,
    totalExpenses,
    balance,
    balanceSeverity,
    incomesSeverity,
    expensesSeverity,
  }
}
