export const AuthTypeDefs: string = `#graphql
type AuthPayload {
    id: ID!
    username: String!
    email: String!
    role: String!
    avatar: String
}

extend type Query {
    refresh: AuthPayload
}

extend type Mutation {
    login(username: String!, password: String!): AuthPayload!
    register(username: String!, email: String!, password: String!): AuthPayload!
    logout: Boolean!
}
`;