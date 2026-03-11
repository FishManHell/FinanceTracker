import { useToast } from 'primevue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { editUser as mutationFn } from '../api/editUser.ts'
import { optimisticEditUser } from '../mutations/editUser/optimisticEditUser.ts'
import type { EditUserInput, EditUserResponse } from '../types/administration.mutation'
import { useMutationFeedback } from '@/shared/lib/hooks'
import type { UsersDTO } from '@/shared/types'

export function useEditUser() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const {handleError, handleSuccess: onSuccess} = useMutationFeedback({
    queryClient,
    queryKey: ['users'],
    successSummary: 'user was just updated',
    errorSummary: 'Failed to update user',
    toast
  })

  return useMutation<EditUserResponse, Error, EditUserInput, { previousUsers?: UsersDTO }>({
    mutationFn,
    onSuccess,
    onMutate: (variables) => {
      return optimisticEditUser({ queryClient, variables })
    },
    onError: (err, _, context) => {
      return handleError(err, context?.previousUsers)
    },
  })
}
