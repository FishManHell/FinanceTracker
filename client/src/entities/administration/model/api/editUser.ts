import type { UserWithId } from '@/entities/administration'
import { apolloClient } from '@/shared/api/apollo'
import { EDIT_USER } from '../graphql/EditUser.graphql'
import type { User } from '@/shared/types'

interface EditUserResponse {
  updatedUser: UserWithId;
}

interface EditBudgetInput {
  id: string
  update: User
  original: UserWithId
}
interface EditUserParams {
  params: Omit<EditBudgetInput, 'original'>
}

export const editUser = async (params: EditBudgetInput) => {
  try {
    const { id, update } = params
    const { data } = await apolloClient.mutate<EditUserResponse, EditUserParams>({
      mutation: EDIT_USER,
      variables: { params: { id, update }
      },
    })
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
