import { User } from '../../models/User/User.js'
import { IUserDocument } from '../../models/User/User.types.js'

export const getUserWithPassword = async (username: string, withPassword?: boolean): Promise<IUserDocument | null> =>  {
  const query = User.findOne({ username });
  if (withPassword) query.select('+password');
  return query
}
