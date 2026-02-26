import { AccountTypeDefs } from './account.graphql.js'
import { TransactionTypeDefs } from './transaction.graphql.js'
import { AuthTypeDefs } from './auth.graphql.js'
import { UploadDefs } from './upload.graphql.js'
import { RootTypeDefs } from './rootType.graphql.js'
import { BudgetTypeDefs } from "./budget.graphql.js"
import { DataTimeGraphqlDefs } from './dataTime.graphql.js'
import { AdministrationTypeDefs } from './administration.graphql.js'

export const typeDefs: string[] = [
  DataTimeGraphqlDefs,
  RootTypeDefs,
  AccountTypeDefs,
  TransactionTypeDefs,
  AuthTypeDefs,
  UploadDefs,
  BudgetTypeDefs,
  AdministrationTypeDefs
]