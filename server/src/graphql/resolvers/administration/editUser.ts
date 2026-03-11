import { Resolver } from '../../types/resolver.js'
import { Roles, UpdateUserDTO, UserDocument, UserDTO } from '../../../models/User/user.types.js'
import { ObjectId } from 'mongodb'
import { GraphQLError } from 'graphql'
import { validateUniqueUserFields } from '../../utils/validateUniqueUserFields.js'
import { canManageUser } from '../../../utils/permissions/userPermissions.js'
import { requireUser } from '../../../utils/auth.js'
import { forbidden, internalServerError, notFound } from '../../../utils/errors/httpErrors.js'

interface EditUserInput {
  id: string;
  update: UpdateUserDTO
}

interface EditUserParams {
  params: EditUserInput
}

export const editUser: Resolver<EditUserParams, UserDTO> = async (
  _, { params: {id, update} }, context
) => {
  const currentUser = requireUser(context.user)
  try {
    const users = context.db.collection<UserDocument>("users");
    const existingUser = await users.findOne({ _id: new ObjectId(id) });

    if (!existingUser) notFound("USER_NOT_FOUND")

    if (!canManageUser(currentUser, existingUser)) forbidden()

    if (currentUser.role === Roles.ADMIN
      && update.role
      && update.role !== Roles.USER
    ) {
      forbidden("FORBIDDEN_ROLE_CHANGE")
    }

    await validateUniqueUserFields(users, existingUser, update);
    await users.updateOne({ _id: new ObjectId(id) }, { $set: update});
    return {
      id,
      username: update.username ?? existingUser.username,
      email: update.email ?? existingUser.email,
      role: update.role ?? existingUser.role,
      avatar: update.avatar ?? existingUser.avatar,
    };

  } catch (error) {
    console.error("Error in getUsers", error);
    if (error instanceof GraphQLError) throw error;
    internalServerError()
  }
}