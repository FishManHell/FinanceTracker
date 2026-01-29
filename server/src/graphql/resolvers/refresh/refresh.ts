import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'
import { UserPayload } from '../../types/userPayload.js'
import { GraphQLErrorCode, HttpStatus, throwError } from '../../../utils/errors.js'
import { UserDTO } from '../../../models/User/user.types.js'
import { getUser } from '../../../services/user/user.js'
import { assertUser } from '../../utils/assertions.js'
import { Resolver } from '../../types/resolver.js'

const unauthorizeError = () => {
  throwError({
    message: "UNAUTHORIZED",
    code: GraphQLErrorCode.UNAUTHORIZED,
    status: HttpStatus.UNAUTHORIZED
  })
}

export const refresh: Resolver<undefined, UserDTO> = async (
  _,
  __,
  context
) => {
  const token = context.req.cookies?.token;
  if (!token) unauthorizeError()

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    const user = await getUser(context, {_id: new ObjectId(payload.id)});

    assertUser(user);

    const result: UserDTO = {
      username: user.username,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    }

    return result;

  } catch (error) {
    throwError({
      message: "INTERNAL_SERVER_ERROR",
      code: GraphQLErrorCode.INTERNAL_SERVER_ERROR,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    })
  }
}