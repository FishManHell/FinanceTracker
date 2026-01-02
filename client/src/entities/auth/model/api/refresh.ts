import { apolloClient } from '@/shared/api/apollo'
import type { RefreshResponse } from '../types/storeTypes.ts'
import { REFRESH_QUERY } from '../graphql/Refresh.ts'
import { sessionStore } from '@/entities/auth'
import { userStore } from '@/entities/user'
import type { User } from '@/shared/types'
import { stripTypename } from '@/shared/lib/graphql'
import { AppRouters, RoutePaths, router } from '@/shared/config/router'

export const refresh = async (): Promise<User> => {
  const session_store = sessionStore();
  const user_store = userStore();

  try {
    const { data } = await apolloClient.query<RefreshResponse>({
      query: REFRESH_QUERY,
      fetchPolicy: "network-only"
    });

    if (!data) {
      throw new Error('No data returned from refresh')
    }

    const updatedUser = data?.refresh
    user_store.setUser(updatedUser);
    session_store.setAuthenticated(true)
    return stripTypename(updatedUser)

  } catch (error) {
    await router.push(RoutePaths[AppRouters.SIGN_IN])
    console.error("Error", error)
    throw error
  }
}
