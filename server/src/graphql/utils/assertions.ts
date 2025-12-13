import { UserDocument } from '../../models/User/user.types.js'
import { GraphQLErrorCode, HttpStatus, throwError } from '../../utils/errors.js'

export function assertUser(user: UserDocument | null): asserts user is UserDocument {
  if (!user) {
    throwError({
      message: "UNAUTHORIZED",
      code: GraphQLErrorCode.UNAUTHORIZED,
      status: HttpStatus.UNAUTHORIZED,
    });
  }
}