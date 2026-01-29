<script setup lang="ts">
import cls from './BudgetManagementPage.module.scss'
import { Budget } from '@/widgets/Budget'
import { Button, Toolbar } from 'primevue'
import { BudgetManagementTable } from '@/widgets/BudgetManagementTable'
import { AddBudgetForm } from '@/features/AddBudgetForm'
import { useAppDialog } from '@/shared/lib/hooks'

const { openFormDialog } = useAppDialog()

const openBudgetManagementFormDialog = () => {
  openFormDialog(AddBudgetForm, 'Add New Budget')
}

</script>

<template>
  <div :class="cls.manage_budget_page">
    <header :class="cls.header">
      <h1>Budget Management</h1>
    </header>

    <section>
      <div style="display: flex">
        <Budget />
      </div>
      <Toolbar>
        <template #start>
          <Button label="Add new" icon="pi pi-plus" @click="openBudgetManagementFormDialog" />
        </template>
      </Toolbar>
      <BudgetManagementTable />
    </section>
  </div>
</template>

<style scoped></style>
