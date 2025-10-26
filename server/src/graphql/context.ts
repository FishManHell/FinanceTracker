import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import { IncomingMessage } from 'http';

type UserPayload = {
  username: string;
  email: string;
};

export interface GraphQLContext {
  user: UserPayload | null;
}

export const context = async ({ req }: { req: IncomingMessage }): Promise<GraphQLContext> => {
  if (!req) return { user: null };

  const authHeader = req.headers["authorization"];
  if (!authHeader) return { user: null };

  if (!authHeader.startsWith("Bearer ")) {
    throw new GraphQLError("Missing or malformed Authorization header", {
      extensions: { code: "UNAUTHORIZED", http: { status: 401 } },
    });
  }

  const token = authHeader.replace("Bearer ", "").trim();
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not defined");

  try {
    const user = jwt.verify(token, secret) as UserPayload;
    return { user };
  } catch (err) {
    throw new GraphQLError("Invalid or expired token", {
      extensions: { code: "UNAUTHORIZED", http: { status: 401 } },
    });
  }
};
