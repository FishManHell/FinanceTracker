import { GraphQLErrorCode, HttpStatus, throwError } from '../../../utils/errors.js'
import { ObjectId } from "mongodb";
import { Account } from '../../../models/Account/account.type.js'
import { Resolver } from '../../types/resolver.js'

export const getAccounts: Resolver<undefined, Account[]> = async (
  _,
  __,
  context
) => {
  if (!context.user?.id) {
    throwError({
      message: "UNAUTHORIZED",
      status: HttpStatus.UNAUTHORIZED,
      code: GraphQLErrorCode.UNAUTHORIZED
    });
  }

  try {
    const accounts = context.db.collection<Account>("accounts");
    const userId = new ObjectId(context.user?.id);

    return await accounts.find({ userId }).toArray();
  } catch (error) {
    console.error("Error in getAccounts", error);
    throwError({
      message: "INTERNAL_SERVER_ERROR",
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: GraphQLErrorCode.INTERNAL_SERVER_ERROR
    })
  }

}