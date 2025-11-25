import { apolloClient } from '@/shared/api/apollo.ts'
import { REGISTER_MUTATION } from '../graphql/Register.ts'
import type { IAuthPayload } from '../types/authPayload.ts'

interface RegisterMutationResponse {
  register: IAuthPayload
}

export const register = async (newUser: {username: string, email: string, password: string}): Promise<string> => {
  const { data } = await apolloClient.mutate<RegisterMutationResponse>({
    mutation: REGISTER_MUTATION,
    variables: newUser,
  });

  const token = data?.register.token;
  if (!token) throw new Error('There is no token for register');

  return token;
};
