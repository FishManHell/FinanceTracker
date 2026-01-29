<script setup lang="ts">
import cls from './BudgetManagementTable.module.scss'
import { Column, DataTable, DatePicker } from 'primevue'
import {
  useEditBudget,
  useGetBudgets,
  type BaseBudgetWIthId,
  useDeleteBudget,
} from '@/entities/budget'
import { computed, ref } from 'vue'
import { DisplayCell } from '@/shared/ui/DisplayCell'
import { EditNumberCell } from '@/shared/ui/EditNumberCell'
import { EditSelectCell } from '@/shared/ui/EditSelectCell'
import { useQueryClient } from '@tanstack/vue-query'
import { formatYearMonth } from '@/helpers/date.ts'
import { createSkeletonBudgets } from '@/helpers/skeleton.ts'
import { useConfirmActions } from '@/shared/lib/hooks'
import BudgetActionsCell from './BudgetActionsCell.vue'

interface BudgetWithDate extends BaseBudgetWIthId {
  date: Date
}

const { data, isFetching } = useGetBudgets()
const { mutate: onMutateEditBudget } = useEditBudget()
const { mutate: onMutateDeleteBudget } = useDeleteBudget()
const { confirmDeleteBudget, confirmSaveChanges } = useConfirmActions()

const queryClient = useQueryClient()
const editingRows = ref<BudgetWithDate[]>([])
const originalRow = ref<BudgetWithDate | null>(null)

const currencies = ['USD', 'EUR', 'ILS']

const isRowEditing = (id: string) => editingRows.value.some((r) => r.id === id)

const budgets = computed(() => {
  if (isFetching.value && (!data.value || data.value.length === 0)) {
    return createSkeletonBudgets(5)
  }
  return data.value
})

const cellLoading = computed(() => isFetching.value && (!data.value || data.value.length === 0))
const tableLoading = computed(() => isFetching.value && !!data.value && data.value.length > 0)

const onEditBudget = (updatedBudget: BudgetWithDate) => {
  const year = updatedBudget.date.getFullYear()
  const month = updatedBudget.date.getMonth() + 1
  onMutateEditBudget({
    id: updatedBudget.id,
    update: {
      currency: updatedBudget.currency,
      total: updatedBudget.total,
      year,
      month,
    },
  })
}

const onRowEditSave = (row: BudgetWithDate) => {
  if (!originalRow.value) return
  const isChanged = JSON.stringify(originalRow.value) !== JSON.stringify(row)
  if (!isChanged) {
    editingRows.value = []
    return
  }

  const year = row.date.getFullYear()
  const month = row.date.getMonth() + 1
  queryClient.setQueryData(['budgets'], (old: BudgetWithDate[]) => {
    return old.map((b) => (b.id === row.id ? { ...row, year, month } : b))
  })
  onEditBudget(row)
  editingRows.value = []
}

const onStartEdit = (row: BudgetWithDate) => {
  editingRows.value = [row]
  originalRow.value = JSON.parse(JSON.stringify(row))
}

const onCancelEdit = () => (editingRows.value = [])
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
  >
    <template #header>
      <h2>Budgets</h2>
    </template>
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
          @save="(row) => confirmSaveChanges(async () => onRowEditSave(row))"
          @delete="(id) => confirmDeleteBudget(async () => onMutateDeleteBudget(id))"
        />
      </template>
    </Column>
  </DataTable>
</template>
