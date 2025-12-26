<script setup lang="ts">
import cls from './Budget.module.scss'
import Chart from 'primevue/chart'
import ProgressSpinner from 'primevue/progressspinner'
import type { TooltipItem } from 'chart.js'
import { computed } from 'vue'
import { useGetBudget } from '@/entities/budget'

const { data: budget, isLoading } = useGetBudget({ year: 2025, month: 12 })

const chartData = computed(() => {
  const documentStyle = getComputedStyle(document.body)

  return {
    labels: ['Spent', 'Remaining'],
    datasets: [
      {
        data: [budget.value?.spent, budget.value?.remaining],
        backgroundColor: [
          documentStyle.getPropertyValue('--p-red-500'),
          documentStyle.getPropertyValue('--p-gray-500'),
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--p-red-400'),
          documentStyle.getPropertyValue('--p-gray-400'),
        ],
      },
    ],
  }
})

const chartOptions = computed(() => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-color')

  return {
    responsive: true,
    cutout: '65%',
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'doughnut'>) => {
            const value = (context.raw as number) || 0
            const total = (context.chart.data.datasets[0]?.data as number[]).reduce(
              (a, b) => a + b,
              0,
            )
            const percent = ((value / total) * 100).toFixed(1)
            return `$ ${value.toLocaleString()} (${percent}%)`
          },
        },
      },
      legend: {
        labels: {
          color: textColor,
        },
        onClick: () => null,
      },
    },
  }
})
</script>

<template>
  <div :class="cls.budget_container">
    <header>
      <h1>Budget</h1>
    </header>
    <main v-if="!isLoading" :class="cls.budget_body">
      <h2>{{ budget?.total }} {{ budget?.currency }}</h2>
      <section :class="cls.chart_wrapper">
        <Chart type="doughnut" :data="chartData" :options="chartOptions" />
      </section>
    </main>
    <ProgressSpinner v-else />
  </div>
</template>

<style scoped></style>
