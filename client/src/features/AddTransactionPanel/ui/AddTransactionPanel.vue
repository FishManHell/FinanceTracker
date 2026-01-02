<script setup lang="ts">
import cls from './AddTransactionPanel.module.scss'
import { Button, Skeleton } from 'primevue'
import { TransactionForm } from '@/shared/ui/TransactionForm'
import {
  type TransactionWithoutType,
  useGetTransactions,
  useSetTransaction,
  useTransactionStore,
} from '@/entities/transaction'
import { useDialog } from 'primevue/usedialog'
import Tag from 'primevue/tag'
import { computed, watchEffect } from 'vue'

const dialog = useDialog()
const { mutate } = useSetTransaction()
const { data: transactions, isFetching } = useGetTransactions({ year: 2025, month: 12 })
const transactionStore = useTransactionStore()

const totalIncomes = computed(() => {
  if (!transactions.value) return 0
  return transactions.value
    .filter((transaction) => transaction.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0)
})

const totalExpenses = computed(() => {
  if (!transactions.value) return 0
  return transactions.value
    .filter((transaction) => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0)
})

const onSetTransaction = (transaction: TransactionWithoutType) => mutate(transaction)

function openTransactionDialog() {
  dialog.open(TransactionForm, {
    props: {
      header: 'Add Transaction',
      style: {
        width: '100%',
        maxWidth: '800px',
        textAlign: 'center',
      },
      modal: true,
    },
    data: {
      onSubmit: onSetTransaction,
      initialData: null,
      mode: 'add',
    },
  })
}

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
    <Tag severity="success" :class="cls.status" rounded>
      <Skeleton v-if="isFetching" width="15.5rem" height="3.5rem" />
      <span v-else>Incomes: {{ totalIncomes }}</span>
    </Tag>

    <Tag severity="danger" :class="cls.status" rounded>
      <Skeleton v-if="isFetching" width="15.5rem" height="3.5rem" />
      <span v-else>Expenses: {{ totalExpenses }}</span>
    </Tag>
    <Button label="Add Transaction" @click="openTransactionDialog" />
  </div>
</template>
