import {login} from "./login/login.js"
import {register} from "./register/register.js"
import {hello} from "./hello/hello.js"
import {refresh} from "./refresh/refresh.js"
import { uploadAvatar } from './uploadAvatar/uploadAvatar.js'
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";

export const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    hello,
    refresh
  },
  Mutation: {
    login,
    register,
    uploadAvatar
  },
}