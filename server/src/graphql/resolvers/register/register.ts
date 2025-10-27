import { User } from '@/models/User/User.js'
import { IUser } from '@/models/User/User.types.js'
import { generateToken, hashPassword } from '@/utils/auth.js'
import { getUserWithPassword } from '@/services/user/user.js'
import { GraphQLErrorCode, HttpStatus, throwError } from '@/utils/errors.js'

export const register = async (_: undefined, { username, email, password }: IUser )=> {
  const existing = await getUserWithPassword(username);
  if (existing) throwError({
    message: "Username already taken",
    code: GraphQLErrorCode.CONFLICT,
    status: HttpStatus.CONFLICT
  })

  const hashedPassword = hashPassword(password);

  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();

  const token = generateToken({id: newUser.id, username: newUser.username})

  return { token };
};
