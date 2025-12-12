export const TransactionTypeDefs: string = `#graphql
type Transaction {
    id: ID!
    date: String!
    amount: Float!
    category: String!
    type: String!
    currency: String!
    description: String!
}

input AccountInput {
    type: String!
    description: String!
}

input TransactionInput {
    date: String!
    amount: Float!
    category: String!
    type: String!
    currency: String!
    description: String!
    account: AccountInput!
}

extend type Mutation {
    setTransaction(params: TransactionInput!): Transaction!
}
`