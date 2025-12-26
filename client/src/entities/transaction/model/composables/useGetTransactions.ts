import { useGraphqlQuery } from '@/shared/lib/hooks'
import type { Transactions } from '../types/transaction.type.ts'
import { getTransactions, type GetTransactionsParams } from '../api/getTransactions.ts'

export function useGetTransactions(params: GetTransactionsParams) {
  return useGraphqlQuery<Transactions>({
    queryKey: ['transactions'],
    queryFn: async () => getTransactions(params),
  })
}
