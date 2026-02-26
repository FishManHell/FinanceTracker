import { Resolver } from '../../types/resolver.js'
import { GraphQLErrorCode, HttpStatus, throwError } from '../../../utils/errors.js'
import { UserDocument, UserDTO } from '../../../models/User/user.types.js'
import { UserWithIdDTO } from '../administration/getUsers.js'
import { ObjectId } from 'mongodb'
import { GraphQLError } from 'graphql'
import { validateUniqueUserFields } from '../../utils/validateUniqueUserFields.js'

interface EditUserParams {
  params: {
    id: string
    update: UserDTO
  }
}

export const editUser: Resolver<EditUserParams, UserWithIdDTO> = async (
  _, { params }, context
) => {
  if (!context.user?.id) {
    throwError({
      message: "UNAUTHORIZED",
      status: HttpStatus.UNAUTHORIZED,
      code: GraphQLErrorCode.UNAUTHORIZED
    });
  }
  const { id, update } = params
  try {
    const users = context.db.collection<UserDocument>("users");
    const existingUser = await users.findOne({ _id: new ObjectId(id) });

    if (!existingUser) {
      throwError({
        message: "USER_NOT_FOUND",
        status: HttpStatus.NOT_FOUND,
        code: GraphQLErrorCode.NOT_FOUND
      });
    }

    await validateUniqueUserFields(users, existingUser, update);
    await users.updateOne({ _id: new ObjectId(id) }, { $set: update});
    return { id, ...update };

  } catch (error) {
    console.error("Error in getUsers", error);
    if (error instanceof GraphQLError) throw error;
    throwError({
      message: "INTERNAL_SERVER_ERROR",
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: GraphQLErrorCode.INTERNAL_SERVER_ERROR
    })
  }
}