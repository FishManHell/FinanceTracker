import { generateToken, setAuthCookie, verifyPassword } from '../../../utils/auth.js'
import { GraphQLErrorCode, HttpStatus, throwError } from '../../../utils/errors.js';
import { getUser } from '../../../services/user/user.js';
import { UserDTO } from '../../../models/User/user.types.js'
import { Resolver } from '../../types/resolver.js'

interface LoginArgs {
  username: string;
  password: string;
}

const throwLoginError = (message: string) => {
  return throwError({
    message,
    status: HttpStatus.NOT_FOUND,
    code: GraphQLErrorCode.NOT_FOUND
  })
}

export const login: Resolver<LoginArgs, UserDTO> = async (
  _,
  { username, password },
  context
) => {
  const user = await getUser(context, { username });

  if (!user) return throwLoginError("User not found")

  const valid = await verifyPassword(password, user.password);
  if (!valid) return throwLoginError("Invalid password");

  const token = generateToken({
    id: user._id.toString(),
    username: user.username
  });

  setAuthCookie(context, token);

  const result: UserDTO = {
    username,
    email: user.email,
    role: user.role,
    avatar: user.avatar
  }

  return result;
}
