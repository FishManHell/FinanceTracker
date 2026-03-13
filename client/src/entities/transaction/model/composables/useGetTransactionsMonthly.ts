import { useGraphqlQuery } from '@/shared/lib/hooks'
import type { TransactionsMonthlyDTO } from '../types/transaction.dto.ts'
import { getTransactionsMonthly } from '../api/getTransactionsMonthly.ts'
import { computed, type MaybeRef, unref } from 'vue'

export function useGetTransactionsMonthly(year: MaybeRef<number>) {
  return useGraphqlQuery<TransactionsMonthlyDTO>({
    queryKey: computed(() => ['transactionsMonthly', unref(year)]),
    queryFn: async () => getTransactionsMonthly(unref(year)),
    refetchOnWindowFocus: false,
  })
}
