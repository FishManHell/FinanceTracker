import { GraphQLContext } from '../../graphql/types/context.js'

export const getUser = async (context: GraphQLContext, username: string) => {
  const users = context.db.collection("users");
  return await users.findOne({ username });
};