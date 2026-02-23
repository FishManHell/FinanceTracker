import { computed, type Ref, watch } from 'vue'
import { useDateStore } from '../store/useDateStore'
import type { MonthKey } from '../types'

export const useMonth = (key: MonthKey, year: Ref<number>) => {
  const store = useDateStore()

  const month = computed({
    get: () => store.months[key].month,
    set: (value) => store.setMonth(key, value),
  })

  watch(year, (newYear) => {
    const monthState = store.months[key]
    if (!monthState.touched) return
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth() + 1

    if (newYear === currentYear && month.value > currentMonth) {
      month.value = currentMonth
    }
  })

  return month
}

