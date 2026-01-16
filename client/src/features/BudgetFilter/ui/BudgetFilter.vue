<script setup lang="ts">
import cls from './BudgetFilter.module.scss'
import { DatePicker, Select } from 'primevue'
import { type DatePickerModelValue, useBudgetStore } from '@/entities/budget'

const budgetStore = useBudgetStore()

const currencies = ['USD', 'EUR', 'ILS']

const onSetCurrency = (currency: string) => budgetStore.setCurrency(currency)
const onSetDate = (date: DatePickerModelValue) => budgetStore.setDate(date)

</script>

<template>
  <div :class="cls.budget_filter">
    <div :class="cls.budget_filter__group">
      <label :class="cls.budget_filter__label">Date</label>
      <DatePicker
        :modelValue="budgetStore.date"
        view="month"
        dateFormat="mm/yy"
        :maxDate="new Date()"
        @update:modelValue="onSetDate"
      />
    </div>

    <div :class="cls.budget_filter__group">
      <label :class="cls.budget_filter__label">Currency</label>
      <Select
        :options="currencies"
        name="currency"
        placeholder="Select currency"
        :modelValue="budgetStore.currency"
        @update:modelValue="onSetCurrency"
      />
    </div>
  </div>
</template>
