<script setup lang="ts">
import cls from './TransactionsTable.module.scss'
import { Button, Column, DataTable } from 'primevue'
import type { TransactionDTO, TransactionsDTO } from '@/entities/transaction'
import { transactionColumns } from '@/entities/transaction'
import { CellRenderer } from '@/shared/ui/CellRenderer'
import { computed } from 'vue'
import { resolveRowsWithSkeleton } from '@/shared/lib/table'
import { useConfirmActions } from '@/shared/lib/hooks'
import { TableCell } from '@/shared/ui/TableCell'

const props = defineProps<{
  data: TransactionsDTO
  loading?: boolean
  isSkeleton?: boolean
  onDelete: (id: string) => void
}>()

const { confirmDelete } = useConfirmActions()

const onDeleteHandler = (id: string) => confirmDelete(async () => props.onDelete(id))

const asTransactionRow = (row: TransactionDTO) => row

const transactions = computed(() => {
  return resolveRowsWithSkeleton(props.data, props.isSkeleton, 5)
})
</script>

<template>
  <DataTable
    :value="transactions"
    scrollable
    scrollHeight="flex"
    :class="cls.transaction_table"
    :loading="loading"
  >
    <template #empty>
      <h1 :class="cls.empty_block">No transactions found</h1>
    </template>
    <Column
      v-for="col in transactionColumns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
    >
      <template #body="{ data }">
        <CellRenderer :row="asTransactionRow(data)" :col="col" :loading="props.isSkeleton" />
      </template>
    </Column>
    <Column header="Actions">
      <template #body="{ data }">
        <TableCell :loading="props.isSkeleton">
          <Button label="Delete" severity="danger" outlined @click="onDeleteHandler(data.id)" />
        </TableCell>
      </template>
    </Column>
  </DataTable>
</template>
