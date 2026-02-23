<script setup lang="ts">
import cls from './MonthPickerField.module.scss'
import { toRef } from 'vue'
import { useMonth } from '@/entities/date'
import { MonthPicker } from '@/shared/ui/MonthPicker'
import type { MonthKey } from '@/entities/date/model/types.ts'

interface MonthPickerFieldProps {
  monthKey: MonthKey
  year: number
  containerClass?: keyof typeof cls
}

const props = defineProps<MonthPickerFieldProps>()
const month = useMonth(props.monthKey, toRef(props, 'year'))
</script>

<template>
  <MonthPicker
    panelClass="date_panel"
    :class="containerClass && cls[containerClass]"
    :year="year"
    v-model="month"
    showIcon
    iconDisplay="input"
    variant="filled"
    size="small"
  />
</template>
