import { GraphQLContext } from '../../graphql/types/context.js'
import { UserDocument } from '../../models/User/user.types.js'

type GetUserQuery = Pick<UserDocument, "username" | "_id" | "email">;

export const getUser = async (context: GraphQLContext, query: Partial<GetUserQuery>) => {
  const users = context.db.collection<UserDocument>("users");
  return await users.findOne(query);
};