<script setup lang="ts">
import cls from './BudgetFilter.module.scss'
import { DatePicker, Select } from 'primevue'
import { type DatePickerModelValue, useAppContextStore } from '@/app'
import { currencyOptions } from '@/shared/config'
import type { Currency } from '@/shared/types'
import { useId } from 'vue'

const appStore = useAppContextStore()

const dateId = useId()
const currencyId = useId()

const onSetCurrency = (currency: Currency) => appStore.setCurrency(currency)
const onSetDate = (date: DatePickerModelValue) => appStore.setDate(date)
</script>

<template>
  <div :class="cls.budget_filter">
    <div :class="cls.budget_filter__group">
      <label :class="cls.budget_filter__label" :for="dateId">Date</label>
      <DatePicker
        :inputId="dateId"
        :modelValue="appStore.date"
        view="year"
        dateFormat="yy"
        :maxDate="new Date()"
        @update:modelValue="onSetDate"
      />
    </div>

    <div :class="cls.budget_filter__group">
      <span :class="cls.budget_filter__label" :id="currencyId">Currency</span>
      <Select
        :aria-labelledby="currencyId"
        optionLabel="label"
        optionValue="value"
        :options="currencyOptions"
        placeholder="Select currency"
        :modelValue="appStore.currency"
        @update:modelValue="onSetCurrency"
        disabled
      />
    </div>
  </div>
</template>
