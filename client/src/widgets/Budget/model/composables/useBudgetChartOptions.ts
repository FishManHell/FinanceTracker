import type { ChartOptions, TooltipItem } from 'chart.js'
import { type Ref, ref, watch } from 'vue'

export const useBudgetChartOptions = (isDark: Ref<boolean, boolean>) => {
  const chartOptions = ref<ChartOptions<'doughnut'> | undefined>(undefined)

  const setChartOptions = () => {
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
  }

  watch(isDark, () => {
    chartOptions.value = setChartOptions()
  }, { immediate: true })

  return { chartOptions }
}
