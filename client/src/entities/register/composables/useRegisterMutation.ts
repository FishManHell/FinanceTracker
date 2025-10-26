import {register} from "../api/register.ts"
import { useAuthMutation } from '@/shared/lib/vue-query/useAuthMutation.ts'

interface RegisterInputs {
  username: string;
  password: string;
  email: string;
}

export const useRegisterMutation = () =>  {
  return useAuthMutation<RegisterInputs>(async (newUser) => await register(newUser))
}
