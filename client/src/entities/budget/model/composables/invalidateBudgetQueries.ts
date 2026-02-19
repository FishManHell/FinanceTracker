import type { QueryClient } from '@tanstack/vue-query'

export const invalidateBudgetQueries = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: ['budget'] })
  queryClient.invalidateQueries({queryKey: ['budgets']})
  queryClient.invalidateQueries({ queryKey: ['budgetsYearlyByMonth'] })
}
