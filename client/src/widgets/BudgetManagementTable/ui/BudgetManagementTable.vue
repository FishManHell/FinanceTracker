<script setup lang="ts">
import cls from './BudgetManagementTable.module.scss'
import { Column, DataTable } from 'primevue'
import { computed } from 'vue'
import { type BudgetUI, useDeleteBudget } from '@/entities/budget'
import { useEditBudget, useGetBudgets } from '@/entities/budget'
import { DisplayCell } from '@/shared/ui/DisplayCell'
import { TableEditorActions } from '@/shared/ui/TableEditorActions'
import { createSkeletonBudgets } from '@/helpers/skeleton.ts'
import { type OnSavePayload, useEditableTable } from '@/features/table-editor'
import { useConfirmActions } from '@/shared/lib/hooks'
import { createBudgetColumns } from '@/entities/budget/model/lib/createBudgetColumns.ts'
import { type ColumnConfig, getEditor } from '@/shared/lib/table'

const { data, isFetching } = useGetBudgets()
const { mutate: onMutateEditBudget } = useEditBudget()
const { mutate: onMutateDeleteBudget } = useDeleteBudget()
const { confirmDelete, confirmSave } = useConfirmActions()

const { editingRows, saveRow, isRowEditing, cancelEdit, startEdit } = useEditableTable<BudgetUI>({
  data,
  validators: {},
  onSave,
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

const resolveEditor = (col: ColumnConfig<BudgetUI>, row: BudgetUI) => getEditor(col, row)
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
        <DisplayCell
          :loading="cellLoading"
          :value="col.formatter ? col.formatter(data[col.field], data) : data[col.field]"
        />
      </template>

      <template #editor="{ data }">
        <component
          v-if="resolveEditor(col, data)"
          :is="resolveEditor(col, data)"
          v-model="data[col.field]"
          :options="col.options"
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
