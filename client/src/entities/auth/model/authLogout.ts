import { resetAllStores } from '@/shared/lib/helpers'
import { apolloClient } from '@/shared/api/apollo'
import { AppRouters, RoutePaths } from '@/shared/config/router'
import { router } from '@/shared/config/router/router'
import { logout } from './api/logout.ts'

let isLoggingOut = false

const cleanupClient = async () => {
  apolloClient.stop()
  await apolloClient.clearStore()
  resetAllStores()

  await router.replace({
    path: RoutePaths[AppRouters.SIGN_IN],
    query: {},
  })
}

export const onLogout = async  () => {
  try {
    await logout()
  } catch (e) {
    console.warn('Logout request warning:', e)
  }

  await cleanupClient()
}

export const logoutOnUnauthorized = async () => {
  if (isLoggingOut) return
  isLoggingOut = true
  try {
    await cleanupClient()
  } catch (e) {
    console.warn('Unauthorized logout warning:', e)
  }
}
