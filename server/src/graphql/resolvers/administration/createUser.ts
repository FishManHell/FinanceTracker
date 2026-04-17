import { Resolver } from '#graphql/types/resolver.js'
import { Roles, Role, UserDocument, UserDTO } from '#models/User/user.types.js'
import { conflict, internalServerError } from '#utils/errors/httpErrors.js'
import { hashPassword, requireUser } from '#utils/auth.js'
import { OptionalId } from 'mongodb'
import { rethrowGraphQLError } from '#utils/errors/rethrowGraphQLError.js'

interface CreateUserPayload {
  params: {
    username: string
    email: string
    password: string
    role: Role
    avatar: null
  }
}

type NewUserDocument = OptionalId<UserDocument>

export const createUser: Resolver<CreateUserPayload, UserDTO> = async (
  _,
  { params },
  context
) => {
  requireUser(context.user)
  try {
    const { username, email, password } = params

    const users = context.db.collection<NewUserDocument>('users')
    const existingUser = await users.findOne({
      $or: [{ username }, { email }],
    })

    if (existingUser) conflict('USER_ALREADY_EXISTS')

    const hashedPassword = hashPassword(password)
    const role = params.role ?? Roles.USER
    const avatar = null

    const newUser: NewUserDocument = {
      username,
      email,
      password: hashedPassword,
      role,
      avatar,
    }

    const inserted = await users.insertOne(newUser)

    return {
      id: inserted.insertedId.toString(),
      username,
      email,
      role,
      avatar,
    }
  } catch (error) {
    console.error('Error in create User', error)
    rethrowGraphQLError(error)
    internalServerError();
  }
}