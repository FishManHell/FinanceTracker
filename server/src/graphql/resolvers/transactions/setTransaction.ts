import { GraphQLErrorCode, HttpStatus, throwError } from '../../../utils/errors.js';
import { ObjectId, OptionalId } from 'mongodb';
import { Account } from '../../../models/Account/account.type.js'
import { Resolver } from '../../types/resolver.js'
import { Transaction } from '../../../models/Transaction/transaction.db.js'
import { TransactionParams } from '../../../models/Transaction/transaction.input.js'
import { CreatedTransactionResponse } from '../../../models/Transaction/transaction.output.js'
import { GraphQLError } from 'graphql'

export const setTransaction: Resolver<TransactionParams, CreatedTransactionResponse> = async (
  _,
  { params: {account, ...rest} },
  context,
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

    const type = rest.amount > 0 ? "income" : "expense"
    const insertNewTransaction = await transactions.insertOne({
      ...rest,
      type,
      userId,
      date: new Date(rest.date),
      accountId: userAccount._id,
      createdAt: new Date()
    });

    return {
      ...rest,
      type,
      id: insertNewTransaction.insertedId.toString(),
    };
  } catch (error) {
    console.error("Error inserting transaction:", error);
    if (error instanceof GraphQLError) {
      throw error;
    }
    throwError({
      message: "INTERNAL_SERVER_ERROR",
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: GraphQLErrorCode.INTERNAL_SERVER_ERROR
    })
  }
}