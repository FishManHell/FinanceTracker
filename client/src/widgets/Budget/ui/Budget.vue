<script setup lang="ts">
import cls from './Budget.module.scss'
import Chart from 'primevue/chart'
import ProgressSpinner from 'primevue/progressspinner'
import { computed } from 'vue'
import { useBudgetStore, useGetBudget } from '@/entities/budget'
import Card from 'primevue/card'
import { useDarkMode } from '@/shared/lib/hooks'
import { useBudgetChartOptions } from '../model/composables/useBudgetChartOptions'

const budgetStore = useBudgetStore()

const year = computed(() => budgetStore.date.getFullYear())
const month = computed(() => budgetStore.date.getMonth() + 1)

const { data: budget, isFetching } = useGetBudget({ year, month })
const { isDark } = useDarkMode()
const { chartOptions } = useBudgetChartOptions(isDark)

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
</script>

<template>
  <Card :class="cls.budget_container">
    <template #content>
      <header>
        <h1>Budget</h1>
      </header>
      <section v-if="!isFetching" :class="cls.budget_body">
        <h2>{{ budget?.total }} {{ budget?.currency }}</h2>
        <Chart type="doughnut" :data="chartData" :options="chartOptions" :key="String(isDark)" />
      </section>
      <ProgressSpinner v-else :class="cls.budget_body_loading" />
    </template>
  </Card>
</template>

<style scoped></style>
