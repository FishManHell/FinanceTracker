import { apolloClient } from '@/shared/api/apollo'
import { LOGOUT_MUTATION } from '../graphql/Logout.ts'

export const logout = async (): Promise<boolean> => {
  const { data } = await apolloClient.mutate<{ logout: boolean }>({ mutation: LOGOUT_MUTATION })

  if (!data) throw new Error('No data returned from logout')

  return data.logout
}
