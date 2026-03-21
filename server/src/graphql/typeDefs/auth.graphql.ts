export const AuthTypeDefs: string = `#graphql

extend type Query {
    refresh: User
}

extend type Mutation {
    login(username: String!, password: String!): User!
    register(username: String!, email: String!, password: String!): User!
    logout: Boolean!
}
`;