import { LoginArgs } from './types/loginArgs.js';
import { generateToken, verifyPassword } from '../../../utils/auth.js';
import { GraphQLErrorCode, HttpStatus, throwError } from '../../../utils/errors.js';
import { GraphQLContext } from '../../types/context.js';
import { getUser } from '../../../services/user/user.js';

const throwLoginError = (message: string) => {
  return throwError({
    message,
    status: HttpStatus.NOT_FOUND,
    code: GraphQLErrorCode.NOT_FOUND
  })
}

export const login = async (_: undefined, params: LoginArgs, context: GraphQLContext) => {
  const { username, password } = params;
  const user = await getUser(context, username);

  if (!user) return throwLoginError('User not found')

  const valid = await verifyPassword(password, user.password);
  if (!valid) return throwLoginError('Invalid password');

  const token = generateToken({id: user.id, username: user.username})
  return { token };
}
