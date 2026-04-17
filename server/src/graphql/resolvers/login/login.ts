import { generateToken, setAuthCookie, verifyPassword } from '#utils/auth.js'
import { getUser } from '#services/user/user.js';
import { UserDTO } from '#models/User/user.types.js'
import { Resolver } from '#graphql/types/resolver.js'
import { notFound } from '#utils/errors/httpErrors.js'

interface LoginArgs {
  username: string;
  password: string;
}

export const login: Resolver<LoginArgs, UserDTO> = async (
  _,
  { username, password },
  context
) => {
  const user = await getUser(context, { username });

  if (!user) notFound("User not found")

  const valid = await verifyPassword(password, user.password);
  if (!valid) notFound("Invalid password");

  const id = user._id.toString()

  const token = generateToken({
    id, username: user.username, role: user.role,
  });

  setAuthCookie(context, token);

  const result: UserDTO = {
    id,
    username,
    email: user.email,
    role: user.role,
    avatar: user.avatar
  }

  return result;
}
