import { User } from '../../../models/User/User.js'
import { IUser } from '../../../models/User/User.types.js'
import { generateToken, hashPassword } from '../../../utils/auth.js'
import { getUserWithPassword } from '../../../services/user/user.js'
import { GraphQLErrorCode, HttpStatus, throwError } from '../../../utils/errors.js'

export const register = async (_: undefined, { username, email, password }: IUser, context: any )=> {
  const users = context.db.collection('users');
  const query = await users.findOne({ username });

  if (query) throwError({
    message: "Username already taken",
    code: GraphQLErrorCode.CONFLICT,
    status: HttpStatus.CONFLICT
  })

  const hashedPassword = hashPassword(password);

  const newUser = { username, email, password: hashedPassword };
  const result = await users.insertOne(newUser);

  console.log(result.insertedId, "result.insertedId")
  const token = generateToken({id: result.insertedId, username: newUser.username})

  return { token };
};
