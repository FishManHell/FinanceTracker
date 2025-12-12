<script setup lang="ts">
import cls from './TransactionForm.module.scss'
import { Form, FormField } from '@primevue/forms'
import { InputNumber, InputText, DatePicker, Select, Button, CascadeSelect } from 'primevue'
import { inject, reactive, ref, computed } from 'vue'
import type { InjectedProps, TransactionFormData } from '../model/types.ts'
import { GET_ACCOUNTS_SELECT, useGetAccounts } from '@/entities/account'
import { groupForCascadeSelect } from '@/shared/lib/helpers'

const dialogRef = inject<InjectedProps>('dialogRef')!
const { onSubmit, initialData, mode } = dialogRef.value.data;

const {
  data: selectedAccounts,
  isLoading,
  refetch,
} = useGetAccounts(GET_ACCOUNTS_SELECT, { enabled: false });

const formData = reactive<TransactionFormData>({
  date: initialData?.date ?? new Date(),
  amount: initialData?.amount ?? 0,
  category: initialData?.category ?? '',
  account: initialData?.account ?? [],
  type: initialData?.type ?? '',
  currency: initialData?.currency ?? 'USD',
  description: initialData?.description ?? '',
});

const isOpenTreeAccountSelect = ref<boolean>(false);

const types = ['income', 'expense']
const currencies = ['USD', 'EUR', 'ILS']

const accounts = computed(() => groupForCascadeSelect(selectedAccounts.value ?? []))

const saveTransaction = () => onSubmit(formData)

const loadAccounts = async () => {
  if (!isOpenTreeAccountSelect.value) {
    isOpenTreeAccountSelect.value = true
    await refetch()
  }
};

</script>

<template>
  <div :class="cls.transaction_form_wrapper">
    <Form :class="cls.transaction_form" v-model="formData" @submit="saveTransaction">
      <FormField :class="cls.input_form_field" name="date">
        <DatePicker name="date" :class="cls.input_field" v-model="formData.date" />
      </FormField>
      <FormField :class="cls.input_form_field" name="amount">
        <InputNumber
          name="amount"
          placeholder="Enter amount"
          :class="cls.input_field"
          v-model="formData.amount"
        />
      </FormField>
      <FormField :class="cls.input_form_field" name="category">
        <InputText
          name="category"
          placeholder="Enter category"
          :class="cls.input_field"
          v-model="formData.category"
        />
      </FormField>
      <FormField :class="cls.input_form_field" name="type">
        <Select
          :options="types"
          name="type"
          placeholder="Select type"
          :class="cls.input_field"
          v-model="formData.type"
        />
      </FormField>
      <FormField :class="cls.input_form_field" name="currency">
        <Select
          :options="currencies"
          name="currency"
          placeholder="Select currency"
          :class="cls.input_field"
          v-model="formData.currency"
        />
      </FormField>
      <FormField :class="cls.input_form_field" name="description">
        <InputText
          name="description"
          placeholder="Enter description"
          :class="cls.input_field"
          v-model="formData.description"
        />
      </FormField>

      <FormField :class="cls.input_form_field" name="accounts">
        <CascadeSelect
          v-model="formData.account"
          name="accounts"
          :options="accounts"
          optionLabel="description"
          optionGroupLabel="type"
          :optionGroupChildren="['items']"
          placeholder="Select account"
          :class="cls.input_field"
          @show="loadAccounts"
          :loading="isLoading"
        />
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
