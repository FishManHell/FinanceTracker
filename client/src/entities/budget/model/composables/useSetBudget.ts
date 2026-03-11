import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { setBudget } from '../api/setBudget.ts'
import { useToast } from 'primevue'
import type { BudgetDTO } from '../types/budget.dto.ts'
import type { CreateBudgetInputUI } from '../types/budget.ui.ts'
import { toCreateBudgetDTO } from '../helpers/toCreateBudgetDTO.ts'
import { useMutationFeedback } from '@/shared/lib/hooks'
import { invalidateQueries } from '@/shared/lib/vue-query'
import { budgetQueryKeys } from '../api/budgetQueryKeys.ts'

export function useSetBudget() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { handleError, handleSuccess: onSuccess } = useMutationFeedback({
    toast,
    successSummary: 'Budget was added',
    errorSummary: 'Failed to add a new budget',
    afterSuccess: async () =>
      await invalidateQueries(queryClient, [
        budgetQueryKeys.budget,
        budgetQueryKeys.budgetsYearlyByMonth,
        budgetQueryKeys.budgets,
      ])
  })

  return useMutation<BudgetDTO, Error, CreateBudgetInputUI>({
    mutationFn: (variables) => {
      return setBudget(toCreateBudgetDTO(variables))
    },
    onSuccess,
    onError: (err) => handleError(err)
  })
}
