import { LoginArgs } from './types/loginArgs.js'
import { generateToken, verifyPassword } from '@/utils/auth.js'
import { getUserWithPassword } from '@/services/user/user.js'

export const login = async (_: undefined, { username, password }: LoginArgs) => {
  console.log("Login called with:", username, password);

  const user = await getUserWithPassword(username, true);
  if (!user) throw new Error('User not found');

  const valid = verifyPassword(password, user.password);
  if (!valid) throw new Error("Incorrect password");

  const token = generateToken({id: user.id, username: user.username})
  return { token };
}