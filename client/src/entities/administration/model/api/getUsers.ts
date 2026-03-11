import { apolloClient } from '@/shared/api/apollo'
import { GET_USERS } from '../graphql/GetUsers.graphql'
import { stripTypename } from '@/shared/lib/graphql'
import type { UsersDTO } from '@/shared/types'

interface GetUsersResponse {
  users: UsersDTO
}

export const getUsers = async () => {
 try {
   const { data } = await apolloClient.query<GetUsersResponse>({
     query: GET_USERS,
   })

   const users = data?.users
   if (!users) {
     throw new Error('No users found.')
   }

   return stripTypename(users)
 } catch (error) {
   console.error('getUsers', error)
   throw error
 }
}
