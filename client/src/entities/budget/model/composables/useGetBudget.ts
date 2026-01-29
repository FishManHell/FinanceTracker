import { useGraphqlQuery } from '@/shared/lib/hooks'
import type { BudgetDetails } from '../type/budget.type.ts'
import { getBudget } from '../api/getBudget.ts'
import  { computed, type MaybeRef, unref } from 'vue'

interface UseGetBudgetParams {
  year: MaybeRef<number>
  month: MaybeRef<number>
}

export const useGetBudget = (params: UseGetBudgetParams) => {
  return useGraphqlQuery<BudgetDetails>({
    queryKey: computed(() => ['budget', unref(params.year), unref(params.month)]),
    queryFn: async () => getBudget({ year: unref(params.year), month: unref(params.month) }),
    retry: false,
    refetchOnWindowFocus: false,
  })
}
