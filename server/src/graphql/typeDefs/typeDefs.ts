export const typeDefs: string = `#graphql
  type AuthPayload {
    username: String!
    email: String!
    role: String!
    avatar: String
  }
  
  scalar Upload

  type Query {
    hello: String
    refresh: AuthPayload
  }
  
  type User { 
    id: ID!
    username: String!
    email: String!
    role: String!
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload!
    register(username: String!, email: String!, password: String!): AuthPayload!
    uploadAvatar(file: Upload!): String!
  }
`;
