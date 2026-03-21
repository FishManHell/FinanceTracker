export const SharedTypeDefs = `#graphql
enum Role {
  admin
  user
  developer
  super_admin
}

type User {
  id: ID!
  username: String!
  avatar: String
  email: String!
  role: Role!
}
`