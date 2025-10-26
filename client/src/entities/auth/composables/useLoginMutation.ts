import { login } from '../api/login.ts'
import { useAuthMutation } from '@/shared/lib/vue-query/useAuthMutation.ts'

interface LoginInputs {
  username: string;
  password: string
}

export function useLoginMutation() {
  return useAuthMutation<LoginInputs>(async (user) => await login(user))
}
