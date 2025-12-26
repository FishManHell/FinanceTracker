<script setup lang="ts">
import { DatePicker, Select } from 'primevue'
import {
  type DatePickerModelValue,
  useBudgetStore,
} from '@/entities/budget'

const budgetStore = useBudgetStore()

const currencies = ['USD', 'EUR', 'ILS']

const onSetDate = (date: DatePickerModelValue) => budgetStore.setDate(date)
const onSetCurrency = (currency: string) => budgetStore.setCurrency(currency)
</script>

<template>
  <div>
    <DatePicker
      v-model="budgetStore.date"
      view="month"
      dateFormat="mm"
      @update:modelValue="onSetDate"
    />
    <DatePicker
      v-model="budgetStore.date"
      view="year"
      dateFormat="yy"
      @update:modelValue="onSetDate"
    />
    <Select
      :options="currencies"
      name="currency"
      placeholder="Select currency"
      :modelValue="budgetStore.currency"
      @update:modelValue="onSetCurrency"
    />
  </div>
</template>
