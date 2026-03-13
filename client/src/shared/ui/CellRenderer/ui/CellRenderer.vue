<script setup lang="ts" generic="T extends object">
import type { ColumnConfig, ComponentCell } from '@/shared/lib/table'
import { isComponentCell } from "@/shared/lib/table"
import { TableCell } from '@/shared/ui/TableCell'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    col: ColumnConfig<T>
    row: T
    loading?: boolean
  }>(),
  {
    loading: false,
  },
)
const cell = computed<unknown>(() => {
  const value = props.row[props.col.field]

  if (props.col.formatter) {
    return props.col.formatter(value, props.row)
  }

  return value
})
const componentCell = computed<ComponentCell | null>(() => {
  return isComponentCell(cell.value) ? cell.value : null
})
</script>

<template>
  <TableCell :loading="loading">
    <component v-if="componentCell" :is="componentCell.component" v-bind="componentCell.props" />
    <template v-else>
      {{ cell }}
    </template>
  </TableCell>
</template>
