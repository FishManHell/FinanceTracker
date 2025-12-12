import { GraphQLContext } from '../../types/context.js'
import { GraphQLErrorCode, HttpStatus, throwError } from '../../../utils/errors.js'
import { ObjectId } from "mongodb";

export const getAccounts = async (
  _: undefined,
  params: undefined,
  context: GraphQLContext
) => {
  if (!context.user?.id) {
    throwError({
      message: "Unauthorized",
      status: HttpStatus.UNAUTHORIZED,
      code: GraphQLErrorCode.UNAUTHORIZED
    });
  }

  try {
    const accounts = context.db.collection("accounts");
    const userId = new ObjectId(context.user?.id);
    const userAccountsList = await accounts
      .find({ userId })
      .toArray();

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
      message: "Error in getAccounts",
      status: HttpStatus.BAD_REQUEST,
      code: GraphQLErrorCode.BAD_REQUEST
    })
  }

}