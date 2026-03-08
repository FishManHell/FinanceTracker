import type { QueryClient, QueryKey } from '@tanstack/vue-query'

export function usePatchRowCache<T extends { id: string }>(
  queryClient: QueryClient,
  queryKey: QueryKey,
  patch: Partial<T> & { id: string },
) {
  queryClient.setQueryData<T[]>(queryKey, (rows = []) =>
    rows.map((row) => (row.id === patch.id ? ({ ...row, ...patch } as T) : row)),
  )
}
