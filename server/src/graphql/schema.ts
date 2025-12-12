import { ApolloServerOptions } from '@apollo/server'
import { resolvers } from './resolvers/index.js'
import { typeDefs } from './typeDefs/index.js'
import { GraphQLContext } from './types/context.js'

const schema: ApolloServerOptions<GraphQLContext> = {
  resolvers,
  typeDefs,
  csrfPrevention: false,
}

export {schema}