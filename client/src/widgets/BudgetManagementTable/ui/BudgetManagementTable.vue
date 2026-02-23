<script setup lang="ts">
import cls from './BudgetManagementTable.module.scss'
import { Column, DataTable, DatePicker } from 'primevue'
import { useGetBudgets } from '@/entities/budget'
import { computed } from 'vue'
import { DisplayCell } from '@/shared/ui/DisplayCell'
import { EditNumberCell } from '@/shared/ui/EditNumberCell'
import { EditSelectCell } from '@/shared/ui/EditSelectCell'
import { formatYearMonth } from '@/helpers/date.ts'
import { createSkeletonBudgets } from '@/helpers/skeleton.ts'
import BudgetActionsCell from './BudgetActionsCell.vue'
import { useEditBudgetManagement } from '@/features/budget-management'

const { data, isFetching } = useGetBudgets()
const { onDelete, onSave, onStartEdit, onCancelEdit, editingRows, isRowEditing } =
  useEditBudgetManagement()

const currencies = ['USD', 'EUR', 'ILS']

const budgets = computed(() => {
  if (isFetching.value && (!data.value || data.value.length === 0)) {
    return createSkeletonBudgets(5)
  }
  return data.value
})

const cellLoading = computed(() => {
  return isFetching.value && (!data.value || data.value.length === 0)
})
const tableLoading = computed(() => {
  return isFetching.value && !!data.value && data.value.length > 0
})
</script>

<template>
  <DataTable
    v-model:editingRows="editingRows"
    :value="budgets"
    scrollable
    scrollHeight="flex"
    :loading="tableLoading"
    editMode="row"
    dataKey="id"
    :class="cls.budget_table"
  >
    <template #empty>
      <h1 :class="cls.empty_block">No budgets found</h1>
    </template>
    <Column field="date" header="Date">
      <template #body="{ data }">
        <DisplayCell :loading="cellLoading" :value="formatYearMonth(data.date)" />
      </template>

      <template #editor="{ data, field }">
        <DatePicker v-model="data[field]" view="month" dateFormat="yy-mm " fluid />
      </template>
    </Column>
    <Column field="total" header="Total">
      <template #body="{ data }">
        <DisplayCell :loading="cellLoading" :value="data.total" />
      </template>
      <template #editor="{ data, field }">
        <EditNumberCell v-model="data[field]" />
      </template>
    </Column>
    <Column field="currency" header="Currency">
      <template #body="{ data }">
        <DisplayCell :loading="cellLoading" :value="data.currency" />
      </template>
      <template #editor="{ data, field }">
        <EditSelectCell v-model="data[field]" :options="currencies" />
      </template>
    </Column>
    <Column header="Actions">
      <template #body="{ data }">
        <BudgetActionsCell
          :row="data"
          :is-editing="isRowEditing(data.id)"
          :loading="cellLoading"
          @edit="onStartEdit"
          @cancel="onCancelEdit"
          @save="onSave"
          @delete="onDelete"
        />
      </template>
    </Column>
  </DataTable>
</template>
