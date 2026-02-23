<script setup lang="ts">
import {
  type TransactionWithoutType,
  useGetTransactions,
  useSetTransaction,
} from '@/entities/transaction'
import { useAppContextStore } from '@/app'
import { useMonth } from '@/entities/date'
import { computed } from 'vue'
import { SectionCard } from '@/shared/ui/SectionCard'
import { TransactionsTable } from '@/widgets/TransactionsTable'
import { AddTransactionPanel } from '@/features/AddTransactionPanel'
import { useAppDialog } from '@/shared/lib/hooks'
import { TransactionForm } from '@/shared/ui/TransactionForm'
import { MonthPickerField } from '@/features/MonthPickerField'

const appStore = useAppContextStore()

const year = computed(() => appStore.date.getFullYear())
const month = useMonth('transactions', year)

const { openFormDialog } = useAppDialog()

const { data: transactions, isLoading, isFetching } = useGetTransactions({ year, month })

const { mutate } = useSetTransaction()

const onSetTransaction = (transaction: TransactionWithoutType) => mutate(transaction)

const openTransactionDialog = () => {
  openFormDialog(TransactionForm, 'Add Transaction', {
    onSubmit: onSetTransaction,
    initialData: null,
    mode: 'add',
  })
}
</script>

<template>
  <AddTransactionPanel :transactions="transactions" :isFetching="isFetching" />
  <SectionCard
    title="Transactions"
    buttonLabel="New"
    buttonIcon="pi pi-plus"
    :onButtonClick="openTransactionDialog"
  >
    <template #toolbar-end>
      <MonthPickerField
        monthKey="transactions"
        :year="year"
        containerClass="monthly_picker"
      />
    </template>
    <TransactionsTable :transactions="transactions" :isLoading="isLoading" />
  </SectionCard>
</template>
