<script setup lang="ts">
import cls from './AddBudgetForm.module.scss'
import { Button, DatePicker, InputNumber, Select } from 'primevue'
import { Form, FormField, type FormSubmitEvent } from '@primevue/forms'
import { useSetBudget } from '@/entities/budget'
import { currencyOptions } from '@/shared/config'
import { CURRENCIES, type Currency } from '@/shared/types'
import { addBudgetFormResolver } from '../model/resolver.ts'
import { inject, type Ref } from 'vue'

interface BudgetManagementForm {
  date: Date
  total: number
  currency: Currency
}

const initialValues: BudgetManagementForm = {
  date: new Date(),
  total: 0,
  currency: CURRENCIES.USD,
}

const dialogRef = inject<Ref<{ close: () => void }>>('dialogRef')

const { mutate: onMutateSetBudget, isPending } = useSetBudget()

const onCloseForm = () => dialogRef?.value.close()

const onAddNewBudget = (e: FormSubmitEvent) => {
  if (!e.valid) return
  onMutateSetBudget(e.values as BudgetManagementForm, { onSuccess: onCloseForm })
}
</script>

<template>
  <Form
    v-slot="$form"
    :initialValues="initialValues"
    @submit="onAddNewBudget"
    :class="cls.add_budget_form"
    :resolver="addBudgetFormResolver"
  >
    <div :class="cls.add_budget_form_field">
      <FormField name="date">
        <DatePicker
          name="date"
          :modelValue="initialValues.date"
          view="month"
          dateFormat="mm/yy"
          :manualInput="false"
          :maxDate="new Date()"
          showIcon
          fluid
          :disabled="isPending"
        />
      </FormField>
      <Message v-if="$form.date?.invalid" severity="error" size="small" variant="simple">
        {{ $form.date.error?.message }}
      </Message>
    </div>

    <div :class="cls.add_budget_form_field">
      <FormField name="total">
        <InputNumber name="total" placeholder="Enter total" fluid :disabled="isPending" />
      </FormField>
      <Message v-if="$form.total?.invalid" severity="error" size="small" variant="simple">
        {{ $form.total.error?.message }}
      </Message>
    </div>
    <div :class="cls.add_budget_form_field">
      <FormField name="currency">
        <Select
          optionLabel="label"
          optionValue="value"
          :options="currencyOptions"
          name="currency"
          placeholder="Select currency"
          fluid
          :disabled="isPending"
        />
      </FormField>
      <Message v-if="$form.currency?.invalid" severity="error" size="small" variant="simple">
        {{ $form.currency.error?.message }}
      </Message>
    </div>
    <div :class="cls.add_budget_form_actions">
      <Button type="submit" label="Create" :disabled="isPending" :loading="isPending" />
    </div>
  </Form>
</template>
