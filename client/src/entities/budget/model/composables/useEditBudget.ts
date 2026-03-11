import { useToast } from 'primevue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { editBudget } from '../api/editBudget.ts'
import { optimisticEditBudget } from '../mutations/optimisticEditBudget.ts'
import type { EditBudgetInputUI, EditBudgetResponse, } from '../types/budget.mutation.ts'
import type { BudgetsUI } from "../types/budget.ui.ts"
import { toEditBudgetDTO } from '../helpers/toEditBudgetDTO.ts'
import { useMutationFeedback } from '@/shared/lib/hooks'
import { invalidateQueries } from '@/shared/lib/vue-query'
import { budgetQueryKeys } from '../api/budgetQueryKeys.ts'

export function useEditBudget() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const {handleError, handleSuccess: onSuccess} = useMutationFeedback({
    toast,
    queryKey: ['budgets'],
    queryClient,
    successSummary: 'budget was just updated',
    errorSummary: 'Failed to update budget',
    afterSuccess: async () =>
      await invalidateQueries(queryClient, [
        budgetQueryKeys.budget,
        budgetQueryKeys.budgetsYearlyByMonth,
      ]),
  })

  return useMutation<
    EditBudgetResponse,
    Error,
    EditBudgetInputUI,
    { previousBudgets?: BudgetsUI }
  >(
    {
      mutationFn: (variables) => {
        return editBudget(toEditBudgetDTO(variables))
      },
      onSuccess,
      onMutate: (variables) => {
        return optimisticEditBudget({ queryClient, variables })
      },
      onError: (err, _, context) => {
        return handleError(err, context?.previousBudgets)
      },
    },
  )
}
