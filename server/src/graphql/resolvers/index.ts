import {login} from "./login/login.js"
import {register} from "./register/register.js"
import {hello} from "./hello/hello.js"

export const resolvers = {
  Query: {
    hello
  },
  Mutation: {
    login,
    register
  },
}