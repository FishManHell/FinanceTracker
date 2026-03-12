import { computed, type Ref } from 'vue'
import type { SkeletonRow } from '@/shared/lib/table'

interface UseTableLoadingOptions<T> {
  data: Ref<T[] | undefined>
  isFetching: Ref<boolean>
  isLoading: Ref<boolean>
  actionLoading: Ref<boolean>
  skeletonFactory: (count: number) => SkeletonRow[]
}

export function useTableLoading<T>({
  data,
  isFetching,
  isLoading,
  actionLoading,
  skeletonFactory,
}: UseTableLoadingOptions<T>) {
  const rows = computed<(T | SkeletonRow)[]>(() => {
    if (isFetching.value && (!data.value || data.value.length === 0)) {
      return skeletonFactory(5)
    }

    return data.value ?? []
  })

  const cellLoading = computed(() => {
    return isFetching.value && (!data.value || data.value.length === 0)
  })

  const tableLoading = computed(() => {
    return (isFetching.value && !isLoading.value) || actionLoading.value
  })

  return {
    rows,
    cellLoading,
    tableLoading,
  }
}
