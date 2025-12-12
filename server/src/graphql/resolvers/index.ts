import {login} from "./login/login.js"
import {register} from "./register/register.js"
import {refresh} from "./refresh/refresh.js"
import { uploadAvatar } from './uploadAvatar/uploadAvatar.js'
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import { getAccounts } from './accounts/getAccounts.js'
import { setTransaction } from './transactions/setTransaction.js'
import { getBudget } from './budget/getBudget.js'

export const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    refresh,
    accounts: getAccounts,
    getBudget
  },
  Mutation: {
    login,
    register,
    uploadAvatar,
    setTransaction
  },
}