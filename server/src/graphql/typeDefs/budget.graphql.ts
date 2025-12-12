export const BudgetTypeDefs: string = `#graphql
type BudgetOverview {
    year: Int!
    month: Int!
    budget: Float!
    spent: Float!
    remaining: Float!
}

type BudgetCategory {
    category: String!
    spent: Float!
}

extend type Query {
    getBudget(year: Int!, month: Int!): BudgetOverview
}
`