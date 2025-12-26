import { useGraphqlQuery } from '@/shared/lib/hooks'
import type { TransactionsMonthly } from '../types/transaction.type.ts'
import { getTransactionsMonthly } from '../api/getTransactionsMonthly.ts'

export function useGetTransactionsMonthly(year: number) {
  return useGraphqlQuery<TransactionsMonthly>({
    queryKey: ['transactionsMonthly'],
    queryFn: async () => getTransactionsMonthly(year),
  })
}
