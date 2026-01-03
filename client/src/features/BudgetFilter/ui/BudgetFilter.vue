<script setup lang="ts">
import cls from './BudgetFilter.module.scss'
import { DatePicker, Select } from 'primevue'
import { type DatePickerModelValue, useBudgetStore } from '@/entities/budget'

const budgetStore = useBudgetStore()

const currencies = ['USD', 'EUR', 'ILS']

const onSetCurrency = (currency: string) => budgetStore.setCurrency(currency)
const onSetYear = (date: DatePickerModelValue) => budgetStore.setYear(date)
const onSetMonth = (date: DatePickerModelValue) => budgetStore.setMonth(date)
</script>

<template>
  <div :class="cls.budget_filter">
    <div :class="cls.budget_filter__group">
      <label :class="cls.budget_filter__label">Month</label>
      <DatePicker
        :modelValue="new Date(budgetStore.year, budgetStore.month, 1)"
        view="month"
        dateFormat="mm"
        @update:modelValue="onSetMonth"
      />
    </div>

    <div :class="cls.budget_filter__group">
      <label :class="cls.budget_filter__label">Year</label>
      <DatePicker
        :modelValue="new Date(budgetStore.year, budgetStore.month, 1)"
        view="year"
        dateFormat="yy"
        @update:modelValue="onSetYear"
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
