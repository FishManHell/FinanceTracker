export const ProfileTypeDefs = `#graphql
input UpdateProfileInput {
    username: String!
    avatar: String
}

extend type Mutation {
    updateProfile(params: UpdateProfileInput!): User!
}
`