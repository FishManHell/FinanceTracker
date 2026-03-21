import { GraphQLError } from 'graphql'

export const rethrowGraphQLError = (error: unknown): void => {
  if (error instanceof GraphQLError) throw error
}