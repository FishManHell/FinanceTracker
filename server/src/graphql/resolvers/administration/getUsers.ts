import { Resolver } from '../../types/resolver.js'
import { UserDTO, UserDocument } from "../../../models/User/user.types.js"
import { GraphQLErrorCode, HttpStatus, throwError } from '../../../utils/errors.js'

export type UserWithIdDTO = UserDTO & { id: string }

export const getUsers: Resolver<undefined, UserWithIdDTO[]> = async (
  _, __, context
) => {
  if (!context.user?.id) {
    throwError({
      message: "UNAUTHORIZED",
      status: HttpStatus.UNAUTHORIZED,
      code: GraphQLErrorCode.UNAUTHORIZED
    });
  }

  try {
    const docs = await context.db.collection<UserDocument>('users').find().toArray();
    const users: UserWithIdDTO[] = docs.map(({_id, password, ...rest}) => {
      return {
        ...rest,
        id: _id.toString()
      }
    });

    return users
  } catch (error) {
    console.error("Error in getUsers", error);
    throwError({
      message: "INTERNAL_SERVER_ERROR",
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: GraphQLErrorCode.INTERNAL_SERVER_ERROR
    })
  }
}