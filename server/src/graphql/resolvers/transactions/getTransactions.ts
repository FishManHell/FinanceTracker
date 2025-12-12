import { GraphQLContext } from '../../types/context.js'
import { GraphQLErrorCode, HttpStatus, throwError } from '../../../utils/errors.js'
import { ObjectId } from 'mongodb'

export const getTransactions = async (
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
    const transactions = context.db.collection('transactions');
    const userId = new ObjectId(context.user?.id);
    const userTransactionsList = await transactions
      .find({ userId })
      .toArray();

    if (!userTransactionsList.length) {
      throwError({
        message: "Transactions data not found",
        status: HttpStatus.NOT_FOUND,
        code: GraphQLErrorCode.NOT_FOUND
      })
    }

    return userTransactionsList;

  } catch (error) {
    console.error("Error in getTransactions", error);
    throwError({
      message: "Error in getTransactions",
      status: HttpStatus.BAD_REQUEST,
      code: GraphQLErrorCode.BAD_REQUEST
    })
  }
}