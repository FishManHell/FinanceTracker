<script setup lang="ts">
import cls from './DashboardPage.module.scss'
import { BudgetOverview } from '@/widgets/BudgetOverview'
import { BudgetFilter } from '@/features/BudgetFilter'
import { ExpenseChart } from '@/features/ExpenseChart'
import { PageHeader } from '@/shared/ui/PageHeader'
import { TransactionsContainer } from '@/features/TransactionsContainer'
import { onUnmounted } from 'vue'
import { removeQueries } from '@/shared/lib/vue-query'
import { useQueryClient } from '@tanstack/vue-query'
import { transactionQueryKeys } from '@/entities/transaction'

const queryClient = useQueryClient()

onUnmounted(() => {
  removeQueries(queryClient, [
    transactionQueryKeys.transactions,
    transactionQueryKeys.transactionsMonthly
  ])
})
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
      <TransactionsContainer />
    </section>
  </div>
</template>
