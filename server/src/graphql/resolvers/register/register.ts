import { Role, Roles, UserDocument, UserDTO } from '../../../models/User/user.types.js'
import { generateToken, hashPassword, setAuthCookie } from '../../../utils/auth.js'
import {OptionalId} from "mongodb"
import { Resolver } from '../../types/resolver.js'
import { conflict } from '../../../utils/errors/httpErrors.js'

type RegisterArgs = Omit<UserDocument, "_id"> & { role?: Role };
type NewUserDocument = OptionalId<UserDocument>;

export const register: Resolver<RegisterArgs, UserDTO> = async (
  _,
  args,
  context
)=> {
  const { username, email, password } = args;

  const users = context.db.collection<NewUserDocument>("users");
  const existingUser = await users.findOne({
    $or: [{ username }, { email }]
  });

  if (existingUser) conflict("USER_ALREADY_EXISTS");

  const hashedPassword = hashPassword(password);
  const role = args.role ?? Roles.USER;
  const avatar = null

  const newUser: NewUserDocument = { username, email, password: hashedPassword, role, avatar};
  const insertOneNewUser = await users.insertOne(newUser);

  const id = insertOneNewUser.insertedId.toString()

  const token = generateToken({
    id,
    username: newUser.username,
    role: newUser.role,
  });

  setAuthCookie(context, token);

  const res: UserDTO = {
    id,
    username,
    email,
    role,
    avatar
  }

  return res;
};
