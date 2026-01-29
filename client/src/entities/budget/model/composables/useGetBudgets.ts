import { useGraphqlQuery } from '@/shared/lib/hooks'
import type { Budgets } from '../type/budget.type.ts'
import { getBudgets } from '../api/getBudgets.ts'

export const useGetBudgets = () => {
  return useGraphqlQuery<Budgets>({
    queryKey: ['budgets'],
    queryFn: async () => getBudgets(),
    refetchOnWindowFocus: false,
    select: (budgets) => {
      return budgets.map((budget) => ({
        ...budget,
        date: new Date(budget.year, budget.month - 1, 1),
      }))
    },
  })
}
