import { AccountTypeDefs } from './account.graphql.js'
import { TransactionTypeDefs } from './transaction.graphql.js'
import { AuthTypeDefs } from './auth.graphql.js'
import { UploadDefs } from './upload.graphql.js'
import { RootTypeDefs } from './rootType.graphql.js'
import { BudgetTypeDefs } from "./budget.graphql.js"

export const typeDefs: string[] = [
  RootTypeDefs,
  AccountTypeDefs,
  TransactionTypeDefs,
  AuthTypeDefs,
  UploadDefs,
  BudgetTypeDefs
]