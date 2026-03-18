<script setup lang="ts" generic="T">
import { Select } from 'primevue'

defineProps<{
  modelValue: T | null
  options: T[]
  optionLabel?: string
  optionValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: T | null): void
}>()
</script>

<template>
  <Select
    v-bind="$attrs"
    :model-value="modelValue"
    :options="options"
    :option-label="optionLabel"
    :option-value="optionValue"
    @update:model-value="(v) => emit('update:modelValue', v)"
  />
</template>
