<script setup lang="ts">
import cls from './ExpenseChart.module.scss'
import Chart from 'primevue/chart'
import { useGetTransactionsMonthly } from '@/entities/transaction'
import type { ChartDataset, TooltipItem } from 'chart.js'
import { computed } from 'vue'

interface CurrencyDataset extends ChartDataset<'line'> {
  currency?: string[]
}

const { data: transactionsMonthly } = useGetTransactionsMonthly(2025)

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

const chartOptions = computed(() => ({
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context: TooltipItem<'line'>) {
          const dataset = context.dataset as CurrencyDataset
          const value = context.parsed.y
          const currency = dataset.currency?.[context.dataIndex] || ''
          return `${value} ${currency}`
        },
      },
    },
    legend: {
      onClick: () => null,
    },
  },
}))
</script>

<template>
  <div :class="cls.expense_chart_container">
    <Chart type="line" :data="setChartData" :options="chartOptions" :class="cls.expense_chart" />
  </div>
</template>

<style scoped></style>
