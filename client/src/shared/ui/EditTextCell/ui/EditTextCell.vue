<script setup lang="ts">
import { InputText } from 'primevue'

defineProps<{
  modelValue: string | number | null
  error?: string
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex flex-col gap-1">
    <InputText
      :model-value="String(modelValue)"
      @update:model-value="(v) => emit('update:modelValue', v)"
      :class="{ 'p-invalid': error }"
      fluid
    />
    <small v-if="error" class="p-error">{{ error }}</small>
  </div>
</template>
