import {login} from "./login/login.js"
import {register} from "./register/register.js"
import {hello} from "./hello/hello.js"
import {refresh} from "./refresh/refresh.js"

export const resolvers = {
  Query: {
    hello,
    refresh
  },
  Mutation: {
    login,
    register
  },
}