<script setup lang="ts">
import cls from './BudgetManagementChart.module.scss'
import Chart from 'primevue/chart'
import Card from 'primevue/card'
import { useDarkMode } from '@/shared/lib/hooks'
import { useGetBudgetsYearlyByMonth } from '@/entities/budget'
import { useAppContextStore } from '@/app'
import { computed } from 'vue'
import { useExpenseChartOptions } from '@/features/ExpenseChart'
import { MONTH_LABELS } from '@/shared/lib/date/monthLabels.ts'

const appStore = useAppContextStore()
const year = computed(() => appStore.date.getFullYear())

const { isDark } = useDarkMode()
const { chartOptions } = useExpenseChartOptions(isDark)
const { data: budgetsYearlyByMonth } = useGetBudgetsYearlyByMonth(year)

const setChartData = computed(() => {
  const documentStyle = getComputedStyle(document.documentElement)

  const monthlyMap = new Map(
    budgetsYearlyByMonth.value?.map(
      ({ month, budget, budgetCurrency, expense, expenseCurrency }) => [
        month - 1,
        { budget, budgetCurrency, expense, expenseCurrency },
      ],
    ),
  )

  const alignedBudgets = MONTH_LABELS.map((_, index) => monthlyMap.get(index)?.budget ?? null)

  const alignedExpenses = MONTH_LABELS.map((_, index) => monthlyMap.get(index)?.expense ?? null)

  const alignedBudgetCurrencies = MONTH_LABELS.map(
    (_, index) => monthlyMap.get(index)?.budgetCurrency ?? null,
  )

  const alignedExpenseCurrencies = MONTH_LABELS.map(
    (_, index) => monthlyMap.get(index)?.expenseCurrency ?? null,
  )

  return {
    labels: MONTH_LABELS,
    datasets: [
      {
        label: 'BudgetOverview',
        data: alignedBudgets,
        currencies: alignedBudgetCurrencies,
        fill: false,
        borderColor: documentStyle.getPropertyValue('--p-blue-500'),
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: alignedExpenses,
        currencies: alignedExpenseCurrencies,
        fill: false,
        borderColor: documentStyle.getPropertyValue('--p-red-500'),
        tension: 0.4,
      },
    ],
  }
})
</script>

<template>
  <Card :class="cls.expense_chart_container">
    <template #content>
      <Chart
        type="line"
        :data="setChartData"
        :options="chartOptions"
        :class="cls.expense_chart"
        :key="String(isDark)"
      />
    </template>
  </Card>
</template>
