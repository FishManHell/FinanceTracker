import { IUser } from '../../../models/User/User.types.js';
import { generateToken, hashPassword } from '../../../utils/auth.js';
import { GraphQLErrorCode, HttpStatus, throwError } from '../../../utils/errors.js';
import { GraphQLContext } from '../../types/context.js';

export const register = async (_: undefined, regParams: IUser, context: GraphQLContext )=> {
  const { username, email, password } = regParams;

  const users = context.db.collection("users");
  const query = await users.findOne({ username });

  if (query) throwError({
    message: "Username already taken",
    code: GraphQLErrorCode.CONFLICT,
    status: HttpStatus.CONFLICT
  })

  const hashedPassword = hashPassword(password);

  const newUser = { username, email, password: hashedPassword };
  const result = await users.insertOne(newUser);

  const token = generateToken({id: result.insertedId, username: newUser.username})

  return { token };
};
