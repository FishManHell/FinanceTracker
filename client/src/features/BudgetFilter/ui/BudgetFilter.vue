<script setup lang="ts">
import cls from './BudgetFilter.module.scss'
import { DatePicker, Select } from 'primevue'
import { type DatePickerModelValue, useAppContextStore } from '@/app'

const appStore = useAppContextStore()

const currencies = ['USD', 'EUR', 'ILS']

const onSetCurrency = (currency: string) => appStore.setCurrency(currency)
const onSetDate = (date: DatePickerModelValue) => appStore.setDate(date)
</script>

<template>
  <div :class="cls.budget_filter">
    <div :class="cls.budget_filter__group">
      <label :class="cls.budget_filter__label">Date</label>
      <DatePicker
        :modelValue="appStore.date"
        view="year"
        dateFormat="yy"
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
        :modelValue="appStore.currency"
        @update:modelValue="onSetCurrency"
        disabled
      />
    </div>
  </div>
</template>
