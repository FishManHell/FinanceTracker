export const typeDefs: string = `#graphql
  type AuthPayload {
    token: String!
  }

  type Query {
    hello: String
    testMongo: [String!]!
  }
  
  type User { 
    id: ID!
    username: String!
    email: String!
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload!
    register(username: String!, email: String!, password: String!): AuthPayload!
  }
`;
