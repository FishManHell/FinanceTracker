import { apolloClient } from '@/shared/api/apollo'
import { REGISTER_MUTATION } from '../graphql/Register.ts'
import type { IAuthPayload } from '../types/authPayload.ts'
import type { User } from '@/shared/types'

interface RegisterMutationResponse {
  register: IAuthPayload
}

export const register = async (newUser: {username: string, email: string, password: string}): Promise<User> => {
  const { data } = await apolloClient.mutate<RegisterMutationResponse>({
    mutation: REGISTER_MUTATION,
    variables: newUser,
  });

  const reg = data?.register;
  if (!reg) throw new Error('There is no data');

  return {
    username: reg.username,
    email: reg.email,
    role: reg.role,
    avatar: reg.avatar,
  };
};
