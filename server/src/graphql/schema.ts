import { ApolloServerOptions } from '@apollo/server'
import { resolvers } from './resolvers/index.js'
import { typeDefs } from './typeDefs/typeDefs.js'
import { GraphQLContext } from './types/context.js'

const schema: ApolloServerOptions<GraphQLContext> = {
  resolvers,
  typeDefs,
  csrfPrevention: false,
}

export {schema}