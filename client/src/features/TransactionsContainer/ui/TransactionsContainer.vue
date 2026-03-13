<script setup lang="ts">
import { useDeleteTransaction, useGetTransactions, useSetTransaction } from '@/entities/transaction'
import type { TransactionDTO, TransactionBaseDTO } from '@/entities/transaction'
import { useAppContextStore } from '@/app'
import { useMonth } from '@/entities/date'
import { computed } from 'vue'
import { SectionCard } from '@/shared/ui/SectionCard'
import { TransactionsTable } from '@/widgets/TransactionsTable'
import { AddTransactionPanel } from '@/features/AddTransactionPanel'
import { useAppDialog, useTableLoading } from '@/shared/lib/hooks'
import { TransactionForm } from '@/shared/ui/TransactionForm'
import { MonthPickerField } from '@/features/MonthPickerField'

const appStore = useAppContextStore()
const year = computed(() => appStore.date.getFullYear())
const month = useMonth('transactions', year)
const { openFormDialog } = useAppDialog()
const { data, isLoading, isFetching } = useGetTransactions({ year, month })
const { mutate: onMutateSetTransaction, isPending: isAdding } = useSetTransaction()
const { mutate: onMutateDeleteTransaction, isPending: isDeleting } = useDeleteTransaction()

const actionLoading = computed(() => isAdding.value || isDeleting.value)

const { cellLoading, tableLoading } = useTableLoading<TransactionDTO>({
  data,
  isFetching,
  isLoading,
  actionLoading,
})

const onSetTransaction = (transaction: TransactionBaseDTO) => onMutateSetTransaction(transaction)
const onDeleteTransaction = (id: string) => onMutateDeleteTransaction(id)

const openTransactionDialog = () => {
  openFormDialog(TransactionForm, 'Add Transaction', {
    onSubmit: onSetTransaction,
    initialData: null,
    mode: 'add',
  })
}
</script>

<template>
  <AddTransactionPanel :transactions="data" :isFetching="isFetching" />
  <SectionCard
    title="Transactions"
    buttonLabel="New"
    buttonIcon="pi pi-plus"
    :onButtonClick="openTransactionDialog"
  >
    <template #toolbar-end>
      <MonthPickerField monthKey="transactions" :year="year" containerClass="monthly_picker" />
    </template>
    <TransactionsTable
      :data="data ?? []"
      :loading="tableLoading"
      :is-skeleton="cellLoading"
      :on-delete="onDeleteTransaction"
    />
  </SectionCard>
</template>
