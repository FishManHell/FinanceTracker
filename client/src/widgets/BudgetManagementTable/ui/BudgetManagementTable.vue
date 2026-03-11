<script setup lang="ts">
import cls from './BudgetManagementTable.module.scss'
import { Column, DataTable, DatePicker } from 'primevue'
import { computed } from 'vue'
import { type BudgetUI, useDeleteBudget } from '@/entities/budget'
import { useEditBudget, useGetBudgets } from '@/entities/budget'
import { DisplayCell } from '@/shared/ui/DisplayCell'
import { EditNumberCell } from '@/shared/ui/EditNumberCell'
import { EditSelectCell } from '@/shared/ui/EditSelectCell'
import { TableEditorActions } from '@/shared/ui/TableEditorActions'
import { formatYearMonth } from '@/helpers/date.ts'
import { createSkeletonBudgets } from '@/helpers/skeleton.ts'
import { type OnSavePayload, useEditableTable } from '@/features/table-editor'
import { useConfirmActions } from '@/shared/lib/hooks'

const { data, isFetching } = useGetBudgets()
const { mutate: onMutateEditBudget } = useEditBudget()
const { mutate: onMutateDeleteBudget } = useDeleteBudget()
const { confirmDelete, confirmSave } = useConfirmActions()

const {
  editingRows,
  saveRow,
  isRowEditing,
  cancelEdit,
  startEdit
} = useEditableTable<BudgetUI>({ data, validators: {}, onSave})

const currencies = ['USD', 'EUR', 'ILS']

function onSave({ id, update }: OnSavePayload<BudgetUI>) {
  onMutateEditBudget({ id, update })
}

const onSaveHandler = (row: BudgetUI) => {
  confirmSave(async () => {
    saveRow(row)
    editingRows.value = []
  })
}

const onDelete = (id: string) => confirmDelete(async () => onMutateDeleteBudget(id))

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
        <TableEditorActions
          :row="data"
          :is-editing="isRowEditing(data.id)"
          :loading="cellLoading"
          @edit="startEdit"
          @cancel="cancelEdit"
          @save="onSaveHandler"
          @delete="onDelete"
        />
      </template>
    </Column>
  </DataTable>
</template>
