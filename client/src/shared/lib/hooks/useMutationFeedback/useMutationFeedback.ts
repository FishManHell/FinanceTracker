import type { ToastServiceMethods } from 'primevue'
import type { QueryClient, QueryKey } from '@tanstack/vue-query'
import { rollbackQueryData, showErrorToast, showSuccessToast } from '@/shared/lib/helpers'

interface MutationFeedbackOptions<T> {
  queryClient?: QueryClient
  queryKey?: QueryKey
  toast: ToastServiceMethods
  successSummary: string
  errorSummary: string
  afterSuccess?: () => void | Promise<void>
}

export function useMutationFeedback<T>({
  queryClient,
  queryKey,
  toast,
  successSummary,
  errorSummary,
  afterSuccess
}: MutationFeedbackOptions<T>) {
  const handleSuccess = async () => {
    showSuccessToast({ toast, summary: successSummary });
    await afterSuccess?.()
  }

  const handleError = (error: Error, previousData?: T) => {
    if (queryClient && queryKey && previousData) {
      rollbackQueryData<T>(queryClient, queryKey, previousData)
    }
    showErrorToast({ toast, summary: errorSummary, error })
  }

  return { handleSuccess, handleError }
}
