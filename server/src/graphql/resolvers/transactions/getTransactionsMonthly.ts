import { GraphQLErrorCode, HttpStatus, throwError } from '../../../utils/errors.js'
import { GraphQLContext } from '../../../graphql/types/context.js'
import { Transaction } from '../../../models/Transaction/transaction.type.js'
import { ObjectId } from 'mongodb'

export const getTransactionsMonthly = async (
  _: undefined,
  params: { year: number },
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
    const { year } = params
    const transactions = context.db.collection<Transaction>('transactions');
    const userId = new ObjectId(context.user?.id);

    if (!transactions) {
      throwError({
        message: "Transactions data not found",
        status: HttpStatus.NOT_FOUND,
        code: GraphQLErrorCode.NOT_FOUND
      })
    }

    return await transactions.aggregate([
      {
        $match: {
          userId,
          type: "expense",
          $expr: {
            $eq: [ { $year: "$date" }, year ]
          }
        }
      },
      {
        $group: {
          _id: { month: { $month: "$date" } },
          total: { $sum: { $abs: "$amount" } },
          currency: { $first: "$currency" }
        }
      },
      { $sort: { "_id.month": 1 } },
      {
        $project: {
          month: "$_id.month",
          total: 1,
          currency: 1,
          _id: 0
        }
      }
    ]).toArray();

  } catch (error) {
    console.error("Error", error);
    throwError({
      message: "INTERNAL_SERVER_ERROR",
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: GraphQLErrorCode.INTERNAL_SERVER_ERROR
    })
  }
}