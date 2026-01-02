<script setup lang="ts">
import { Skeleton } from 'primevue'

defineProps<{
  loading: boolean
  width?: string
  height?: string
}>()
</script>

<template>
  <template v-if="loading">
    <Skeleton :width="width || '100%'" :height="height || '1.5rem'" />
  </template>

  <template v-else>
    <slot />
  </template>
</template>
