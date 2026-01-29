<script setup lang="ts">
import { InputNumber } from 'primevue'

defineProps<{
  modelValue: number
}>()

const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>()
</script>

<template>
  <InputNumber
    :model-value="modelValue"
    @update:model-value="(v) => emit('update:modelValue', v)"
    fluid
  />
</template>
