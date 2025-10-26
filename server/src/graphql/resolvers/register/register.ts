import { User } from '@/models/User/User.js';
import { IUser } from '@/models/User/User.types.js'
import { generateToken, hashPassword } from '@/utils/auth.js'
import { getUserWithPassword } from '@/services/user/user.js'

export const register = async (_: undefined, { username, email, password }: IUser )=> {
  const existing = await getUserWithPassword(username);
  if (existing) throw new Error('Username already taken');

  const hashedPassword = hashPassword(password);

  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();

  const token = generateToken({id: newUser.id, username: newUser.username})

  return { token };
};
