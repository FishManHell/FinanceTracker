<script setup lang="ts">
import { InputText } from 'primevue'

defineProps<{
  modelValue: string | number
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <InputText
    :model-value="String(modelValue)"
    @update:model-value="(v) => emit('update:modelValue', v)"
    fluid
  />
</template>
