import { apolloClient } from '@/shared/api/apollo'
import { CREATE_USER } from '../graphql/CreateUser.graphql'
import type { UserDTO } from '@/shared/types'
import type { CreateUserInput, CreateUserResponse } from '../types/administration.mutation'

export const createUser = async (params: CreateUserInput): Promise<UserDTO> => {
  try {
    const { data } = await apolloClient.mutate<CreateUserResponse, { params: CreateUserInput }>({
      mutation: CREATE_USER,
      variables: {params}
    })

    if (!data) {
      throw new Error('No data returned from create user')
    }

    return data.createUser
  } catch (error) {
    console.error(error)
    throw error
  }
}
