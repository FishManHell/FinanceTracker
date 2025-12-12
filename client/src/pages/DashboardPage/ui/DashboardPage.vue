<script setup lang="ts">
import { Budget } from '@/widgets/Budget';
import Button from 'primevue/button';
import { useDialog } from 'primevue/usedialog';
import { TransactionForm } from '@/shared/ui/TransactionForm';
import { gql } from '@apollo/client/core';
import { apolloClient } from '@/shared/api/apollo';
import { type Transaction, useSetTransaction } from '@/entities/transaction';

const GET_BUDGET = gql`
  query GetBudget($year: Int!, $month: Int!) {
    getBudget(year: $year, month: $month) {
      year
      month
      budget
      spent
      remaining
    }
  }
`

const dialog = useDialog()

const { mutate } = useSetTransaction();

const onSetTransaction = (transaction: Transaction) => mutate(transaction);

function openTransactionDialog() {
  dialog.open(TransactionForm, {
    props: {
      header: 'Add Transaction',
      style: {
        width: '100%',
        maxWidth: '800px',
        textAlign: 'center',
      },
      modal: true,
    },
    data: {
      onSubmit: onSetTransaction,
      initialData: null,
      mode: 'add',
    },
  })
}

const getBudget = async () => {
  try {
    const { data } = await apolloClient.query({
      query: GET_BUDGET,
      variables: { year: 2025, month: 12 },
      fetchPolicy: 'network-only',
    })

    return data
  } catch (error) {
    console.error('Error in onSetTransaction:', error)
  }
}

</script>

<template>
  <div class="dashboard-page">
    <Budget />
    <Button label="Add Transaction" @click="openTransactionDialog" />
    <Button label="Get Budget" @click="getBudget" />
  </div>
</template>

<style scoped>
.dashboard-page {
  padding: 2rem;
  font-family: Arial, sans-serif;
}
</style>
