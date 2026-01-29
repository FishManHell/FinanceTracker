import type { ChartDataset, ChartOptions, TooltipItem } from 'chart.js'
import { type Ref, ref, watch } from 'vue'

interface CurrenciesDataset extends ChartDataset<'line'> {
  currencies?: string[]
}

export const useExpenseChartOptions = (isDark: Ref<boolean, boolean>) => {
  const chartOptions = ref<ChartOptions<'line'> | undefined>(undefined)

  const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement)
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color')
    const textColor = documentStyle.getPropertyValue('--p-text-color')
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color')

    return {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context: TooltipItem<'line'>) {
              const dataset = context.dataset as CurrenciesDataset
              const value = context.parsed.y
              const currencies = dataset.currencies?.[context.dataIndex] || ''
              return `${value} ${currencies}`
            },
          },
        },
        legend: {
          onClick: () => null,
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    }
  }

  watch([isDark], () => {
    chartOptions.value = setChartOptions()
  }, { immediate: true })

  return { chartOptions }
}
