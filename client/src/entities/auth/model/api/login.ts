import { apolloClient } from '@/shared/api/apollo'
import { LOGIN_MUTATION } from "../graphql/Login.ts"
import type { IAuthPayload } from '../types/authPayload.ts'
import { stripTypename } from '@/shared/lib/graphql'
import type { UserDTO } from '@/shared/types'

interface LoginMutationResponse {
  login: IAuthPayload
}

export const login = async (user: { username: string; password: string }): Promise<UserDTO> => {
  const { data } = await apolloClient.mutate<LoginMutationResponse>({
    mutation: LOGIN_MUTATION,
    variables: user,
  })

  const login = data?.login
  if (!login) throw new Error('There is no user')

  await apolloClient.resetStore()
  return stripTypename(login)
}
