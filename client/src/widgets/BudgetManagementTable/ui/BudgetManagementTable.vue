<script setup lang="ts">
import cls from './BudgetManagementTable.module.scss'
import { Column, DataTable } from 'primevue'
import { computed } from 'vue'
import { type BudgetUI, useDeleteBudget } from '@/entities/budget'
import { useEditBudget, useGetBudgets, createBudgetColumns } from '@/entities/budget'
import { DisplayCell } from '@/shared/ui/DisplayCell'
import { TableEditorActions } from '@/shared/ui/TableEditorActions'
import { type OnSavePayload, useEditableTable } from '@/features/table-editor'
import { useConfirmActions, useTableLoading } from '@/shared/lib/hooks'
import {
  type ColumnConfig,
  getEditor,
  resolveRowsWithSkeleton,
  resolveValue,
} from '@/shared/lib/table'
import { useIsMutating } from '@tanstack/vue-query'

const creatingBudget = useIsMutating({ mutationKey: ['setBudget'] })
const { data, isFetching, isLoading } = useGetBudgets()
const { mutate: onMutateEditBudget, isPending: isEditing } = useEditBudget()
const { mutate: onMutateDeleteBudget, isPending: isDeleting } = useDeleteBudget()
const { confirmDelete, confirmSave } = useConfirmActions()

const { editingRows, saveRow, isRowEditing, cancelEdit, startEdit } = useEditableTable<BudgetUI>({
  data,
  validators: {},
  onSave,
})

const actionLoading = computed(
  () => isEditing.value || isDeleting.value || creatingBudget.value > 0,
)

const { cellLoading, tableLoading } = useTableLoading<BudgetUI>({
  data,
  isFetching,
  isLoading,
  actionLoading,
})

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

const resolveEditor = (col: ColumnConfig<BudgetUI>, row: BudgetUI) => getEditor(col, row)
const resolveBudgetValue = (col: ColumnConfig<BudgetUI>, row: BudgetUI) => resolveValue(col, row)

const budgets = computed(() => {
  return resolveRowsWithSkeleton(data.value, cellLoading.value, 5)
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

    <Column
      v-for="col in createBudgetColumns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
    >
      <template #body="{ data }">
        <DisplayCell :loading="cellLoading" :value="resolveBudgetValue(col, data)" />
      </template>

      <template #editor="{ data }">
        <component
          v-if="resolveEditor(col, data)"
          :is="resolveEditor(col, data)"
          v-model="data[col.field]"
          :options="col.options"
          option-label="label"
          option-value="value"
        />

        <DisplayCell v-else :loading="cellLoading" :value="data[col.field]" />
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
