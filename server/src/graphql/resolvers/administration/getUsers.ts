import { Resolver } from '../../types/resolver.js'
import { UserDocument, UsersDTO } from '../../../models/User/user.types.js'
import { requireUser } from '../../../utils/auth.js'
import { internalServerError } from '../../../utils/errors/httpErrors.js'

export const getUsers: Resolver<undefined, UsersDTO> = async (
  _, __, context
) => {
  requireUser(context.user)
  try {
    const docs = await context.db.collection<UserDocument>('users').find().toArray();
    const users: UsersDTO = docs.map(({_id, password, ...rest}) => {
      return { ...rest, id: _id.toString() }
    });

    return users
  } catch (error) {
    console.error("Error in getUsers", error);
    internalServerError()
  }
}