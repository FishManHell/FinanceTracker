import { Role, Roles, UserDocument, UserDTO } from '../../../models/User/user.types.js'
import { generateToken, hashPassword, setAuthCookie } from '../../../utils/auth.js'
import { GraphQLErrorCode, HttpStatus, throwError } from '../../../utils/errors.js';
import { GraphQLContext } from '../../types/context.js';
import {OptionalId} from "mongodb"

type RegisterArgs = Omit<UserDocument, "_id"> & { role?: Role };
type NewUserDocument = OptionalId<UserDocument>;

export const register = async (
  _: undefined,
  regArgs: RegisterArgs,
  context: GraphQLContext
)=> {
  const { username, email, password } = regArgs;

  const users = context.db.collection<NewUserDocument>("users");
  const existingUser = await users.findOne({ username, email });

  if (existingUser) {
    throwError({
      message: "Username already taken",
      code: GraphQLErrorCode.CONFLICT,
      status: HttpStatus.CONFLICT
    })
  }

  const hashedPassword = hashPassword(password);
  const role = regArgs.role ?? Roles.USER;
  const avatar = null

  const newUser: NewUserDocument = { username, email, password: hashedPassword, role, avatar};
  const insertOneNewUser = await users.insertOne(newUser);

  const token = generateToken({id: insertOneNewUser.insertedId.toString(), username: newUser.username});

  setAuthCookie(context, token);

  const res: UserDTO = {
    username,
    email,
    role,
    avatar
  }

  return res;
};
