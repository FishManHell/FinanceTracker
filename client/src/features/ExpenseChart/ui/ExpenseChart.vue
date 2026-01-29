<script setup lang="ts">
import cls from './ExpenseChart.module.scss'
import Chart from 'primevue/chart'
import { useGetTransactionsMonthly } from '@/entities/transaction'
import { computed } from 'vue'
import Card from 'primevue/card'
import { useDarkMode } from '@/shared/lib/hooks'
import { useExpenseChartOptions } from '../model/composables/useExpenseChartOptions.ts'
import { useBudgetStore } from '@/entities/budget'

const budgetStore = useBudgetStore()
const year = computed(() => budgetStore.date.getFullYear())

const { data: transactionsMonthly } = useGetTransactionsMonthly(year)

const { isDark } = useDarkMode()
const { chartOptions } = useExpenseChartOptions(isDark)

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
    transactionsMonthly?.value?.map(({ total, currency, month }) => [
      month - 1,
      { total, currency },
    ]),
  )

  const alignedTotals = monthLabels.map((_, index) => monthlyMap.get(index)?.total ?? null)
  const alignedCurrencies = monthLabels.map((_, index) => monthlyMap.get(index)?.currency ?? null)

  return {
    labels: monthLabels,
    datasets: [
      {
        label: 'Expenses',
        data: alignedTotals,
        currencies: alignedCurrencies,
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
