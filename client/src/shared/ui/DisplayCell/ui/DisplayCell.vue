<script setup lang="ts">
import { TableCell } from '@/shared/ui/TableCell'

withDefaults(
  defineProps<{
    value: unknown
    loading?: boolean
  }>(),
  {
    loading: false,
  },
)
</script>

<template>
  <TableCell :loading="loading">
    {{ value }}
  </TableCell>
</template>
