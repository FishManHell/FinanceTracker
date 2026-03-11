import type { QueryClient, QueryKey } from '@tanstack/vue-query'

export const invalidateQueries = async (queryClient: QueryClient, keys: QueryKey[]) => {
  await Promise.all(keys.map((key) => queryClient.invalidateQueries({ queryKey: key })))
}
