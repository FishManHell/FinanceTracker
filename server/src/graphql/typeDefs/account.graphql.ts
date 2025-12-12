
export const AccountTypeDefs: string = `#graphql
type Account {
    _id: ID!
    userId: ID!
    type: String!
    amount: Float!
    currency: String!
    description: String
}

extend type Query {
    accounts: [Account!]!
}
`