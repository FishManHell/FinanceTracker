import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { setTransaction } from '../api/setTransaction.ts'
import { useToast } from 'primevue'

export function useSetTransaction() {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setTransaction,
    onSuccess: (result) => {
      if (result) {
        toast.add({ severity: 'success', summary: 'Transaction added', life: 3000 })

        const date = new Date(result.date)
        const year = date.getFullYear()
        const month = date.getMonth() + 1

        queryClient.invalidateQueries({ queryKey: ['transactions', year, month] })
        queryClient.invalidateQueries({ queryKey: ['budget', year, month] })
        queryClient.invalidateQueries({ queryKey: ['transactionsMonthly', year] })
      }
      else toast.add({ severity: 'warn', summary: 'No transaction returned', life: 3000 })
    },
    onError: (err) => {
      toast.add({
        severity: 'error',
        summary: 'Failed to add transaction',
        detail: err.message,
        life: 3000,
      })
    },
  })
}
