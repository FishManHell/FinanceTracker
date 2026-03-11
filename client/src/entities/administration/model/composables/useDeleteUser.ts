import { useToast } from 'primevue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { DeleteUserInput } from '../types/administration.mutation'
import { deleteUser as mutationFn } from '../api/deleteUser.ts'
import { useMutationFeedback } from '@/shared/lib/hooks'
import { optimisticDeleteUser } from '../mutations/deleteUser/optimisticDeleteUser.ts'
import type { UsersDTO } from '@/shared/types'

export function useDeleteUser() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { handleError, handleSuccess: onSuccess } = useMutationFeedback<UsersDTO>({
    queryClient,
    queryKey: ['users'],
    toast,
    successSummary: 'User was deleted',
    errorSummary: 'User was not deleted',
  })

  return useMutation<boolean, Error, DeleteUserInput, { previousUsers?: UsersDTO }>({
    mutationFn,
    onSuccess,
    onMutate: (variables) => {
      return optimisticDeleteUser({ variables, queryClient })
    },
    onError: (err, _, context) => {
      handleError(err, context?.previousUsers)
    },
  })

}
