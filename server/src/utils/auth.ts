import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { GraphQLContext } from '../graphql/types/context.js'

const TOKEN_LIVE_CYCLE = parseInt(process.env.TOKEN_LIVE_CYCLE ?? "60000", 10);

export const hashPassword = (password: string)  => {
  return bcrypt.hashSync(password, 10);
}

export const verifyPassword = (plain: string, hash: string) => bcrypt.compare(plain, hash);

export const generateToken = (payload: object)  => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not defined');
  return jwt.sign(
    payload,
    secret,
    { expiresIn: TOKEN_LIVE_CYCLE / 1000 }
  );
}

export const setAuthCookie = (context: GraphQLContext, token: string) => {
  context.res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: TOKEN_LIVE_CYCLE
  });
}