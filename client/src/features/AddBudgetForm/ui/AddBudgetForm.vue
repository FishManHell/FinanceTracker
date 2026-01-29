<script setup lang="ts">
import { Button, DatePicker, InputNumber, Select } from 'primevue'
import { Form, FormField, type FormSubmitEvent } from '@primevue/forms'
import { useSetBudget } from '@/entities/budget'

interface BudgetManagementForm {
  date: Date
  total: number
  currency: string
}

const initialValues: BudgetManagementForm = {
  date: new Date(),
  total: 13000,
  currency: 'USD',
}

const currencies = ['USD', 'EUR', 'ILS']

const { mutate: onMutateSetBudget } = useSetBudget()

function onAddNewBudget(e: FormSubmitEvent) {
  const values = e.values as BudgetManagementForm
  return onMutateSetBudget({
    year: values.date.getFullYear(),
    month: values.date.getMonth() + 1,
    total: values.total,
    currency: values.currency,
  })
}
</script>

<template>
  <div>
    <Form v-slot="$form" :initialValues="initialValues" @submit="onAddNewBudget">
      <FormField name="date">
        <DatePicker
          name="date"
          :modelValue="initialValues.date"
          view="month"
          dateFormat="mm/yy"
          :manualInput="false"
          :maxDate="new Date()"
          showIcon
        />
      </FormField>
      <FormField name="total">
        <InputNumber name="total" placeholder="Enter total" />
      </FormField>
      <FormField name="currency">
        <Select :options="currencies" name="currency" placeholder="Select currency" />
        <Message v-if="$form.currency?.invalid" severity="error" size="small" variant="simple">
          {{ $form.currency.error?.message }}
        </Message>
      </FormField>
      <Button type="submit" label="Add" />
    </Form>
  </div>
</template>

<style scoped></style>
