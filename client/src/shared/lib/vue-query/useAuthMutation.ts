import { useMutation } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import { userStore } from '@/entities/user'
import { sessionStore } from "@/entities/auth"
import { AppRouters } from '@/shared/config/router'
import type { User } from '@/shared/types'

export function useAuthMutation<TInput>(
  mutationFn: (input: TInput) => Promise<User>,
  redirectRoute: string = AppRouters.DASHBOARD
) {
  const session_store = sessionStore();
  const user_store = userStore();
  const router = useRouter();

  return useMutation<User, Error, TInput>({
    mutationFn,
    onSuccess: (res: User) => {
      user_store.setUser(res);
      session_store.setAuthenticated(true);
      router.push({ name: redirectRoute });
    },
    onError: (error) => session_store.setError(error.message || 'Error'),
  });
}
