import { useMutation } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore';
import { AppRouters } from '@/shared/config/router'

export function useAuthMutation<TInput>(
  mutationFn: (input: TInput) => Promise<string>,
  redirectRoute: string = AppRouters.DASHBOARD
) {
  const authStore = useAuthStore();
  const router = useRouter();

  return useMutation<string, Error, TInput>({
    mutationFn,
    onSuccess: (token) => {
      authStore.setToken(token);
      router.push({ name: redirectRoute });
    },
    onError: (error) => authStore.setError(error.message || 'Error'),
  });
}
