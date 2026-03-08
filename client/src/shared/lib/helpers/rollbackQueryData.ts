import type { QueryClient, QueryKey } from '@tanstack/vue-query'

export function rollbackQueryData<T>(
  queryClient: QueryClient,
  queryKey: QueryKey,
  previousData?: T,
) {
  if (!previousData) return
  queryClient.setQueryData<T>(queryKey, previousData)
}
