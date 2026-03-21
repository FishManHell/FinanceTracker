import { userStore } from '../model/store/user.store.ts'
import type { UserDTO } from '@/shared/types'

export function useUserPermissions() {
  const store = userStore()

  const canEditUser = (targetUser: UserDTO) => {
    const user = store.user
    if (!user) return false

    if (user.id === targetUser.id) return false

    if (user.role === 'super_admin') return true

    if (user.role === 'admin') {
      return targetUser.role === 'user'
    }

    return false
  }

  const canDeleteUser = (targetUser: UserDTO) => {
    const user = store.user
    if (!user) return false

    if (user.id === targetUser.id) return false

    if (user.role === 'super_admin') return true

    if (user.role === 'admin') {
      return targetUser.role === 'user'
    }

    return false
  }

  const canEditUserRole = (targetUser: UserDTO) => {
    const user = store.user
    if (!user) return false

    const isSuperAdmin = user.role === 'super_admin'
    const isSelf = user.id === targetUser.id

    return isSuperAdmin && !isSelf;
  }

  return {
    canEditUser,
    canDeleteUser,
    canEditUserRole,
  }
}
