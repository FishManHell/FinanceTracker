import { resetAllStores } from '@/shared/lib/helpers'
import { apolloClient } from '@/shared/api/apollo'
import { AppRouters, RoutePaths } from '@/shared/config/router'
import { router } from '@/shared/config/router/router'
import { logout } from './api/logout.ts'

export const onLogout = async  () => {
  try {
    await logout()
    apolloClient.stop()
    await apolloClient.clearStore()
    resetAllStores()
    await router.replace({
      path: RoutePaths[AppRouters.SIGN_IN],
      query: {},
    })
  } catch (e) {
    console.warn('Logout warning:', e)
  }

}
