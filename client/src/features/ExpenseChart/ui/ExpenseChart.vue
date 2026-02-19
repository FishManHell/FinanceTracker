<script setup lang="ts">
import cls from './ExpenseChart.module.scss'
import Chart from 'primevue/chart'
import { useGetTransactionsMonthly } from '@/entities/transaction'
import { computed } from 'vue'
import Card from 'primevue/card'
import { useDarkMode } from '@/shared/lib/hooks'
import { useExpenseChartOptions } from '../model/composables/useExpenseChartOptions.ts'
import { useAppContextStore } from '@/app'
import { MONTH_LABELS } from '@/shared/lib/date/monthLabels.ts'

const appStore = useAppContextStore()
const year = computed(() => appStore.date.getFullYear())

const { data: transactionsMonthly } = useGetTransactionsMonthly(year)

const { isDark } = useDarkMode()
const { chartOptions } = useExpenseChartOptions(isDark)

const setChartData = computed(() => {
  const documentStyle = getComputedStyle(document.documentElement)

  const monthlyMap = new Map(
    transactionsMonthly?.value?.map(({ total, currency, month }) => [
      month - 1,
      { total, currency },
    ]),
  )

  const alignedTotals = MONTH_LABELS.map((_, index) => monthlyMap.get(index)?.total ?? null)
  const alignedCurrencies = MONTH_LABELS.map((_, index) => monthlyMap.get(index)?.currency ?? null)

  return {
    labels: MONTH_LABELS,
    datasets: [
      {
        label: 'Expenses',
        data: alignedTotals,
        currencies: alignedCurrencies,
        fill: false,
        borderColor: documentStyle.getPropertyValue('--p-red-500'),
        backgroundColor: documentStyle.getPropertyValue('--p-red-500'),
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
        type="bar"
        :data="setChartData"
        :options="chartOptions"
        :class="cls.expense_chart"
        :key="String(isDark)"
      />
    </template>
  </Card>
</template>
