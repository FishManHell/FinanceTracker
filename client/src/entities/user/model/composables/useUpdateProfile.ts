import { useMutation } from '@tanstack/vue-query'
import type { UserDTO } from '@/shared/types'
import type { UpdateProfileInput } from '../types/profile.mutation'
import { useToast } from 'primevue'
import { useMutationFeedback } from '@/shared/lib/hooks'
import { updateProfile as mutationFn } from '../api/updateProfile.ts'
import { userStore } from '@/entities/user'

export function useUpdateProfile() {
  const toast = useToast()
  const store = userStore()

  const { handleError, handleSuccess } = useMutationFeedback<
    UserDTO,
    UpdateProfileInput
  >({
    successSummary: 'profile was just updated',
    errorSummary: 'Failed to update profile',
    toast,
    afterSuccess: async (updatedUser) => {
      store.setUser(updatedUser)
    },
  })

  return useMutation<UserDTO, Error, UpdateProfileInput>({
    mutationFn,
    onSuccess: handleSuccess,
    onError: (err) => handleError(err),
  })
}
