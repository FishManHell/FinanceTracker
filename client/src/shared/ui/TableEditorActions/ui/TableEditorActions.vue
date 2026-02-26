<script setup lang="ts" generic="T extends { id: string }">
import { TableCell } from '@/shared/ui/TableCell'
import { Button } from 'primevue'

defineProps<{
  row: T
  isEditing: boolean
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'edit', row: T): void
  (e: 'save', row: T): void
  (e: 'cancel'): void
  (e: 'delete', id: string): void
}>()

const cloneRow = <T,>(row: T): T => JSON.parse(JSON.stringify(row));

</script>

<template>
  <TableCell :loading="loading">
    <div v-if="!isEditing">
      <Button label="Edit" @click="emit('edit', cloneRow(row))" outlined />
      <Button label="Delete" severity="danger" outlined @click="emit('delete', row.id)" />
    </div>

    <div v-else>
      <Button label="Save" outlined @click="emit('save', row)" />
      <Button label="Cancel" severity="danger" outlined @click="emit('cancel')" />
    </div>
  </TableCell>
</template>
