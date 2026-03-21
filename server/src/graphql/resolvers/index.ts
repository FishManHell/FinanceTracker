import { GraphQLDateTime } from "graphql-scalars";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import {login} from "./login/login.js"
import {register} from "./register/register.js"
import {refresh} from "./refresh/refresh.js"
import { logout } from './logout/logout.js'
import { uploadAvatar } from './uploadAvatar/uploadAvatar.js'
import { getAccounts } from './account/getAccounts.js'
import { createAccount } from './account/createAccount.js'
import { setTransaction } from './transactions/setTransaction.js'
import { getBudget } from './budget/getBudget.js'
import { getTransactions } from './transactions/getTransactions.js'
import { getTransactionsMonthly } from './transactions/getTransactionsMonthly.js'
import { setBudget } from './budget/setBudget.js'
import { deleteBudget } from './budget/deleteBudget.js'
import { getBudgets } from './budget/getBudgets.js'
import { editBudget } from './budget/editBudget.js'
import { getBudgetYearlyByMonth } from './budget/getBudgetYearlyByMonth.js'
import { getUsers } from './administration/getUsers.js'
import { editUser } from './administration/editUser.js'
import { deleteUser } from './administration/deleteUser.js'
import { deleteTransaction } from './transactions/deleteTransaction.js'
import { createUser } from './administration/createUser.js'
import { updateProfile } from './profile/updateProfile.js'

export const resolvers = {
  DateTime: GraphQLDateTime,
  Upload: GraphQLUpload,
  Query: {
    refresh,
    accounts: getAccounts,
    budget: getBudget,
    transactions: getTransactions,
    transactionsMonthly: getTransactionsMonthly,
    budgets: getBudgets,
    budgetsYearlyByMonth: getBudgetYearlyByMonth,
    users: getUsers
  },
  Mutation: {
    login,
    register,
    logout,
    uploadAvatar,
    updateProfile,
    transaction: setTransaction,
    deleteTransaction,
    newBudget: setBudget,
    deleteBudget,
    editBudget,
    updatedUser: editUser,
    deleteUser,
    createUser,
    createAccount
  },
}