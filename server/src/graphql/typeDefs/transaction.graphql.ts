export const TransactionTypeDefs: string = `#graphql
type Transaction {
    id: ID!
    date: String!
    amount: Float!
    category: String!
    type: String!
    currency: String!
    description: String!
    account: TransactionAccount
}

type TransactionAccount {
    id: ID!
    type: String!
    description: String!
}

type TransactionMonthly {
    month: Int!
    total: Float!
    currency: String!
}

input AccountInput {
    type: String!
    description: String!
}

input TransactionInput {
    date: String!
    amount: Float!
    category: String!
    currency: String!
    description: String!
    account: AccountInput!
}

extend type Mutation {
    transaction(params: TransactionInput!): Transaction!
}

extend type Query {
    transactions(year: Int!, month: Int!): [Transaction!]!
    transactionsMonthly(year: Int!): [TransactionMonthly!]!
}
`