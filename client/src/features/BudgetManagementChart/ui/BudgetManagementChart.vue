<script setup lang="ts">
import Chart from 'primevue/chart'
import Card from 'primevue/card'
import { useDarkMode } from '@/shared/lib/hooks'
import { useGetBudgetsYearlyByMonth } from '@/entities/budget'
import { computed } from 'vue'
import { useExpenseChartOptions } from '@/features/ExpenseChart/model/composables/useExpenseChartOptions.ts'

const { isDark } = useDarkMode()
const { chartOptions } = useExpenseChartOptions(isDark)
const { data: budgetsYearlyByMonth } = useGetBudgetsYearlyByMonth(2025)

const setChartData = computed(() => {
  const documentStyle = getComputedStyle(document.documentElement)

  const monthLabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const monthlyMap = new Map(
    budgetsYearlyByMonth.value?.map(
      ({ month, budget, budgetCurrency, expense, expenseCurrency }) => [
        month - 1,
        { budget, budgetCurrency, expense, expenseCurrency },
      ],
    ),
  )

  const alignedBudgets = monthLabels.map((_, index) => monthlyMap.get(index)?.budget ?? null)

  const alignedExpenses = monthLabels.map((_, index) => monthlyMap.get(index)?.expense ?? null)

  const alignedBudgetCurrencies = monthLabels.map(
    (_, index) => monthlyMap.get(index)?.budgetCurrency ?? null,
  )

  const alignedExpenseCurrencies = monthLabels.map(
    (_, index) => monthlyMap.get(index)?.expenseCurrency ?? null,
  )

  return {
    labels: monthLabels,
    datasets: [
      {
        label: 'Budget',
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
  <Card class="expense_chart_container" style="width: 100%">
    <template #content>
      <Chart
        type="line"
        :data="setChartData"
        :options="chartOptions"
        class="expense_chart"
        :key="String(isDark)"
      />
    </template>
  </Card>
</template>

<style scoped>
expense_chart_container {
  width: 64%;
  height: 100% !important;

  :global(.p-card-body) {
    height: 100%;
  }

  :global(.p-card-content) {
    height: 100%;
  }

  .expense_chart {
    height: 100%;
  }
}

.p-card.p-card-body {
  height: 100% !important;
}
</style>
