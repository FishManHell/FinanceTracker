import { apolloClient } from '@/shared/api/apollo'
import type { RefreshResponse } from '../types/storeTypes.ts'
import { REFRESH_QUERY } from '../graphql/Refresh.ts'
import { sessionStore } from '@/entities/auth'
import { userStore } from '@/entities/user'
import type { User } from '@/shared/types'

export const refresh = async (): Promise<User> => {
  const session_store = sessionStore();
  const user_store = userStore();

  const resetStores = () => {
    console.log('LOGS')
    user_store.clearUser()
    session_store.logout()
  }
  try {
    const { data } = await apolloClient.query<RefreshResponse>({
      query: REFRESH_QUERY,
      fetchPolicy: "network-only"
    });

    if (!data?.refresh) {
      resetStores()
      throw new Error("There is no refresh data");
    }

    const updatedUser = data?.refresh
    user_store.setUser(updatedUser);
    session_store.setAuthenticated(true)
    return updatedUser

  } catch (error) {
    resetStores()
    console.error("Error", error)
    throw new Error('Error')
  }
}
