<script setup lang="ts">
import cls from './TransactionForm.module.scss'
import { Form, FormField } from '@primevue/forms'
import type { FormSubmitEvent } from '@primevue/forms'
import { InputNumber, InputText, DatePicker, Select, Button, CascadeSelect } from 'primevue'
import { inject, ref, computed, type Ref } from 'vue'
import type { InjectedProps, TransactionFormData } from '../model/types.ts'
import { GET_ACCOUNTS_SELECT, useGetAccounts } from '@/entities/account'
import { groupForCascadeSelect } from '@/shared/lib/helpers'
import { resolver } from '../model/resolver.ts'

const dialogRef = inject<Ref<InjectedProps>>('dialogRef')!
const { onSubmit, initialData, mode } = dialogRef.value.data

const {
  data: selectedAccounts,
  isLoading,
  refetch,
} = useGetAccounts(GET_ACCOUNTS_SELECT, { enabled: false })

const initialValues: TransactionFormData = {
  date: initialData?.date ?? new Date(),
  amount: initialData?.amount ?? 0,
  category: initialData?.category ?? '',
  account: initialData?.account ?? [],
  currency: initialData?.currency ?? '',
  description: initialData?.description ?? '',
}

const isOpenTreeAccountSelect = ref<boolean>(false)

const currencies = ['USD', 'EUR', 'ILS']

const accounts = computed(() => groupForCascadeSelect(selectedAccounts.value ?? []))

const saveTransaction = ({ valid, values }: FormSubmitEvent) => {
  if (valid) {
    onSubmit(values as TransactionFormData)
  }
}

const loadAccounts = async () => {
  if (!isOpenTreeAccountSelect.value) {
    isOpenTreeAccountSelect.value = true
    await refetch()
  }
}
</script>

<template>
  <div :class="cls.transaction_form_wrapper">
    <Form
      v-slot="$form"
      :resolver="resolver"
      :initialValues
      :class="cls.transaction_form"
      @submit="saveTransaction"
    >
      <FormField :class="cls.input_form_field" name="date">
        <DatePicker
          name="date"
          :modelValue="initialValues.date"
          :class="cls.input_field"
          :manualInput="false"
          showIcon
        />
      </FormField>
      <FormField :class="cls.input_form_field" name="amount">
        <InputNumber
          name="amount"
          placeholder="Enter amount"
          :class="cls.input_field"
        />
      </FormField>
      <FormField :class="cls.input_form_field" name="category">
        <InputText name="category" placeholder="Enter category" :class="cls.input_field" />
        <Message v-if="$form.category?.invalid" severity="error" size="small" variant="simple">
          {{ $form.category.error?.message }}
        </Message>
      </FormField>
      <FormField :class="cls.input_form_field" name="currency">
        <Select
          :options="currencies"
          name="currency"
          placeholder="Select currency"
          :class="cls.input_field"
        />
        <Message v-if="$form.currency?.invalid" severity="error" size="small" variant="simple">
          {{ $form.currency.error?.message }}
        </Message>
      </FormField>
      <FormField :class="cls.input_form_field" name="description">
        <InputText name="description" placeholder="Enter description" :class="cls.input_field" />
        <Message v-if="$form.description?.invalid" severity="error" size="small" variant="simple">
          {{ $form.description.error?.message }}
        </Message>
      </FormField>

      <FormField :class="cls.input_form_field" name="account">
        <CascadeSelect
          name="account"
          :options="accounts"
          optionLabel="description"
          optionGroupLabel="type"
          :optionGroupChildren="['items']"
          placeholder="Select account"
          :class="cls.input_field"
          @show="loadAccounts"
          :loading="isLoading"
        />
        <Message v-if="$form.account?.invalid" severity="error" size="small" variant="simple">
          {{ $form.account.error?.message }}
        </Message>
      </FormField>
      <FormField :class="cls.input_form_field">
        <Button
          type="submit"
          :label="mode === 'edit' ? 'Update Transaction' : 'Save Transaction'"
        />
      </FormField>
    </Form>
  </div>
</template>
