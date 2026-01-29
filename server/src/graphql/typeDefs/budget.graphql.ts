export const BudgetTypeDefs: string = `#graphql
type Budget { 
    id: ID! 
    year: Int! 
    month: Int! 
    total: Float! 
    currency: String! 
}

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

input BaseBudgetInput {
    year: Int!
    month: Int!
    total: Int!
    currency: String!
}

input EditBudgetInput {
    id: ID!
    update: BaseBudgetInput!
}

input DeleteBudgetInput {
    id: String!
}

extend type Query {
    budget(year: Int!, month: Int!): BudgetOverview
    budgets: [Budget!]!
}

extend type Mutation {
    newBudget(params: BaseBudgetInput): Budget
    deleteBudget(params: DeleteBudgetInput): Boolean!
    editBudget(params: EditBudgetInput): Budget
}
`