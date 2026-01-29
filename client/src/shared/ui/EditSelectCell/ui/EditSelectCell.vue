<script setup lang="ts" generic="T">
import { Select } from 'primevue'

defineProps<{
  modelValue: T | null
  options: T[]
  optionLabel?: Extract<keyof T, string>
  optionValue?: Extract<keyof T, string>
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: T | null): void
}>()
</script>

<template>
  <Select
    :model-value="modelValue"
    :options="options"
    :option-label="optionLabel"
    :option-value="optionValue"
    @update:model-value="(v) => emit('update:modelValue', v)"
  />
</template>
