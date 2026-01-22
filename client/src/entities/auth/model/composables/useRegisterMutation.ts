import {register} from "../api/register.ts"
import { useAuthMutation } from '@/shared/lib/vue-query'
import type { Credentials } from '@/shared/types'

export interface RegisterInputs extends Credentials {
  email: string;
}

export const useRegisterMutation = () =>  {
  return useAuthMutation<RegisterInputs>(async (newUser) => await register(newUser))
}
