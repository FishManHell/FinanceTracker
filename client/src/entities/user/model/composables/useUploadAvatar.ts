import { useToast } from 'primevue'
import { useMutation } from '@tanstack/vue-query'
import { useMutationFeedback } from '@/shared/lib/hooks'
import { uploadAvatar as mutationFn } from '../api/uploadAvatar.ts'

export function useUploadAvatar() {
  const toast = useToast()

  const { handleError, handleSuccess: onSuccess } = useMutationFeedback({
    successSummary: 'Avatar was just uploaded',
    errorSummary: 'Failed to upload avatar',
    toast,
  })

  return useMutation<string, Error, File>({
    mutationFn,
    onSuccess,
    onError: (err) => handleError(err),
  })
}
