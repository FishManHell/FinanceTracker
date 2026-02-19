<script setup lang="ts">
import cls from './BudgetManagementPage.module.scss'
import { BudgetOverview } from '@/widgets/BudgetOverview'
import { BudgetManagementTable } from '@/widgets/BudgetManagementTable'
import { BudgetManagementChart } from '@/features/BudgetManagementChart'
import { BudgetFilter } from '@/features/BudgetFilter'
import { useAppDialog } from '@/shared/lib/hooks'
import { AddBudgetForm } from '@/features/AddBudgetForm'
import { SectionCard } from '@/shared/ui/SectionCard'
import { PageHeader } from '@/shared/ui/PageHeader'

const { openFormDialog } = useAppDialog()

const openBudgetManagementFormDialog = () => {
  openFormDialog(AddBudgetForm, 'Add New Budget')
}
</script>

<template>
  <div :class="cls.manage_budget_page">
    <PageHeader title="Budget Management">
      <BudgetFilter />
    </PageHeader>
    <section :class="cls.body">
      <div :class="cls.chart_section">
        <BudgetManagementChart />
        <BudgetOverview />
      </div>

      <SectionCard
        title="Budgets"
        buttonLabel="New"
        buttonIcon="pi pi-plus"
        :onButtonClick="openBudgetManagementFormDialog"
      >
        <BudgetManagementTable />
      </SectionCard>
    </section>
  </div>
</template>
