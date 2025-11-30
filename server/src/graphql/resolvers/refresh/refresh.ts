import jwt from 'jsonwebtoken'
import { ObjectId } from "mongodb";
import { GraphQLContext } from '../../types/context.js'
import { UserPayload } from '../../types/userPayload.js'

export const refresh = async (_: undefined, __: undefined, context: GraphQLContext) => {
  const token = context.req.cookies?.token;
  if (!token) return null;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    const user = await context.db.collection("users").findOne({ _id: new ObjectId(payload.id) });
    if (!user) return null;

    return {
      username: user.username,
      email: user.email,
      role: user.role
    };
  } catch {
    return null;
  }
}