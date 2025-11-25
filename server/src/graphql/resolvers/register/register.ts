import { IUser, Role, Roles } from '../../../models/User/User.types.js'
import { generateToken, hashPassword } from '../../../utils/auth.js';
import { GraphQLErrorCode, HttpStatus, throwError } from '../../../utils/errors.js';
import { GraphQLContext } from '../../types/context.js';

type RegisterArgs = IUser & { role?: Role }

export const register = async (_: undefined, regArgs: RegisterArgs, context: GraphQLContext )=> {
  const { username, email, password } = regArgs;

  const users = context.db.collection("users");
  const query = await users.findOne({ username });

  if (query) throwError({
    message: "Username already taken",
    code: GraphQLErrorCode.CONFLICT,
    status: HttpStatus.CONFLICT
  })

  const hashedPassword = hashPassword(password);

  const role = regArgs.role ?? Roles.USER;

  const newUser: IUser = { username, email, password: hashedPassword, role};
  const result = await users.insertOne(newUser);

  const token = generateToken({id: result.insertedId, username: newUser.username})

  return { token, username, email, role };
};
