import { GraphQLContext } from '../../types/context.js'
import { GraphQLErrorCode, HttpStatus, throwError } from '../../../utils/errors.js'
import { ObjectId } from "mongodb";
import { Account } from '../../../models/Account/account.type.js'

export const getAccounts = async (
  _: undefined,
  params: undefined,
  context: GraphQLContext
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
    const userAccountsList = await accounts.find({ userId }).toArray();

    if (!userAccountsList.length) {
      throwError({
        message: "Accounts data not found",
        status: HttpStatus.NOT_FOUND,
        code: GraphQLErrorCode.NOT_FOUND
      })
    }

    return userAccountsList;

  } catch (error) {
    console.error("Error in getAccounts", error);
    throwError({
      message: "INTERNAL_SERVER_ERROR",
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: GraphQLErrorCode.INTERNAL_SERVER_ERROR
    })
  }

}