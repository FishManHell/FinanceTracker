import { apolloClient } from '@/shared/api/apollo'
import { EDIT_USER } from '../graphql/EditUser.graphql'
import type {
  EditUserInput,
  EditUserParams,
  EditUserResponse,
} from '../types/administration.mutation'

export const editUser = async (params: EditUserInput) => {
  const { data } = await apolloClient.mutate<EditUserResponse, EditUserParams>({
    mutation: EDIT_USER,
    variables: { params },
  })

  if (!data) {
    throw new Error('No data returned from editUser')
  }
  return data
}
