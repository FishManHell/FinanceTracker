import jwt from 'jsonwebtoken'
import { ObjectId } from "mongodb";
import { GraphQLContext } from '../../types/context.js'
import { UserPayload } from '../../types/userPayload.js'
import { GraphQLErrorCode, HttpStatus, throwError } from '../../../utils/errors.js'

export const refresh = async (_: undefined, __: undefined, context: GraphQLContext) => {
  const token = context.req.cookies?.token;
  if (!token) return null;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    const user = await context.db.collection("users").findOne({ _id: new ObjectId(payload.id) });

    if (!user) {
      throwError({
        message: "UNAUTHORIZED",
        code: GraphQLErrorCode.UNAUTHORIZED,
        status: HttpStatus.UNAUTHORIZED
      })
    }

    return {
      username: user.username,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    };
  } catch {
    return null;
  }
}