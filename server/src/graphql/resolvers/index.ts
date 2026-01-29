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
import { setBudget } from './budget/setBudget.js'
import { deleteBudget } from './budget/deleteBudget.js'
import { getBudgets } from './budget/getBudgets.js'
import { GraphQLDateTime } from "graphql-scalars";
import { editBudget } from './budget/editBudget.js'

export const resolvers = {
  DateTime: GraphQLDateTime,
  Upload: GraphQLUpload,
  Query: {
    refresh,
    accounts: getAccounts,
    budget: getBudget,
    transactions: getTransactions,
    transactionsMonthly: getTransactionsMonthly,
    budgets: getBudgets
  },
  Mutation: {
    login,
    register,
    uploadAvatar,
    transaction: setTransaction,
    newBudget: setBudget,
    deleteBudget,
    editBudget,
  },
}