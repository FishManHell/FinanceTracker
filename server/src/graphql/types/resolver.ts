import { GraphQLContext } from './context.js'

export type Resolver<Args = {}, Return = unknown> = (
  parent: unknown,
  args: Args,
  context: GraphQLContext
) => Promise<Return>;
