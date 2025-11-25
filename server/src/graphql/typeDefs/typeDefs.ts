export const typeDefs: string = `#graphql
  type AuthPayload {
    token: String!
    username: String!
    email: String!
    role: String!
  }

  type Query {
    hello: String
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
