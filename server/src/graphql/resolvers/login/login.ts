import { LoginArgs } from './types/loginArgs.js'
import { generateToken, verifyPassword } from '@/utils/auth.js'
import { getUserWithPassword } from '@/services/user/user.js'
import { GraphQLErrorCode, HttpStatus, throwError } from '@/utils/errors.js'

const throwLoginError = (message: string) => {
  return throwError({
    message,
    status: HttpStatus.NOT_FOUND,
    code: GraphQLErrorCode.NOT_FOUND
  })
}

export const login = async (_: undefined, { username, password }: LoginArgs, context: any) => {
  const users = context.db.collection('users');

  // const user = await getUserWithPassword(username, true);
  const user = await users.findOne({ username });
  if (!user) return throwLoginError("User not found")

  const valid = await verifyPassword(password, user.password);
  if (!valid) return throwLoginError("Invalid password")

  const token = generateToken({id: user.id, username: user.username})
  return { token };
}
