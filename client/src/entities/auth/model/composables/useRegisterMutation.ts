import {register} from "../api/register.ts"
import { useAuthMutation } from '@/shared/lib/vue-query/useAuthMutation.ts'
import type { UserCredentials } from '../types/user.ts'

export interface RegisterInputs extends UserCredentials {
  email: string;
}

export const useRegisterMutation = () =>  {
  return useAuthMutation<RegisterInputs>(async (newUser) => await register(newUser))
}
