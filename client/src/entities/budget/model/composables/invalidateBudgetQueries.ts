import type { QueryClient } from '@tanstack/vue-query'

export const invalidateBudgetQueries = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: ['budgetsYearlyByMonth'] })
  queryClient.invalidateQueries({ queryKey: ['budget'] })
}
