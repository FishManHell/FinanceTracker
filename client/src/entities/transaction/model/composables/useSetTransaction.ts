import { useMutation } from '@tanstack/vue-query'
import { setTransaction } from '../api/setTransaction.ts'

export function useSetTransaction() {
  return useMutation({
    mutationFn: setTransaction,
  })
}
