import { useToast } from 'primevue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useMutationFeedback } from '@/shared/lib/hooks'
import { createAccount as mutationFn } from '../api/createAccount.ts'
import { invalidateQueries } from '@/shared/lib/vue-query'
import { accountQueryKeys } from '../api/accountQueryKeys.ts'

export function useCreateAccount() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { handleError, handleSuccess: onSuccess } = useMutationFeedback({
    queryClient,
    successSummary: 'Account was just added',
    errorSummary: 'Failed to add account',
    toast,
    afterSuccess: async () => {
      await invalidateQueries(queryClient, [accountQueryKeys.accounts])
    }
  })

  return useMutation({
    mutationFn,
    onSuccess,
    onError: (err) => handleError(err),
  })
}
