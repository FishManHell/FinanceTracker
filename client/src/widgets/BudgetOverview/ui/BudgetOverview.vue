<script setup lang="ts">
import cls from './BudgetOverview.module.scss'
import Chart from 'primevue/chart'
import ProgressSpinner from 'primevue/progressspinner'
import { computed } from 'vue'
import { useGetBudget } from '@/entities/budget'
import { useAppContextStore } from '@/app'
import Card from 'primevue/card'
import { useDarkMode } from '@/shared/lib/hooks'
import { useBudgetChartOptions } from '../model/composables/useBudgetChartOptions'

const appStore = useAppContextStore()

const year = computed(() => appStore.date.getFullYear())
const month = computed(() => appStore.date.getMonth() + 1)

const { data: budget, isFetching } = useGetBudget({ year, month })
const { isDark } = useDarkMode()
const { chartOptions } = useBudgetChartOptions(isDark)

const showChart = computed(() => {
  const b = budget.value
  if (!b) return false

  return (b.spent ?? 0) !== 0 || (b.remaining ?? 0) !== 0
})

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
    <template #header>
      <header v-if="showChart && !isFetching">
        <h1>Budget Overview</h1>
      </header>
    </template>

    <template #content>
      <section v-if="!isFetching" :class="cls.budget_body">
        <template v-if="showChart">
          <h2>{{ budget?.total }} {{ budget?.currency }}</h2>
          <Chart type="doughnut" :data="chartData" :options="chartOptions" :key="String(isDark)" />
        </template>

        <template v-else>
          <section :class="cls.empty_budget_section">
            <h2>No budget overview</h2>
          </section>
        </template>
      </section>

      <ProgressSpinner v-else :class="cls.budget_body_loading" />
    </template>
  </Card>
</template>
