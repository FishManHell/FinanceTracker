import { GraphQLErrorCode, HttpStatus, throwError } from '../../../utils/errors.js'
import { ObjectId } from 'mongodb'
import { Transaction, TransactionWithAccount } from '../../../models/Transaction/transaction.db.js'
import { Resolver } from '../../types/resolver.js'

interface Args {
  year: number;
  month: number;
}

export const getTransactions: Resolver<Args, TransactionWithAccount[]> = async (
  _,
  { year, month },
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

    return await transactions
      .aggregate<TransactionWithAccount>([
        {
          $match: {
            userId,
            $expr: {
              $and: [
                { $eq: [{ $year: "$date" }, year] },
                { $eq: [{ $month: "$date" }, month] }
              ]
            }
          }
        },
        {
          $lookup: {
            from: "accounts",
            localField: "accountId",
            foreignField: "_id",
            as: "account"
          }
        },
        { $unwind: "$account" },
      ])
      .toArray();

  } catch (error) {
    console.error("Error in getTransactions", error);
    throwError({
      message: "INTERNAL_SERVER_ERROR",
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: GraphQLErrorCode.INTERNAL_SERVER_ERROR
    })
  }
}