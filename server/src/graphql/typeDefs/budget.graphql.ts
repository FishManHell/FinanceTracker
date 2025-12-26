export const BudgetTypeDefs: string = `#graphql
type BudgetOverview {
    year: Int!
    month: Int!
    total: Float!
    spent: Float!
    remaining: Float!
    currency: String!
}

type BudgetCategory {
    category: String!
    spent: Float!
}

extend type Query {
    budget(year: Int!, month: Int!): BudgetOverview
}
`