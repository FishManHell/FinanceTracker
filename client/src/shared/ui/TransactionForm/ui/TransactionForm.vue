<script setup lang="ts">
import cls from './TransactionForm.module.scss'
import { Form, FormField } from '@primevue/forms'
import type { FormSubmitEvent } from '@primevue/forms'
import { InputNumber, InputText, DatePicker, Select, Button, CascadeSelect } from 'primevue'
import { inject, ref, computed, type Ref } from 'vue'
import type { InjectedProps, TransactionFormData } from '../model/types.ts'
import { useCreateAccount, useGetAccounts } from '@/entities/account'
import { groupForCascadeSelect } from '@/shared/lib/helpers'
import { resolver } from '../model/resolver.ts'
import { currencyOptions } from '@/shared/config'
import { CURRENCIES } from '@/shared/types'

const dialogRef = inject<Ref<InjectedProps>>('dialogRef')!
const { onSubmit, initialData, mode } = dialogRef.value.data

const { data: selectedAccounts, isLoading } = useGetAccounts()
const { mutate: createAccount, isPending } = useCreateAccount()

const isCreateAccountMode = ref(false)
const newAccount = ref({
  type: '',
  description: '',
})

const initialValues: TransactionFormData = {
  date: initialData?.date ?? new Date(),
  amount: initialData?.amount ?? 0,
  category: initialData?.category ?? '',
  account: initialData?.account ?? [],
  currency: initialData?.currency ?? CURRENCIES.USD,
  description: initialData?.description ?? '',
}

const accountTypes = ['card', 'cash', 'investment']

const resolveCurrency = (currency?: string) => currency?.trim() || 'USD'

const accounts = computed(() => groupForCascadeSelect(selectedAccounts.value ?? []))

const saveTransaction = ({ valid, values }: FormSubmitEvent) => {
  if (valid) {
    onSubmit(
      values as TransactionFormData,
      () => dialogRef.value?.close()
    )
  }
}

const onOpenCreateAccount = () => {
  isCreateAccountMode.value = true
}

const onResetCreateAccount = () => {
  newAccount.value = {
    type: '',
    description: '',
  }
}

const onCancelCreateAccount = () => {
  isCreateAccountMode.value = false
  onResetCreateAccount()
}

const onSaveCreateAccount = async (formCurrency?: string) => {
  if (!newAccount.value.type || !newAccount.value.description) return
  const { type, description } = newAccount.value

  createAccount({
    type,
    description,
    amount: 0,
    currency: resolveCurrency(formCurrency),
  })
  onResetCreateAccount()
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
          :class="cls.field"
          :manualInput="false"
          showIcon
        />
      </FormField>

      <FormField :class="cls.input_form_field" name="amount">
        <InputNumber name="amount" placeholder="Enter amount" :class="cls.field" />
      </FormField>

      <FormField :class="cls.input_form_field" name="category">
        <InputText name="category" placeholder="Enter category" :class="cls.field" />
        <Message v-if="$form.category?.invalid" severity="error" size="small" variant="simple">
          {{ $form.category.error?.message }}
        </Message>
      </FormField>

      <FormField :class="cls.input_form_field" name="currency">
        <Select
          optionLabel="label"
          optionValue="value"
          :options="currencyOptions"
          name="currency"
          placeholder="Select currency"
          :class="cls.field"
        />
        <Message v-if="$form.currency?.invalid" severity="error" size="small" variant="simple">
          {{ $form.currency.error?.message }}
        </Message>
      </FormField>

      <FormField :class="cls.input_form_field" name="description">
        <InputText name="description" placeholder="Enter description" :class="cls.field" />
        <Message v-if="$form.description?.invalid" severity="error" size="small" variant="simple">
          {{ $form.description.error?.message }}
        </Message>
      </FormField>

      <FormField :class="cls.input_form_field" name="account">
        <div :class="cls.account_row">
          <CascadeSelect
            name="account"
            :options="accounts"
            optionLabel="description"
            optionGroupLabel="type"
            :optionGroupChildren="['items']"
            placeholder="Select account"
            :loading="isLoading"
            :disabled="isCreateAccountMode"
          />

          <Button
            v-if="!isCreateAccountMode"
            label="Add account"
            variant="outlined"
            type="button"
            @click="onOpenCreateAccount"
            :disabled="isPending"
          />
        </div>

        <Message v-if="$form.account?.invalid" severity="error" size="small" variant="simple">
          {{ $form.account.error?.message }}
        </Message>
      </FormField>

      <div v-if="isCreateAccountMode" :class="cls.create_account_block">
        <Select
          v-model="newAccount.type"
          :options="accountTypes"
          placeholder="Select account type"
          :class="cls.field"
          :disabled="isPending"
        />

        <InputText
          v-model="newAccount.description"
          placeholder="Enter account name"
          :class="cls.field"
          :disabled="isPending"
        />

        <div :class="cls.create_account_actions">
          <Button
            label="Save account"
            type="button"
            @click="onSaveCreateAccount($form.currency?.value)"
            :disabled="isPending"
            :loading="isPending"
          />
          <Button
            label="Cancel"
            type="button"
            variant="outlined"
            @click="onCancelCreateAccount"
            :disabled="isPending"
          />
        </div>
      </div>
      <FormField :class="cls.input_form_field">
        <Button
          type="submit"
          :label="mode === 'edit' ? 'Update Transaction' : 'Save Transaction'"
          :disabled="isPending"
        />
      </FormField>
    </Form>
  </div>
</template>
