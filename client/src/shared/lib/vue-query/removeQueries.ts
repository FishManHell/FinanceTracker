import type { QueryClient, QueryKey } from '@tanstack/vue-query'

export const removeQueries = (queryClient: QueryClient, keys: QueryKey[]) => {
  keys.forEach((key) => {
    queryClient.removeQueries({ queryKey: key })
  })
}
