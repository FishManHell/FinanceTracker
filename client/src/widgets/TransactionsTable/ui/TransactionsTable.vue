<script setup lang="ts">
import cls from './TransactionsTable.module.scss'
import { Column, DataTable, Tag } from 'primevue'
import { type Transactions } from '@/entities/transaction'
import { computed } from 'vue'
import { TableCell } from '@/shared/ui/TableCell'

const props = defineProps<{
  transactions: Transactions | undefined
  isLoading: boolean
}>()

const transactionsList = computed(() => {
  if (!props.transactions && props.isLoading) {
    return Array.from({ length: 10 }).map((_, i) => ({
      id: i.toString(),
      __skeleton: true,
    }))
  }

  return props.transactions ?? []
})
</script>

<template>
  <DataTable
    :value="transactionsList"
    scrollable
    scrollHeight="flex"
    :class="cls.transaction_table"
  >
    <template #empty>
      <h1 :class="cls.empty_block">No transactions found</h1>
    </template>

    <Column header="Type">
      <template #body="{ data }">
        <TableCell :loading="isLoading">
          <Tag :value="data.type" :severity="data.type === 'income' ? 'success' : 'danger'" />
        </TableCell>
      </template>
    </Column>
    <Column header="Account" style="width: 25%">
      <template #body="{ data }">
        <TableCell :loading="isLoading">
          {{ data.account.type.charAt(0).toUpperCase() + data.account.type.slice(1) }}
          -
          {{ data.account.description }}
        </TableCell>
      </template>
    </Column>
    <Column field="category" header="Category" style="width: 25%">
      <template #body="{ data }">
        <TableCell :loading="isLoading">
          {{ data.category }}
        </TableCell>
      </template>
    </Column>
    <Column field="date" header="Date">
      <template #body="{ data }">
        <TableCell :loading="isLoading">
          {{ new Date(data.date).toLocaleDateString() }}
        </TableCell>
      </template>
    </Column>
    <Column field="amount" header="Amount">
      <template #body="{ data }">
        <TableCell :loading="isLoading">
          <Tag :value="data.amount" :severity="data.amount > 0 ? 'success' : 'danger'" />
        </TableCell>
      </template>
    </Column>
    <Column field="currency" header="Currency">
      <template #body="{ data }">
        <TableCell :loading="isLoading">
          {{ data.currency }}
        </TableCell>
      </template>
    </Column>
  </DataTable>
</template>
