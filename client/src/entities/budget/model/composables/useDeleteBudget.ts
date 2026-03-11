import { useToast } from 'primevue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { deleteBudget } from '../api/deleteBudget.ts'
import { useMutationFeedback } from '@/shared/lib/hooks'
import { invalidateQueries } from '@/shared/lib/vue-query'
import { budgetQueryKeys } from '../api/budgetQueryKeys.ts'

export function useDeleteBudget() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { handleError, handleSuccess: onSuccess } = useMutationFeedback({
    toast,
    successSummary: 'Budget was deleted',
    errorSummary: 'Failed to delete budget',
    afterSuccess: async () =>
      await invalidateQueries(queryClient, [
        budgetQueryKeys.budget,
        budgetQueryKeys.budgetsYearlyByMonth,
        budgetQueryKeys.budgets,
      ]),
  })

  return useMutation({
    mutationFn: deleteBudget,
    onSuccess,
    onError: (err) => handleError(err),
  })
}
