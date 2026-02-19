<script setup lang="ts">
import cls from './AddTransactionPanel.module.scss'
import {
  useGetTransactions,
  useTransactionStore,
} from '@/entities/transaction'
import { computed, watchEffect } from 'vue'
import { useAppContextStore } from '@/app'
import { StatusTag } from '@/shared/ui/StatusTag'
import { getSeverity } from '@/shared/lib/finance/getSeverity'

const appStore = useAppContextStore()

const year = computed(() => appStore.date.getFullYear())
const month = computed(() => appStore.date.getMonth() + 1)

const { data: transactions, isFetching } = useGetTransactions({ year, month })
const transactionStore = useTransactionStore()

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

const balanceSeverity = computed(() => getSeverity('balance', balance.value))
const incomesSeverity = computed(() => getSeverity('income', totalIncomes.value))
const expensesSeverity = computed(() => getSeverity('expense', totalExpenses.value))

watchEffect(() => {
  if (transactions.value) {
    transactionStore.setTransactions(transactions.value)
  }
})

watchEffect(() => {
  transactionStore.setLoading(isFetching.value)
})
</script>

<template>
  <div :class="cls.add_transaction_panel_container">
    <StatusTag
      width="10rem"
      :severity="balanceSeverity"
      :class="cls.status"
      :loading="isFetching"
      label="Balance"
      :value="balance"
    />
    <StatusTag
      width="15.5rem"
      :severity="incomesSeverity"
      :class="cls.status"
      :loading="isFetching"
      label="Incomes"
      :value="totalIncomes"
    />
    <StatusTag
      width="15.5rem"
      :severity="expensesSeverity"
      :class="cls.status"
      :loading="isFetching"
      label="Expenses"
      :value="totalExpenses"
    />
  </div>
</template>
