import { useGraphqlQuery } from '@/shared/lib/hooks'
import type { TransactionsDTO } from '../types/transaction.dto.ts'
import { getTransactions } from '../api/getTransactions.ts'
import { computed, type MaybeRef, unref } from 'vue'

interface UseGetTransactionsParams {
  year: MaybeRef<number>
  month: MaybeRef<number>
}

export function useGetTransactions(params: UseGetTransactionsParams) {
  return useGraphqlQuery<TransactionsDTO>({
    queryKey: computed(() => ['transactions', unref(params.year), unref(params.month)]),
    queryFn: async () => getTransactions({ year: unref(params.year), month: unref(params.month) }),
    refetchOnWindowFocus: false,
  })
}
