
export const UploadDefs: string = `#graphql
scalar Upload

extend type Mutation {
    uploadAvatar(file: Upload!): String!
}
`