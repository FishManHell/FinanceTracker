import jwt from 'jsonwebtoken';
import { IncomingMessage } from 'http';
import { GraphQLErrorCode, HttpStatus, throwError } from '@/utils/errors.js'

type UserPayload = {
  username: string;
  email: string;
};

export interface GraphQLContext {
  user: UserPayload | null;
}

const throwContextError = (message: string) => {
  return throwError({
    message,
    code: GraphQLErrorCode.UNAUTHORIZED,
    status: HttpStatus.UNAUTHORIZED
  })
}

export const context = async ({ req }: { req: IncomingMessage }): Promise<GraphQLContext> => {
  if (!req) return { user: null };

  const authHeader = req.headers["authorization"];
  if (!authHeader) return { user: null };

  if (!authHeader.startsWith("Bearer ")) {
    return throwContextError("Missing or malformed Authorization header")
  }

  const token = authHeader.replace("Bearer ", "").trim();
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not defined");

  try {
    const user = jwt.verify(token, secret) as UserPayload;
    return { user };
  } catch (err) {
    return throwContextError("Invalid or expired token")
  }
};
