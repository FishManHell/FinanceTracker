import { ObjectId } from 'mongodb'
import { Transaction, TransactionWithAccount } from '../../../models/Transaction/transaction.db.js'
import { Resolver } from '../../types/resolver.js'
import { requireUser } from '../../../utils/auth.js'
import { internalServerError } from '../../../utils/errors/httpErrors.js'

interface Args {
  year: number;
  month: number;
}

export const getTransactions: Resolver<Args, TransactionWithAccount[]> = async (
  _,
  { year, month },
  context
) => {
  const currentUser = requireUser(context.user)

  try {
    const transactions = context.db.collection<Transaction>('transactions');
    const userId = new ObjectId(currentUser.id);

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
        {
          $addFields: {
            id: { $toString: '$_id' }
          },
        },
      ])
      .toArray();

  } catch (error) {
    console.error("Error in getTransactions", error);
    internalServerError()
  }
}