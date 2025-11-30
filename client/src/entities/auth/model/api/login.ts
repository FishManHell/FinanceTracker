import { apolloClient } from '@/shared/api/apollo.ts'
import { LOGIN_MUTATION } from "../graphql/Login.ts"
import type { IAuthPayload } from '../types/authPayload.ts'
import type { User } from '@/shared/types'

interface LoginMutationResponse {
  login: IAuthPayload
}

export const login = async (user: {username: string, password: string}): Promise<User> => {
  const { data } = await apolloClient.mutate<LoginMutationResponse>({
    mutation: LOGIN_MUTATION,
    variables: user,
  });

  if (!data?.login) throw new Error('There is no user');

  return {
    username: data.login.username,
    email: data.login.email,
    role: data.login.role
  };
};
