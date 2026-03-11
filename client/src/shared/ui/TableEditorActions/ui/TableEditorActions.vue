<script setup lang="ts" generic="T extends { id: string }">
import { TableCell } from '@/shared/ui/TableCell'
import { Button } from 'primevue'

withDefaults(
  defineProps<{
    row: T
    isEditing: boolean
    loading: boolean
    canDelete?: boolean
    canEdit?: boolean
  }>(),
  {
    canDelete: true,
    canEdit: true,
  },
)

const emit = defineEmits<{
  (e: 'edit', row: T): void
  (e: 'save', row: T): void
  (e: 'cancel'): void
  (e: 'delete', id: string): void
}>()

const cloneRow = <T,>(row: T): T => JSON.parse(JSON.stringify(row))
</script>

<template>
  <TableCell :loading="loading">
    <div v-if="!isEditing && (canEdit || canDelete)">
      <Button v-if="canEdit" label="Edit" outlined @click="emit('edit', cloneRow(row))" />

      <Button
        v-if="canDelete"
        label="Delete"
        severity="danger"
        outlined
        @click="emit('delete', row.id)"
      />
    </div>

    <div v-else-if="isEditing">
      <Button label="Save" outlined @click="emit('save', row)" />
      <Button label="Cancel" severity="danger" outlined @click="emit('cancel')" />
    </div>
  </TableCell>
</template>
