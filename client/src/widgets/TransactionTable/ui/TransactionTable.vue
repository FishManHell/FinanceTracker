<script setup lang="ts">
import cls from './TransactionTable.module.scss'
import { Column, DataTable, Tag } from 'primevue'
import { useTransactionStore } from '@/entities/transaction'
import { computed } from 'vue'
import { TableCell } from '@/shared/ui/TableCell'

const transactionStore = useTransactionStore()

const transactions = computed(() => {
  if (!transactionStore.transactions.length && loading.value) {
    return Array.from({ length: 10 }).map((_, i) => ({
      id: i.toString(),
      __skeleton: true,
    }))
  }

  return transactionStore.transactions
})

const loading = computed(() => transactionStore.isLoading);

</script>

<template>
  <div :class="cls.transaction_table_container">
    <DataTable
      showGridlines
      stripedRows
      :value="transactions"
      scrollable
      scrollHeight="flex"
      :class="cls.transaction_table"
    >
      <Column header="Type">
        <template #body="{ data }">
          <TableCell :loading="loading">
            <Tag :value="data.type" :severity="data.type === 'income' ? 'success' : 'danger'" />
          </TableCell>
        </template>
      </Column>
      <Column header="Account" style="width: 25%">
        <template #body="{ data }">
          <TableCell :loading="loading">
            {{ data.account.type.charAt(0).toUpperCase() + data.account.type.slice(1) }}
            -
            {{ data.account.description }}
          </TableCell>
        </template>
      </Column>
      <Column field="category" header="Category" style="width: 25%">
        <template #body="{ data }">
          <TableCell :loading="loading">
            {{ data.category }}
          </TableCell>
        </template>
      </Column>
      <Column field="date" header="Date">
        <template #body="{ data }">
          <TableCell :loading="loading">
            {{ new Date(data.date).toLocaleDateString() }}
          </TableCell>
        </template>
      </Column>
      <Column field="amount" header="Amount">
        <template #body="{ data }">
          <TableCell :loading="loading">
            <Tag :value="data.amount" :severity="data.amount > 0 ? 'success' : 'danger'" />
          </TableCell>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
