export const AdministrationTypeDefs: string = `#graphql

input UpdateUserDataInput {
    username: String!
    email: String!
    role: String!
    avatar: String
}

input CreateUserInput {
    username: String!
    password: String!
    email: String!
    role: String!
    avatar: String
}

input UpdateUserInput {
    id: ID!
    update: UpdateUserDataInput!
}

input DeleteUserInput {
    id: ID!
}

extend type Query {
    users: [User!]!
}

extend type Mutation {
    updatedUser(params: UpdateUserInput!): User!
    deleteUser(params: DeleteUserInput!): Boolean!
    createUser(params: CreateUserInput!): User!
}
`
