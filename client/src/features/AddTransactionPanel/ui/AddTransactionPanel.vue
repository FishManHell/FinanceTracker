<script setup lang="ts">
import cls from './AddTransactionPanel.module.scss'
import { StatusTag } from '@/shared/ui/StatusTag'
import type { Transactions } from '@/entities/transaction'
import { useTransactionsSummary } from '@/features/TransactionsContainer'
import { computed } from 'vue'

const props = defineProps<{
  transactions: Transactions | undefined
  isFetching: boolean
}>()

const transactionsRef = computed(() => props.transactions)

const {
  balance,
  balanceSeverity,
  incomesSeverity,
  expensesSeverity,
  totalIncomes,
  totalExpenses
} = useTransactionsSummary(transactionsRef)
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
