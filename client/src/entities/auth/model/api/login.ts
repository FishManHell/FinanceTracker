import { apolloClient } from '@/shared/api/apollo.ts'
import { LOGIN_MUTATION } from "../graphql/Login.ts"
import type { IAuthPayload } from '../types/authPayload.ts'

interface LoginMutationResponse {
  login: IAuthPayload
}

export const login = async (user: {username: string, password: string}): Promise<string> => {
  const { data } = await apolloClient.mutate<LoginMutationResponse>({
    mutation: LOGIN_MUTATION,
    variables: user,
  });

  if (!data?.login?.token) throw new Error('There is no token for login');

  return data.login.token;
};
