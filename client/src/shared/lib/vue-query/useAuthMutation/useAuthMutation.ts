import { useMutation } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import { userStore } from '@/entities/user'
import { sessionStore } from "@/entities/auth"
import { AppRouters } from '@/shared/config/router'
import type { UserDTO } from '@/shared/types'

export function useAuthMutation<TInput>(
  mutationFn: (input: TInput) => Promise<UserDTO>,
  redirectRoute: string = AppRouters.DASHBOARD,
) {
  const session_store = sessionStore()
  const user_store = userStore()
  const router = useRouter()

  return useMutation<UserDTO, Error, TInput>({
    mutationFn,
    onSuccess: (res: UserDTO) => {
      user_store.setUser(res)
      session_store.setAuthenticated(true)
      router.push({ name: redirectRoute })
    },
    onError: (error) => session_store.setError(error.message || 'Error'),
  })
}
