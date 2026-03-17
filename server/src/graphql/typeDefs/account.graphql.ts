
export const AccountTypeDefs: string = `#graphql
type Account {
    _id: ID!
    userId: ID!
    type: String!
    amount: Float!
    currency: String!
    description: String
}

input CreateAccountInput {
    type: String!
    amount: Float!
    currency: String!
    description: String
}

extend type Mutation {
    createAccount(params: CreateAccountInput!): Account!
}

extend type Query {
    accounts: [Account!]!
}
`