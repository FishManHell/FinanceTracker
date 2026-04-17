import { Resolver } from '#graphql/types/resolver.js'
import { UserDocument, UserDTO } from '#models/User/user.types.js'
import { requireUser } from '#utils/auth.js'
import { badRequest, internalServerError, notFound } from '#utils/errors/httpErrors.js'
import { ObjectId } from 'mongodb'
import { validateUniqueUserFields } from '#graphql/utils/validateUniqueUserFields.js'
import { rethrowGraphQLError } from '#utils/errors/rethrowGraphQLError.js'

interface UpdateProfileDTO {
  username: string
  avatar: string | null
}

export const updateProfile: Resolver<{params: UpdateProfileDTO}, UserDTO> = async (
  _,
  { params },
  context,
) => {
  const currentUser = requireUser(context.user)

  try {
    const users = context.db.collection<UserDocument>('users')
    const existingUser = await users.findOne({ _id: new ObjectId(currentUser.id) })

    if (!existingUser) notFound('USER_NOT_FOUND')

    if (!params.username.trim()) badRequest('USERNAME_REQUIRED')

    const update: UpdateProfileDTO = {
      username: params.username.trim(),
      avatar: params.avatar,
    }

    await validateUniqueUserFields(users, existingUser, update)
    await users.updateOne({ _id: new ObjectId(currentUser.id) }, { $set: update })

    return {
      id: currentUser.id,
      username: update.username ?? existingUser.username,
      email: existingUser.email,
      role: existingUser.role,
      avatar: update.avatar ?? existingUser.avatar,
    }
  } catch (error) {
    console.error('Error in updateProfile', error)
    rethrowGraphQLError(error)
    internalServerError()
  }
}