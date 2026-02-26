import { Resolver } from '../../types/resolver.js'
import { GraphQLErrorCode, HttpStatus, throwError } from '../../../utils/errors.js'
import { UserDocument } from "../../../models/User/user.types.js"
import { GraphQLError } from 'graphql'
import { ObjectId } from 'mongodb'

export const deleteUser: Resolver<{params: {id: string}}, boolean> = async (
  _, { params: {id} }, context
) => {
  if (!context.user?.id) {
    throwError({
      message: "UNAUTHORIZED",
      status: HttpStatus.UNAUTHORIZED,
      code: GraphQLErrorCode.UNAUTHORIZED
    });
  }

  try {
    const users = context.db.collection<UserDocument>('users');
    const deletedUser = await users.deleteOne({_id: new ObjectId(id)});

    if (deletedUser.deletedCount === 0) {
      throwError({
        message: "USER_NOT_FOUND",
        status: HttpStatus.NOT_FOUND,
        code: GraphQLErrorCode.NOT_FOUND
      });
    }

    return true

  } catch (error) {
    console.error("Error in deleteUser", error);
    if (error instanceof GraphQLError) throw error;
    throwError({
      message: "INTERNAL_SERVER_ERROR",
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: GraphQLErrorCode.INTERNAL_SERVER_ERROR
    })
  }
}