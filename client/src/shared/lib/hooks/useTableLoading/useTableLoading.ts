import { computed, type Ref } from 'vue'

interface UseTableLoadingOptions<T> {
  data: Ref<T[] | undefined>
  isFetching: Ref<boolean>
  isLoading: Ref<boolean>
  actionLoading: Ref<boolean>
}

export function useTableLoading<T>({
  data,
  isFetching,
  isLoading,
  actionLoading,
}: UseTableLoadingOptions<T>) {
  const cellLoading = computed(() => {
    return isLoading.value && (!data.value || data.value.length === 0)
  })

  const tableLoading = computed(() => {
    return (isFetching.value && !cellLoading.value) || actionLoading.value
  })

  return {
    cellLoading,
    tableLoading,
  }
}
