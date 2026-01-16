import { resetAllStores } from '@/shared/lib/helpers'
import { apolloClient } from '@/shared/api/apollo'
import { AppRouters, RoutePaths } from '@/shared/config/router'
import { router } from '@/shared/config/router/router'

export const onLogout = async  () => {
  try {
    apolloClient.stop()
    await apolloClient.clearStore()
    resetAllStores()
    await router.push(RoutePaths[AppRouters.SIGN_IN])
  } catch (e) {
    console.warn('Logout warning:', e)
  }

}
