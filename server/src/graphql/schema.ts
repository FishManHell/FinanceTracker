import { ApolloServerOptions } from '@apollo/server'
import { GraphQLContext } from './context.js'
import { resolvers } from './resolvers/index.js'
import { typeDefs } from './typeDefs/typeDefs.js'

const schema: ApolloServerOptions<GraphQLContext> = {
  resolvers,
  typeDefs,
}

export {schema}