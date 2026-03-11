import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'
import { UserPayload } from '../../types/userPayload.js'
import { UserDTO } from '../../../models/User/user.types.js'
import { getUser } from '../../../services/user/user.js'
import { Resolver } from '../../types/resolver.js'
import { internalServerError, unauthorized } from '../../../utils/errors/httpErrors.js'

export const refresh: Resolver<undefined, UserDTO> = async (
  _,
  __,
  context
) => {
  const token = context.req.cookies?.token;
  if (!token) unauthorized()

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    const user = await getUser(context, {_id: new ObjectId(payload.id)});

    if (!user) return unauthorized();

    const result: UserDTO = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    }

    return result;

  } catch (error) {
    internalServerError()
  }
}