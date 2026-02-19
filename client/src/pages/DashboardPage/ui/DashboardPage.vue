<script setup lang="ts">
import cls from './DashboardPage.module.scss'
import { BudgetOverview } from '@/widgets/BudgetOverview'
import { BudgetFilter } from '@/features/BudgetFilter'
import { AddTransactionPanel } from '@/features/AddTransactionPanel'
import { ExpenseChart } from '@/features/ExpenseChart'
import { TransactionTable } from '@/widgets/TransactionTable'
import { SectionCard } from '@/shared/ui/SectionCard'
import { useAppDialog } from '@/shared/lib/hooks'
import { TransactionForm } from '@/shared/ui/TransactionForm'
import { type TransactionWithoutType, useSetTransaction } from '@/entities/transaction'
import { PageHeader } from '@/shared/ui/PageHeader'

const { openFormDialog } = useAppDialog()
const { mutate } = useSetTransaction()

const onSetTransaction = (transaction: TransactionWithoutType) => mutate(transaction)

const openTransactionDialog = () => {
  openFormDialog(TransactionForm, 'Add Transaction', {
    onSubmit: onSetTransaction,
    initialData: null,
    mode: 'add',
  })
}
</script>

<template>
  <div :class="cls.dashboard_page">
    <PageHeader title="Dashboard">
      <BudgetFilter />
    </PageHeader>
    <section :class="cls.body">
      <div :class="cls.expenses_budget_section">
        <ExpenseChart />
        <BudgetOverview />
      </div>
      <AddTransactionPanel />
      <SectionCard
        title="Transactions"
        buttonLabel="New"
        buttonIcon="pi pi-plus"
        :onButtonClick="openTransactionDialog"
      >
        <TransactionTable />
      </SectionCard>
    </section>
  </div>
</template>
