import { useToast } from 'primevue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { editBudget } from '../api/editBudget.ts'
import { invalidateBudgetQueries } from './invalidateBudgetQueries.ts'

export function useEditBudget() {
  const toast = useToast();
  const queryClient = useQueryClient()


  return useMutation({
    mutationFn: editBudget,
    onSuccess: (result) => {
      if (result) {
        toast.add({ severity: 'success', summary: 'AddBudgetForm just edit', life: 3000 });
        invalidateBudgetQueries(queryClient)
      }
      else {
        toast.add({ severity: 'warn', summary: 'No budget edit returned', life: 3000 })
      }
    },
    onError: (err) => {
      toast.add({
        severity: 'error',
        summary: 'Failed to edit budget',
        detail: err.message,
        life: 3000,
      })
    },
  })

}
