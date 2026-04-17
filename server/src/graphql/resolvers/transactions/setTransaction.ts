import { ObjectId, OptionalId } from 'mongodb';
import { Account } from '#models/Account/account.type.js'
import { Resolver } from '#graphql/types/resolver.js'
import { Transaction } from '#models/Transaction/transaction.db.js'
import { TransactionParams } from '#models/Transaction/transaction.input.js'
import { CreatedTransactionResponse } from '#models/Transaction/transaction.output.js'
import { requireUser } from '#utils/auth.js'
import { internalServerError, notFound } from '#utils/errors/httpErrors.js'
import { rethrowGraphQLError } from '#utils/errors/rethrowGraphQLError.js'

export const setTransaction: Resolver<TransactionParams, CreatedTransactionResponse> = async (
  _,
  { params: {account, ...rest} },
  context,
) => {
  const currentUser = requireUser(context.user)

  try {
    const transactions = context.db.collection<OptionalId<Transaction>>('transactions');
    const accounts = context.db.collection<Account>("accounts");

    const userId = new ObjectId(currentUser.id);
    const userAccount = await accounts.findOne({
      type: account.type,
      description: account.description,
      userId
    });

    if (!userAccount) notFound("Account not found")

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
    rethrowGraphQLError(error)
    internalServerError()
  }
}