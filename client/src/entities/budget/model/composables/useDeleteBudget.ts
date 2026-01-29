import { useToast } from 'primevue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { deleteBudget } from '../api/deleteBudget.ts'
import { invalidateBudgetQueries } from './invalidateBudgetQueries.ts'

export function useDeleteBudget() {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBudget,
    onSuccess: (result) => {
      if (result) {
        toast.add({ severity: 'success', summary: 'AddBudgetForm deleted', life: 3000 })
        invalidateBudgetQueries(queryClient)
      }
      else toast.add({ severity: 'warn', summary: 'No deleted budget returned', life: 3000 })

    },
    onError: (err) => {
      toast.add({
        severity: 'error',
        summary: 'Failed to delete budget',
        detail: err.message,
        life: 3000,
      })
    },
  })
}
