<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { DatePicker, IftaLabel } from 'primevue'
import type { DatePickerModelValue } from '@/app'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  year: number
  modelValue: number
}>()

const attrs = useAttrs()
const { class: className, ...restAttrs } = attrs
const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>()

const now = new Date()
const currentYear = now.getFullYear()
const currentMonth = now.getMonth()

const monthDate = computed(() => new Date(props.year, props.modelValue - 1))

const minDate = computed(() => new Date(props.year, 0))

const maxDate = computed(() => {
  if (props.year === currentYear) {
    return new Date(currentYear, currentMonth)
  }
  return new Date(props.year, 11)
})

const onSetMonth = (date: DatePickerModelValue) => {
  if (date instanceof Date) {
    emit('update:modelValue', date.getMonth() + 1)
  }
}
</script>

<template>
  <div :class="className">
    <IftaLabel>
      <DatePicker
        :key="year"
        v-bind="restAttrs"
        view="month"
        :modelValue="monthDate"
        :minDate="minDate"
        :maxDate="maxDate"
        dateFormat="mm"
        inputId="month"
        @update:modelValue="onSetMonth"
      />
      <label for="month">Month</label>
    </IftaLabel>
  </div>
</template>
