<script setup lang="ts" generic="T">
import { TableCell } from '@/shared/ui/TableCell'

defineProps<{
  value: T
  loading: boolean
}>()
</script>

<template>
  <TableCell :loading="loading">
    {{ value }}
  </TableCell>
</template>
