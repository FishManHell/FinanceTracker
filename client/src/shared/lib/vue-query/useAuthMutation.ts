import { useMutation } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore/useAuthStore.ts'
import { AppRouters } from '@/shared/config/router'
import type { User } from '@/shared/types'

export function useAuthMutation<TInput>(
  mutationFn: (input: TInput) => Promise<User>,
  redirectRoute: string = AppRouters.DASHBOARD
) {
  const authStore = useAuthStore();
  const router = useRouter();

  return useMutation<User, Error, TInput>({
    mutationFn,
    onSuccess: (res: User) => {
      authStore.setUser(res)
      router.push({ name: redirectRoute });
    },
    onError: (error) => authStore.setError(error.message || 'Error'),
  });
}
