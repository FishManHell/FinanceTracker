import { login } from '../api/login.ts'
import { useAuthMutation } from '@/shared/lib/vue-query'
import type { Credentials } from '@/shared/types'

type LoginInputs = Credentials

export function useLoginMutation() {
  return useAuthMutation<LoginInputs>(async (user) => await login(user))
}
