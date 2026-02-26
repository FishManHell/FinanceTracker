export const AdministrationTypeDefs: string = `#graphql
type User {
    id: ID!
    username: String!
    email: String!
    role: String!
    avatar: String
}

input BaseUserInput {
    username: String!
    email: String!
    role: String!
    avatar: String
}

input EditUserInput {
    id: ID!
    update: BaseUserInput!
}

input DeleteUserParams {
    id: ID!
}

extend type Query {
    users: [User!]!
}

extend type Mutation {
    updatedUser(params: EditUserInput!): User!
    deleteUser(params: DeleteUserParams!): Boolean!
}
`
