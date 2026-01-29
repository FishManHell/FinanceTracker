import { GraphQLErrorCode, HttpStatus, throwError } from '../../../utils/errors.js'
import { Transaction } from '../../../models/Transaction/transaction.db.js'
import { ObjectId } from 'mongodb'
import { Resolver } from '../../types/resolver.js'
import { MonthlyTransactionSummary } from '../../../models/Transaction/transaction.output.js'

export const getTransactionsMonthly: Resolver<{year: number}, MonthlyTransactionSummary[]> = async (
  _,
  { year } ,
  context
) => {
  if (!context.user?.id) {
    throwError({
      message: "Unauthorized",
      status: HttpStatus.UNAUTHORIZED,
      code: GraphQLErrorCode.UNAUTHORIZED
    });
  }
  try {
    const transactions = context.db.collection<Transaction>('transactions');
    const userId = new ObjectId(context.user?.id);

    return await transactions.aggregate<MonthlyTransactionSummary>([
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