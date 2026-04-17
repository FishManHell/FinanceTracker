import { apolloClient } from '@/shared/api/apollo'
import { DELETE_USER } from '../graphql/DeleteUser.graphql'
import type {
  DeleteUserInput,
  DeleteUserParams,
  DeleteUserResponse,
} from '../types/administration.mutation'

export const deleteUser = async (params: DeleteUserInput) => {
  const { data } = await apolloClient.mutate<DeleteUserResponse, DeleteUserParams>({
    mutation: DELETE_USER,
    variables: { params },
  })

  if (!data) {
    throw new Error('No data returned from delete user')
  }

  return data.deleteUser
}
