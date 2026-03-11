<script setup lang="ts">
import { computed } from 'vue'
import { Column, DataTable, useToast } from 'primevue'
import { DisplayCell } from '@/shared/ui/DisplayCell'
import { TableEditorActions } from '@/shared/ui/TableEditorActions'
import { createSkeletonBudgets } from '@/helpers/skeleton.ts'
import { useConfirmActions } from '@/shared/lib/hooks'
import type { AdministrationTableProps } from '../model/types.ts'
import { useEditableTable } from '@/features/table-editor'
import type { UserDTO } from '@/shared/types'
import { useUserPermissions } from '@/entities/user'
import { createColumns } from '../lib/columns.ts'
import { type ColumnConfig, getEditor, getPermissionRow } from '@/shared/lib/table'

const props = defineProps<AdministrationTableProps>()

const {
  editingRows,
  validateField,
  validationErrors,
  cancelEdit,
  startEdit,
  isRowEditing,
  saveRow,
  getFirstError,
  originalRow,
} = useEditableTable<UserDTO>({
  data: computed(() => props.data),
  validators: props.validators,
  onSave: props.onSave,
})
const { confirmSave, confirmDelete } = useConfirmActions()
const { canDeleteUser, canEditUser, canEditUserRole } = useUserPermissions()
const columns = createColumns(canEditUserRole)

const toast = useToast()

const onSaveHandler = (row: UserDTO) => {
  confirmSave(async () => {
    const result = saveRow(row)
    if (!result.success) {
      toast.add({
        severity: 'error',
        summary: getFirstError(row.id) || 'Validation error',
        life: 3000,
      })
      return
    }
    editingRows.value = []
  })
}

const onDeleteHandler = (id: string) => confirmDelete(async () => props.onDelete(id))

const users = computed(() => {
  if (props.isSkeleton && (!props.data || props.data.length === 0)) {
    return createSkeletonBudgets(5)
  }
  return props.data
})

const cellLoading = computed(() => props.isSkeleton && (!props.data || props.data.length === 0))

const resolverPermissionRow = (row: UserDTO) => getPermissionRow(row, originalRow.value)

const resolveEditor = (col: ColumnConfig<UserDTO>, row: UserDTO) => getEditor(col, row)
</script>

<template>
  <DataTable
    v-model:editingRows="editingRows"
    :value="users"
    scrollable
    scrollHeight="flex"
    editMode="row"
    dataKey="id"
    :loading="props.loading"
  >
    <template #empty>
      <h1>No users found</h1>
    </template>

    <Column v-for="col in columns" :key="col.field" :field="col.field" :header="col.header">
      <template #body="{ data }">
        <DisplayCell :value="data[col.field]" :loading="cellLoading" />
      </template>
      <template #editor="{ data }">
        <component
          v-if="resolveEditor(col, data)"
          :is="resolveEditor(col, data)"
          v-model="data[col.field]"
          :options="col.options"
          :error="validationErrors[data.id]?.[col.field]"
          @update:modelValue="validateField(data, col.field, $event)"
        />
        <DisplayCell v-else :value="data[col.field]" />
      </template>
    </Column>
    <Column header="Actions">
      <template #body="{ data }">
        <TableEditorActions
          :row="data"
          :is-editing="isRowEditing(data.id)"
          :loading="cellLoading"
          :can-delete="canDeleteUser(resolverPermissionRow(data))"
          :can-edit="canEditUser(resolverPermissionRow(data))"
          @edit="startEdit"
          @cancel="cancelEdit"
          @save="onSaveHandler"
          @delete="onDeleteHandler"
        />
      </template>
    </Column>
  </DataTable>
</template>
