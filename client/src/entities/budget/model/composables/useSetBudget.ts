import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { setBudget } from '../api/setBudget.ts'
import { useToast } from 'primevue'
import { invalidateBudgetQueries } from '../composables/invalidateBudgetQueries.ts'
import type { BudgetDTO } from '../types/budget.dto.ts'
import type { CreateBudgetInputUI } from '../types/budget.ui.ts'
import { toCreateBudgetDTO } from '../helpers/toCreateBudgetDTO.ts'

export function useSetBudget() {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation<BudgetDTO, Error, CreateBudgetInputUI>({
    mutationFn: (variables) => {
      return setBudget(toCreateBudgetDTO(variables))
    },
    onSuccess: (result) => {
      if (result) {
        toast.add({ severity: 'success', summary: 'New budget just added', life: 3000 })
        invalidateBudgetQueries(queryClient)
      } else toast.add({ severity: 'warn', summary: 'No budget returned', life: 3000 })
    },
    onError: (err) => {
      toast.add({
        severity: 'error',
        summary: 'Failed to add budget',
        detail: err.message,
        life: 3000,
      })
    },
  })
}
