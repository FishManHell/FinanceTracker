import { useToast } from 'primevue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useMutationFeedback } from '@/shared/lib/hooks'
import { createUser as mutationFn } from '../api/createUser'
import { invalidateQueries } from '@/shared/lib/vue-query'
import { administrationQueryKeys } from '@/entities/administration'
import type { CreateUserInput } from '../types/administration.mutation'
import type { UserDTO } from '@/shared/types'

export function useCreateUser() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { handleError, handleSuccess: onSuccess } = useMutationFeedback({
    successSummary: 'user was just added',
    errorSummary: 'Failed to add user',
    toast,
    afterSuccess: async () => {
      await invalidateQueries(queryClient, [administrationQueryKeys.users])
    }
  })

  return useMutation<UserDTO, Error, CreateUserInput>({
    mutationFn,
    onSuccess,
    onError: (error) => handleError(error),
  })
}
