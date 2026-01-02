import { resetAllStores } from '@/shared/lib/helpers'
import { apolloClient } from '@/shared/api/apollo'
import { AppRouters, RoutePaths, router } from '@/shared/config/router'

export const onLogout = async  () => {
  resetAllStores()
  await apolloClient.clearStore()
  await router.push(RoutePaths[AppRouters.SIGN_IN])
}
