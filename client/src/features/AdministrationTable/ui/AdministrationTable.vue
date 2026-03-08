<script setup lang="ts">
import { computed } from 'vue'
import { Column, DataTable, useToast } from 'primevue'
import { EditTextCell } from '@/shared/ui/EditTextCell'
import { DisplayCell } from '@/shared/ui/DisplayCell'
import { EditSelectCell } from '@/shared/ui/EditSelectCell'
import { TableEditorActions } from '@/shared/ui/TableEditorActions'
import { createSkeletonBudgets } from '@/helpers/skeleton.ts'
import { useConfirmActions } from '@/shared/lib/hooks'
import type { AdministrationTableProps } from '../model/types.ts'
import { useEditableTable } from '@/features/table-editor'
import type { UserDTO } from '@/entities/administration'

const props = defineProps<AdministrationTableProps>();

const {
  editingRows,
  validateField,
  validationErrors,
  cancelEdit,
  startEdit,
  isRowEditing,
  saveRow,
  getFirstError,
} = useEditableTable<UserDTO>({
  data: computed(() => props.data),
  validators: props.validators,
  onSave: props.onSave,
})
const { confirmSave, confirmDelete } = useConfirmActions()

const toast = useToast()

const roles = ['admin', 'user', 'developer']

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

const onDeleteHandler = (id: string) => confirmDelete(async () => props.onDelete(id));

const users = computed(() => {
  if (props.isSkeleton && (!props.data || props.data.length === 0)) {
    return createSkeletonBudgets(5)
  }
  return props.data
})

const cellLoading = computed(() => {
  return props.isSkeleton && (!props.data || props.data.length === 0)
})
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

    <Column field="id" header="ID">
      <template #body="{ data }">
        <DisplayCell :loading="cellLoading" :value="data.id" />
      </template>
    </Column>
    <Column field="username" header="Username">
      <template #body="{ data }">
        <DisplayCell :loading="cellLoading" :value="data.username" />
      </template>

      <template #editor="{ data, field }">
        <EditTextCell
          v-model="data[field as keyof UserDTO]"
          :error="validationErrors[data.id]?.[field as keyof UserDTO] ?? ''"
          @update:modelValue="(val) => validateField(data, field as keyof UserDTO, val)"
        />
      </template>
    </Column>
    <Column field="email" header="Email">
      <template #body="{ data }">
        <DisplayCell :loading="cellLoading" :value="data.email" />
      </template>
    </Column>
    <Column field="role" header="Role">
      <template #body="{ data }">
        <DisplayCell :loading="cellLoading" :value="data.role" />
      </template>

      <template #editor="{ data, field }">
        <EditSelectCell v-model="data[field]" :options="roles" />
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
          @delete="onDeleteHandler"
        />
      </template>
    </Column>
  </DataTable>
</template>
