import { GraphQLContext } from '../../types/context.js'
import { GraphQLErrorCode, HttpStatus, throwError } from '../../../utils/errors.js'
import { ObjectId } from 'mongodb'
import { Transaction } from '../../../models/Transaction/transaction.type.js';

interface GetTransactionsParams {
  year: number;
  month: number;
}

export const getTransactions = async (
  _: undefined,
  params: GetTransactionsParams,
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
    const { year, month } = params;
    const transactions = context.db.collection<Transaction>('transactions');
    const userId = new ObjectId(context.user?.id);

    if (!transactions) {
      throwError({
        message: "Transactions data not found",
        status: HttpStatus.NOT_FOUND,
        code: GraphQLErrorCode.NOT_FOUND
      })
    }
    return await transactions
      .aggregate([
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
        {
          $addFields: {
            date: {
              $dateToString: {
                format: "%Y-%m-%dT%H:%M:%S.%LZ",
                date: "$date"
              }
            }
          }
        }
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