import { GraphQLContext } from '../../types/context.js';
import { GraphQLErrorCode, HttpStatus, throwError } from '../../../utils/errors.js';
import { ObjectId, OptionalId } from 'mongodb';
import { Account } from '../../../models/Account/account.type.js'
import { Transaction, DefAccount } from '../../../models/Transaction/transaction.type.js'

interface TransactionParams extends DefAccount {
  account: {type: string, description: string}
}

export const setTransaction = async (
  _: undefined,
  { params: {account, ...rest} }: { params: TransactionParams },
  context: GraphQLContext,
) => {
  if (!context.user?.id) {
    throwError({
      message: "Unauthorized",
      status: HttpStatus.UNAUTHORIZED,
      code: GraphQLErrorCode.UNAUTHORIZED
    });
  }

  try {
    const transactions = context.db.collection<OptionalId<Transaction>>('transactions');
    const accounts = context.db.collection<Account>("accounts");

    const userId = new ObjectId(context.user?.id);
    const userAccount = await accounts.findOne({
      type: account.type,
      description: account.description,
      userId
    });

    if (!userAccount) {
      throwError({
        message: "Account not found",
        status: HttpStatus.NOT_FOUND,
        code: GraphQLErrorCode.NOT_FOUND
      })
    }

    const insertNewTransaction = await transactions.insertOne({
      ...rest,
      userId,
      date: new Date(rest.date),
      accountId: userAccount._id,
      createdAt: new Date()
    });

    return {
      ...rest,
      id: insertNewTransaction.insertedId.toString(),
    };
  } catch (error) {
    console.error("Error inserting transaction:", error);
    throwError({
      message: "Error in setTransactions",
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: GraphQLErrorCode.INTERNAL_SERVER_ERROR
    })
  }
}