import { useToast } from 'primevue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { editUser } from '../api/editUser.ts'
import { updateUserCache } from '../utils/updateUserCache.ts'

export function useEditUser() {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editUser,
    onSuccess: (result) => {
      if (result) {
        const updatedUser = result.updatedUser;
        toast.add({ severity: 'success', summary: `${updatedUser.username} was just updated`, life: 3000 })
        updateUserCache(queryClient, updatedUser);
      } else {
        toast.add({ severity: 'warn', summary: 'No user edit returned', life: 3000 })
      }
    },
    onError: (err, variables) => {
      updateUserCache(queryClient, null, variables.original)
      toast.add({
        severity: 'error',
        summary: 'Failed to edit user',
        detail: err.message,
        life: 3000,
      })
    },
  })
}
