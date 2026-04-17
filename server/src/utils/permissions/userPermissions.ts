import { Roles, UserDocument } from '#models/User/user.types.js'
import { ContextUser } from '#graphql/types/context.js'

export function canManageUser(currentUser: ContextUser, targetUser: UserDocument) {
  if (currentUser.id === targetUser._id.toString()) return false

  if (currentUser.role === Roles.SUPERADMIN) return true

  if (currentUser.role === Roles.ADMIN) {
    return targetUser.role === Roles.USER
  }

  return false
}