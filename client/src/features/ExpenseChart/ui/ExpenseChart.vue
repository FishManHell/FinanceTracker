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
const year = computed(() => budgetStore.year)

const { data: transactionsMonthly } = useGetTransactionsMonthly(year);

const { isDark } = useDarkMode()
const { chartOptions } = useExpenseChartOptions(isDark)

const setChartData = computed(() => {
  const documentStyle = getComputedStyle(document.documentElement)

  return {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: ['Expenses'],
        data: transactionsMonthly?.value?.map((transactionMonthly) => {
          return transactionMonthly.total
        }),
        currency: transactionsMonthly?.value?.map((transactionMonthly) => {
          return transactionMonthly.currency
        }),
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
