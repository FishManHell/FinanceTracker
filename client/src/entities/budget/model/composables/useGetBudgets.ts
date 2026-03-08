import { useGraphqlQuery } from '@/shared/lib/hooks'
import type { BudgetsUI } from '../types/budget.ui.ts'
import { getBudgets } from '../api/getBudgets.ts'
import type { BudgetsDTO } from '../types/budget.dto.ts'

export const useGetBudgets = () => {
  return useGraphqlQuery<BudgetsDTO, BudgetsUI>({
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
