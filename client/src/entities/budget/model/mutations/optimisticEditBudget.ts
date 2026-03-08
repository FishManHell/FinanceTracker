import type { QueryClient } from '@tanstack/vue-query'
import type { EditBudgetInputUI } from '../types/budget.mutation.ts'
import { usePatchRowCache } from '@/shared/lib/hooks'
import type { BudgetUI, BudgetsUI } from '../types/budget.ui.ts'

interface OptimisticEditBudgetOptions {
  queryClient: QueryClient
  variables: EditBudgetInputUI
}

type BudgetRowPatch = Partial<Omit<BudgetUI, 'id'>> & { id: string }

export async function optimisticEditBudget(options: OptimisticEditBudgetOptions) {
  const { queryClient, variables } = options
  await queryClient.cancelQueries({ queryKey: ['budgets'] })

  const previousBudgets = queryClient.getQueryData<BudgetsUI>(['budgets'])

  const patch: BudgetRowPatch = {
    ...variables.update,
    id: variables.id,
  }
  if (patch.date) {
    patch.year = patch.date.getFullYear()
    patch.month = patch.date.getMonth() + 1
  }

  usePatchRowCache<BudgetUI>(queryClient, ['budgets'], patch)

  return { previousBudgets }
}
