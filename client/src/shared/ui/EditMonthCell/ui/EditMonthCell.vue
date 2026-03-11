<script setup lang="ts">
import { DatePicker } from 'primevue'
import { computed } from 'vue'

interface Props {
  modelValue: Date | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Date | null): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
</script>

<template>
  <DatePicker v-model="value" view="month" dateFormat="yy-mm" fluid />
</template>
