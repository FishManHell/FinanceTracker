<script setup lang="ts">
import cls from './DashboardPage.module.scss'
import { Budget } from '@/widgets/Budget'
import { BudgetFilter } from '@/features/BudgetFilter'
import { AddTransactionPanel } from '@/features/AddTransactionPanel'
import { ExpenseChart } from '@/features/ExpenseChart'
import { TransactionTable } from '@/widgets/TransactionTable'
</script>

<template>
  <div :class="cls.dashboard_page">
    <header :class="cls.header">
      <h1>Dashboard</h1>
      <BudgetFilter />
    </header>
    <section :class="cls.expenses_budget_section">
      <ExpenseChart />
      <Budget />
    </section>
    <AddTransactionPanel />
    <TransactionTable />
  </div>
</template>
