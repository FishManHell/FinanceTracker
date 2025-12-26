import { useGraphqlQuery } from '@/shared/lib/hooks'
import type { Budget } from '../type/budget.type.ts'
import { getBudget, type GetBudgetVariables } from '../api/getBudget.ts'

export const useGetBudget = (params: GetBudgetVariables) => {
  return useGraphqlQuery<Budget>({
    queryKey: ['budget'],
    queryFn: async () => getBudget(params),
  })
}
