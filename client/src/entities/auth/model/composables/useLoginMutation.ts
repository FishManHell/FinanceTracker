import { login } from '../api/login.ts'
import { useAuthMutation } from '@/shared/lib/vue-query/useAuthMutation.ts'
import type { UserCredentials } from '../types/user.ts'

type LoginInputs = UserCredentials

export function useLoginMutation() {
  return useAuthMutation<LoginInputs>(async (user) => await login(user))
}
