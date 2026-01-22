import type { QueryClient } from '@tanstack/vue-query'

export function invalidateTransactionQueries(queryClient: QueryClient, date: string | Date) {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = d.getMonth() + 1

  queryClient.invalidateQueries({ queryKey: ['transactions', year, month] })
  queryClient.invalidateQueries({ queryKey: ['budget', year, month] })
  queryClient.invalidateQueries({ queryKey: ['transactions-monthly', year] })
}

