import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { deleteTransaction } from '../api/deleteTransaction.ts'
import { useMutationFeedback } from '@/shared/lib/hooks'
import { invalidateQueries } from '@/shared/lib/vue-query'
import { useToast } from 'primevue'
import { transactionQueryKeys } from '../api/transactionQueryKeys.ts'

export function useDeleteTransaction() {
  const toast = useToast()
  const queryClient = useQueryClient();

  const { handleError, handleSuccess: onSuccess } = useMutationFeedback({
    toast,
    successSummary: 'Transaction was deleted',
    errorSummary: 'Failed to delete Transaction',
    afterSuccess: async () =>
      await invalidateQueries(queryClient, [
        transactionQueryKeys.transactions,
        transactionQueryKeys.transactionsMonthly,
      ]),
  })

  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess,
    onError: (error) => handleError(error),
  })

}
