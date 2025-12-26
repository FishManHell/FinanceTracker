import {login} from "./login/login.js"
import {register} from "./register/register.js"
import {refresh} from "./refresh/refresh.js"
import { uploadAvatar } from './uploadAvatar/uploadAvatar.js'
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import { getAccounts } from './accounts/getAccounts.js'
import { setTransaction } from './transactions/setTransaction.js'
import { getBudget } from './budget/getBudget.js'
import { getTransactions } from './transactions/getTransactions.js'
import { getTransactionsMonthly } from './transactions/getTransactionsMonthly.js'

export const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    refresh,
    accounts: getAccounts,
    budget: getBudget,
    transactions: getTransactions,
    transactionsMonthly: getTransactionsMonthly
  },
  Mutation: {
    login,
    register,
    uploadAvatar,
    transaction: setTransaction
  },
}