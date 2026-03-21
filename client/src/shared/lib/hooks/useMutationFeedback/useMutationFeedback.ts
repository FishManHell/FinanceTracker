import type { ToastServiceMethods } from 'primevue'
import type { QueryClient, QueryKey } from '@tanstack/vue-query'
import { rollbackQueryData, showErrorToast, showSuccessToast } from '@/shared/lib/helpers'

interface MutationFeedbackOptions<TData, TVariables = unknown> {
  queryClient?: QueryClient
  queryKey?: QueryKey
  toast: ToastServiceMethods
  successSummary: string
  errorSummary: string
  afterSuccess?: (data: TData, variables: TVariables) => void | Promise<void>
}

export function useMutationFeedback<TData, TVariables = unknown, TRollbackData = TData>({
  queryClient,
  queryKey,
  toast,
  successSummary,
  errorSummary,
  afterSuccess,
}: MutationFeedbackOptions<TData, TVariables>) {
  const handleSuccess = async (data: TData, variables: TVariables) => {
    showSuccessToast({ toast, summary: successSummary })
    await afterSuccess?.(data, variables)
  }

  const handleError = (error: Error, previousData?: TRollbackData) => {
    if (queryClient && queryKey && previousData !== undefined) {
      rollbackQueryData<TRollbackData>(queryClient, queryKey, previousData)
    }
    showErrorToast({ toast, summary: errorSummary, error })
  }

  return { handleSuccess, handleError }
}
