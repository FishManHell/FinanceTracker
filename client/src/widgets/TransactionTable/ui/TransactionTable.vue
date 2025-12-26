<script setup lang="ts">
import { Column, DataTable, Tag } from 'primevue'
import { useTransactionStore } from '@/entities/transaction'

const transactionStore = useTransactionStore()
</script>

<template>
  <div class="card">
      <DataTable
        showGridlines
        stripedRows
        :value="transactionStore.transactions"
        scrollable
        scrollHeight="flex"
        tableStyle="min-width: 50rem"
      >
        <Column header="Type">
          <template #body="{ data }">
            <Tag :value="data.type" :severity="data.type === 'income' ? 'success' : 'danger'" />
          </template>
        </Column>
        <Column header="Account" style="width: 25%">
          <template #body="{ data }">
            {{ data.account.type.charAt(0).toUpperCase() + data.account.type.slice(1) }}
            -
            {{ data.account.description }}
          </template>
        </Column>
        <Column field="category" header="Category" style="width: 25%" />
        <Column field="date" header="Date">
          <template #body="{ data }">
            {{ new Date(data.date).toLocaleDateString() }}
          </template>
        </Column>
        <Column field="amount" header="Amount">
          <template #body="{ data }">
            <Tag :value="data.amount" :severity="data.amount > 0 ? 'success' : 'danger'" />
          </template>
        </Column>
      </DataTable>
  </div>
</template>
